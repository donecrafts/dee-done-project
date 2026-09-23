const FAVICON_SIZE = 32;
const SOURCE = "/favicon-source.png";

let linkEl: HTMLLinkElement | null = null;
let started = false;

function ensureLink(): HTMLLinkElement {
  if (linkEl) return linkEl;
  linkEl = document.querySelector("link[rel='icon']") ?? document.createElement("link");
  linkEl.rel = "icon";
  linkEl.type = "image/png";
  if (!linkEl.parentElement) document.head.appendChild(linkEl);
  return linkEl;
}

/** Static favicon (no continuous animation — keeps the main thread free). */
export function startAnimatedFavicon() {
  if (started || typeof document === "undefined") return;
  started = true;

  const image = new Image();
  image.src = SOURCE;
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = FAVICON_SIZE;
    canvas.height = FAVICON_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pad = 2;
    ctx.clearRect(0, 0, FAVICON_SIZE, FAVICON_SIZE);
    ctx.drawImage(image, pad, pad, FAVICON_SIZE - pad * 2, FAVICON_SIZE - pad * 2);
    ensureLink().href = canvas.toDataURL("image/png");
  };
}

export function stopAnimatedFavicon() {
  started = false;
}
