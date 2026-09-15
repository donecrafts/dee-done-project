const VERTEX_SHADER = `
  attribute vec3 a_position;
  attribute vec2 a_texCoord;
  attribute vec3 a_normal;
  uniform mat4 u_mvp;
  uniform mat4 u_model;
  varying vec2 v_texCoord;
  varying vec3 v_normal;
  varying vec3 v_worldPos;
  void main() {
    vec4 world = u_model * vec4(a_position, 1.0);
    v_worldPos = world.xyz;
    v_texCoord = a_texCoord;
    v_normal = mat3(u_model) * a_normal;
    gl_Position = u_mvp * vec4(a_position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform sampler2D u_image;
  uniform float u_time;
  uniform float u_isEdge;
  varying vec2 v_texCoord;
  varying vec3 v_normal;
  varying vec3 v_worldPos;

  void main() {
    vec3 N = normalize(v_normal);
    vec3 L = normalize(vec3(0.35, 0.7, 1.0));
    float diff = max(dot(N, L), 0.0);
    float ambient = 0.42;
    float light = ambient + diff * 0.58;

    if (u_isEdge > 0.5) {
      vec2 uv = v_texCoord;
      float grid = step(0.92, fract(uv.x * 12.0)) + step(0.92, fract(uv.y * 12.0));
      vec3 base = vec3(0.28, 0.06, 0.12);
      vec3 accent = vec3(0.72, 0.18, 0.34);
      float ring = smoothstep(0.28, 0.26, distance(uv, vec2(0.5)));
      vec3 color = mix(base, accent, ring * 0.55 + grid * 0.08);
      color *= light;
      gl_FragColor = vec4(color, 1.0);
      return;
    }

    vec2 uv = v_texCoord;
    float aberr = 0.0025 + 0.001 * sin(u_time * 1.4);
    float r = texture2D(u_image, uv + vec2(aberr, 0.0)).r;
    float g = texture2D(u_image, uv).g;
    float b = texture2D(u_image, uv - vec2(aberr, 0.0)).b;
    vec3 color = vec3(r, g, b) * light;

    float scan = sin((uv.y + u_time * 0.25) * 180.0) * 0.02;
    color -= scan;
    color += vec3(0.08, 0.02, 0.04) * (1.0 - abs(N.z));

    gl_FragColor = vec4(color, 1.0);
  }
`;

type Mat4 = Float32Array;

function mat4Identity(): Mat4 {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function mat4Perspective(fovY: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fovY / 2);
  const nf = 1 / (near - far);
  const out = new Float32Array(16);
  out[0] = f / aspect;
  out[5] = f;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[14] = 2 * far * near * nf;
  return out;
}

function mat4Multiply(a: Mat4, b: Mat4): Mat4 {
  const out = new Float32Array(16);
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 4; row++) {
      out[col * 4 + row] =
        a[row] * b[col * 4] +
        a[4 + row] * b[col * 4 + 1] +
        a[8 + row] * b[col * 4 + 2] +
        a[12 + row] * b[col * 4 + 3];
    }
  }
  return out;
}

function mat4Translate(x: number, y: number, z: number): Mat4 {
  const out = mat4Identity();
  out[12] = x;
  out[13] = y;
  out[14] = z;
  return out;
}

function mat4RotateX(rad: number): Mat4 {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const out = mat4Identity();
  out[5] = c;
  out[6] = s;
  out[9] = -s;
  out[10] = c;
  return out;
}

function mat4RotateY(rad: number): Mat4 {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const out = mat4Identity();
  out[0] = c;
  out[2] = -s;
  out[8] = s;
  out[10] = c;
  return out;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

/** Thin card: front (portrait) + back (branded) + rim edges */
function buildCardGeometry(w: number, h: number, d: number) {
  const hw = w / 2;
  const hh = h / 2;
  const hd = d / 2;

  // position(3) + uv(2) + normal(3)
  const faces: number[] = [];

  const pushQuad = (
    p0: number[],
    p1: number[],
    p2: number[],
    p3: number[],
    uv0: number[],
    uv1: number[],
    uv2: number[],
    uv3: number[],
    n: number[],
  ) => {
    const verts = [
      [...p0, ...uv0, ...n],
      [...p1, ...uv1, ...n],
      [...p2, ...uv2, ...n],
      [...p0, ...uv0, ...n],
      [...p2, ...uv2, ...n],
      [...p3, ...uv3, ...n],
    ];
    for (const v of verts) faces.push(...v);
  };

  // Front (+Z) — portrait (UVs with FLIP_Y)
  pushQuad(
    [-hw, -hh, hd],
    [hw, -hh, hd],
    [hw, hh, hd],
    [-hw, hh, hd],
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0, 1],
  );
  // Back (−Z) — brand side
  pushQuad(
    [hw, -hh, -hd],
    [-hw, -hh, -hd],
    [-hw, hh, -hd],
    [hw, hh, -hd],
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0, -1],
  );
  // Edges
  pushQuad([-hw, -hh, -hd], [-hw, -hh, hd], [-hw, hh, hd], [-hw, hh, -hd], [0, 0], [1, 0], [1, 1], [0, 1], [-1, 0, 0]);
  pushQuad([hw, -hh, hd], [hw, -hh, -hd], [hw, hh, -hd], [hw, hh, hd], [0, 0], [1, 0], [1, 1], [0, 1], [1, 0, 0]);
  pushQuad([-hw, hh, hd], [hw, hh, hd], [hw, hh, -hd], [-hw, hh, -hd], [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
  pushQuad([-hw, -hh, -hd], [hw, -hh, -hd], [hw, -hh, hd], [-hw, -hh, hd], [0, 0], [1, 0], [1, 1], [0, 1], [0, -1, 0]);

  return {
    data: new Float32Array(faces),
    frontVertexCount: 6,
    totalVertexCount: faces.length / 8,
  };
}

export type WelcomeWebGLHandle = {
  stop: () => void;
};

export function startWelcomeWebGL(
  canvas: HTMLCanvasElement,
  frontImageSrc: string,
  backImageSrc: string,
  reducedMotion = false,
): WelcomeWebGLHandle | null {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: true, depth: true });
  if (!gl) return null;

  const program = createProgram(gl);
  if (!program) return null;

  const positionLoc = gl.getAttribLocation(program, "a_position");
  const texCoordLoc = gl.getAttribLocation(program, "a_texCoord");
  const normalLoc = gl.getAttribLocation(program, "a_normal");
  const mvpLoc = gl.getUniformLocation(program, "u_mvp");
  const modelLoc = gl.getUniformLocation(program, "u_model");
  const imageLoc = gl.getUniformLocation(program, "u_image");
  const timeLoc = gl.getUniformLocation(program, "u_time");
  const isEdgeLoc = gl.getUniformLocation(program, "u_isEdge");

  const geometry = buildCardGeometry(1.05, 1.32, 0.06);
  const buffer = gl.createBuffer();
  if (!buffer) return null;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, geometry.data, gl.STATIC_DRAW);

  const frontTexture = gl.createTexture();
  const backTexture = gl.createTexture();
  if (!frontTexture || !backTexture) return null;

  let raf = 0;
  let start = performance.now();
  let stopped = false;
  let frontReady = false;
  let backReady = false;
  let loopStarted = false;

  let rotY = -0.28;
  let rotX = 0.12;
  let targetRotY = rotY;
  let targetRotX = rotX;
  let velocityY = 0;
  let velocityX = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let userInteracted = false;

  const stride = 8 * 4;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { clientWidth, clientHeight } = canvas;
    canvas.width = Math.max(1, Math.floor(clientWidth * dpr));
    canvas.height = Math.max(1, Math.floor(clientHeight * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const uploadTexture = (texture: WebGLTexture, image: HTMLImageElement) => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  };

  const bindAttributes = () => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(texCoordLoc);
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, stride, 12);
    gl.enableVertexAttribArray(normalLoc);
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, stride, 20);
  };

  const drawFace = (
    first: number,
    count: number,
    isEdge: boolean,
    texture: WebGLTexture,
    mvp: Mat4,
    model: Mat4,
    time: number,
  ) => {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1f(isEdgeLoc, isEdge ? 1 : 0);
    gl.uniformMatrix4fv(mvpLoc, false, mvp);
    gl.uniformMatrix4fv(modelLoc, false, model);
    gl.uniform1f(timeLoc, time);
    gl.uniform1i(imageLoc, 0);
    gl.drawArrays(gl.TRIANGLES, first, count);
  };

  const tryStartLoop = () => {
    if (!frontReady || !backReady || stopped || loopStarted) return;
    loopStarted = true;
    resize();
    raf = requestAnimationFrame(draw);
  };

  const draw = (now: number) => {
    if (stopped) return;
    const time = reducedMotion ? 0 : (now - start) * 0.001;

    if (!dragging && !reducedMotion) {
      if (!userInteracted) {
        targetRotY += 0.0045;
      } else {
        targetRotY += velocityY;
        targetRotX += velocityX;
        velocityY *= 0.94;
        velocityX *= 0.94;
        if (Math.abs(velocityY) < 0.00005) velocityY = 0;
        if (Math.abs(velocityX) < 0.00005) velocityX = 0;
      }
    }

    rotY += (targetRotY - rotY) * 0.18;
    rotX += (targetRotX - rotX) * 0.18;
    rotX = Math.max(-0.75, Math.min(0.75, rotX));
    targetRotX = Math.max(-0.75, Math.min(0.75, targetRotX));

    const aspect = canvas.width / Math.max(1, canvas.height);
    const projection = mat4Perspective((42 * Math.PI) / 180, aspect, 0.1, 20);
    const view = mat4Translate(0, 0, -2.55);
    const model = mat4Multiply(mat4RotateY(rotY), mat4RotateX(rotX));
    const mvp = mat4Multiply(mat4Multiply(projection, view), model);

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.078, 0.078, 0.086, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);
    bindAttributes();

    // Front portrait
    drawFace(0, 6, false, frontTexture, mvp, model, time);
    // Back portrait
    drawFace(6, 6, false, backTexture, mvp, model, time);
    // Wine rim edges
    drawFace(12, geometry.totalVertexCount - 12, true, frontTexture, mvp, model, time);

    raf = requestAnimationFrame(draw);
  };

  const frontImage = new Image();
  frontImage.crossOrigin = "anonymous";
  frontImage.onload = () => {
    if (stopped) return;
    uploadTexture(frontTexture, frontImage);
    frontReady = true;
    tryStartLoop();
  };
  frontImage.onerror = () => {
    stopped = true;
  };
  frontImage.src = frontImageSrc;

  const backImage = new Image();
  backImage.crossOrigin = "anonymous";
  backImage.onload = () => {
    if (stopped) return;
    uploadTexture(backTexture, backImage);
    backReady = true;
    tryStartLoop();
  };
  backImage.onerror = () => {
    stopped = true;
  };
  backImage.src = backImageSrc;

  const pointerDown = (clientX: number, clientY: number) => {
    dragging = true;
    userInteracted = true;
    lastX = clientX;
    lastY = clientY;
    velocityY = 0;
    velocityX = 0;
    canvas.style.cursor = "grabbing";
  };

  const pointerMove = (clientX: number, clientY: number) => {
    if (!dragging) return;
    const dx = clientX - lastX;
    const dy = clientY - lastY;
    lastX = clientX;
    lastY = clientY;
    const sens = 0.008;
    targetRotY += dx * sens;
    targetRotX += dy * sens;
    velocityY = dx * sens * 0.35;
    velocityX = dy * sens * 0.35;
  };

  const pointerUp = () => {
    dragging = false;
    canvas.style.cursor = "grab";
  };

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    pointerDown(e.clientX, e.clientY);
  };
  const onMouseMove = (e: MouseEvent) => pointerMove(e.clientX, e.clientY);
  const onMouseUp = () => pointerUp();
  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    pointerDown(e.touches[0].clientX, e.touches[0].clientY);
  };
  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    pointerMove(e.touches[0].clientX, e.touches[0].clientY);
  };
  const onTouchEnd = () => pointerUp();
  const onResize = () => resize();

  canvas.style.cursor = "grab";
  canvas.style.touchAction = "none";
  canvas.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("touchstart", onTouchStart, { passive: false });
  canvas.addEventListener("touchmove", onTouchMove, { passive: false });
  canvas.addEventListener("touchend", onTouchEnd);
  window.addEventListener("resize", onResize);

  return {
    stop: () => {
      stopped = true;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      gl.deleteTexture(frontTexture);
      gl.deleteTexture(backTexture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}
