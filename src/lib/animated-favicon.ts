const FAVICON_SIZE = 32;
const SOURCE = "/favicon-source.png";
const BOB_AMPLITUDE = 4;
const BOB_PERIOD_MS = 1600;

let linkEl: HTMLLinkElement | null = null;
let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let image: HTMLImageElement | null = null;
let rafId = 0;
let started = false;

function ensureLink(): HTMLLinkElement {
  if (linkEl) return linkEl;

  linkEl = document.querySelector("link[rel='icon']") ?? document.createElement("link");
  linkEl.rel = "icon";
  linkEl.type = "image/png";
  if (!linkEl.parentElement) document.head.appendChild(linkEl);
  return linkEl;
}

function drawFrame(timestamp: number) {
  if (!canvas || !ctx || !image) return;

  const bob = Math.sin((timestamp / BOB_PERIOD_MS) * Math.PI * 2) * BOB_AMPLITUDE;
  const pad = 2;
  const drawSize = FAVICON_SIZE - pad * 2;
  const x = pad;
  const y = pad + bob;

  ctx.clearRect(0, 0, FAVICON_SIZE, FAVICON_SIZE);
  ctx.drawImage(image, x, y, drawSize, drawSize);

  ensureLink().href = canvas.toDataURL("image/png");
}

function tick(timestamp: number) {
  drawFrame(timestamp);
  rafId = window.requestAnimationFrame(tick);
}

/** Animated up/down favicon for browser tabs (canvas-driven). */
export function startAnimatedFavicon() {
  if (started || typeof document === "undefined") return;
  started = true;

  canvas = document.createElement("canvas");
  canvas.width = FAVICON_SIZE;
  canvas.height = FAVICON_SIZE;
  ctx = canvas.getContext("2d");

  image = new Image();
  image.src = SOURCE;
  image.onload = () => {
    drawFrame(performance.now());
    rafId = window.requestAnimationFrame(tick);
  };
}

export function stopAnimatedFavicon() {
  if (rafId) window.cancelAnimationFrame(rafId);
  rafId = 0;
  started = false;
}
