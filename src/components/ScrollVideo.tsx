import { useEffect, useRef, useState } from 'react';

export const HERO_VIDEO_URL = '/video/hero.mp4';
const HERO_POSTER_URL = '/video/hero-poster.jpg';

const MIN_FRAMES = 24;
const FRAMES_PER_SECOND = 24;
const LERP = 0.12;

function isSmallScreen() {
  return window.innerWidth < 768;
}

/** Fewer, smaller frames on phones to keep memory in check. */
function frameBudget() {
  return isSmallScreen() ? { maxFrames: 90, maxWidth: 640 } : { maxFrames: 120, maxWidth: 854 };
}

function drawCover(ctx: CanvasRenderingContext2D, source: ImageBitmap, cw: number, ch: number) {
  const scale = Math.max(cw / source.width, ch / source.height);
  const dw = source.width * scale;
  const dh = source.height * scale;
  ctx.drawImage(source, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
}

function waitFor(el: HTMLMediaElement, event: string) {
  return new Promise<void>((resolve, reject) => {
    const ok = () => {
      cleanup();
      resolve();
    };
    const fail = () => {
      cleanup();
      reject(new Error('media error'));
    };
    const cleanup = () => {
      el.removeEventListener(event, ok);
      el.removeEventListener('error', fail);
    };
    el.addEventListener(event, ok, { once: true });
    el.addEventListener('error', fail, { once: true });
  });
}

/**
 * Download the whole file once so every seek is local. Falls back to the
 * remote URL if the CDN refuses cross-origin fetches.
 */
async function loadLocalSource(src: string) {
  try {
    const res = await fetch(src);
    if (!res.ok) throw new Error(String(res.status));
    return URL.createObjectURL(await res.blob());
  } catch {
    return null;
  }
}

async function extractFrames(src: string, signal: { cancelled: boolean }) {
  const { maxFrames, maxWidth } = frameBudget();
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.src = src;

  await waitFor(video, 'loadeddata');
  const duration = video.duration;
  if (!Number.isFinite(duration) || duration <= 0) throw new Error('no duration');

  const count = Math.min(maxFrames, Math.max(MIN_FRAMES, Math.round(duration * FRAMES_PER_SECOND)));
  const scale = Math.min(1, maxWidth / video.videoWidth);
  const resizeWidth = Math.round(video.videoWidth * scale);
  const resizeHeight = Math.round(video.videoHeight * scale);

  const frames: ImageBitmap[] = [];
  for (let i = 0; i < count; i++) {
    if (signal.cancelled) break;
    video.currentTime = (i / (count - 1)) * (duration - 0.05);
    await waitFor(video, 'seeked');
    frames.push(await createImageBitmap(video, { resizeWidth, resizeHeight, resizeQuality: 'medium' }));
  }

  video.removeAttribute('src');
  video.load();
  return frames;
}

export default function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sharpRef = useRef<HTMLVideoElement>(null);
  const framesRef = useRef<ImageBitmap[] | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [hasFrame, setHasFrame] = useState(false);
  const [framesReady, setFramesReady] = useState(false);

  // 1. Resolve the source: local blob when possible, remote URL otherwise.
  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;
    loadLocalSource(HERO_VIDEO_URL).then((local) => {
      if (cancelled) {
        if (local) URL.revokeObjectURL(local);
        return;
      }
      objectUrl = local;
      setSrc(local ?? HERO_VIDEO_URL);
    });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  // 2. Once the visible video has a frame, build the frame cache from the same source.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    const signal = { cancelled: false };

    const start = async () => {
      setHasFrame(true);
      await new Promise((r) => setTimeout(r, 300));
      if (signal.cancelled) return;
      try {
        const frames = await extractFrames(src, signal);
        if (signal.cancelled || frames.length === 0) {
          frames.forEach((f) => f.close());
          return;
        }
        framesRef.current = frames;
        setFramesReady(true);
      } catch {
        // Keep the seek-based fallback on the visible <video>.
      }
    };

    if (video.readyState >= 2) start();
    else video.addEventListener('loadeddata', start, { once: true });

    return () => {
      signal.cancelled = true;
      video.removeEventListener('loadeddata', start);
      framesRef.current?.forEach((f) => f.close());
      framesRef.current = null;
    };
  }, [src]);

  // 3. Scroll → smoothed progress → blended canvas frames, or video seek as fallback.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let maxScroll = 1;
    const measure = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    const progress = () => Math.min(1, Math.max(0, window.scrollY / maxScroll));

    let smoothed = 0;
    let lastDrawn = -1;
    let raf = 0;

    // The frame cache is downscaled, so once scrolling settles we swap in the
    // full-resolution video seeked to the exact same time.
    let stillSince: number | null = null;
    let sharpTime = -1;
    let sharpShown = false;
    const hideSharp = () => {
      const sharp = sharpRef.current;
      sharpTime = -1;
      if (!sharp || !sharpShown) return;
      sharp.style.transition = 'none';
      sharp.style.opacity = '0';
      sharpShown = false;
    };
    const showSharp = (time: number) => {
      const sharp = sharpRef.current;
      if (!sharp || sharp.readyState < 1 || Math.abs(sharpTime - time) < 0.02) return;
      sharpTime = time;
      const reveal = () => {
        if (sharpTime !== time) return;
        sharp.style.transition = 'opacity 250ms ease-out';
        sharp.style.opacity = '1';
        sharpShown = true;
      };
      if (Math.abs(sharp.currentTime - time) < 0.001 && !sharp.seeking) reveal();
      else {
        sharp.addEventListener('seeked', reveal, { once: true });
        sharp.currentTime = time;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.imageSmoothingQuality = 'high';
      measure();
      lastDrawn = -1;
    };
    resize();
    smoothed = progress();
    window.addEventListener('resize', resize);
    // Page height changes as fonts/images load.
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);

    const tick = () => {
      smoothed += (progress() - smoothed) * LERP;
      const frames = framesRef.current;
      const video = videoRef.current;

      if (frames && frames.length > 0) {
        if (Math.abs(smoothed - lastDrawn) > 0.00005) {
          // Crossfade the two neighbouring frames so motion reads as continuous.
          const pos = smoothed * (frames.length - 1);
          const i = Math.floor(pos);
          const t = pos - i;
          ctx.globalAlpha = 1;
          drawCover(ctx, frames[i], canvas.width, canvas.height);
          if (t > 0.01 && i + 1 < frames.length) {
            ctx.globalAlpha = t;
            drawCover(ctx, frames[i + 1], canvas.width, canvas.height);
            ctx.globalAlpha = 1;
          }
          lastDrawn = smoothed;
        }

        const sharp = sharpRef.current;
        if (Math.abs(progress() - smoothed) > 0.001) {
          stillSince = null;
          hideSharp();
        } else if (sharp && Number.isFinite(sharp.duration)) {
          const now = performance.now();
          stillSince ??= now;
          if (now - stillSince > 120) showSharp(smoothed * (sharp.duration - 0.05));
        }
      } else if (video && video.readyState >= 1 && Number.isFinite(video.duration)) {
        const target = smoothed * (video.duration - 0.05);
        if (!video.seeking && Math.abs(video.currentTime - target) > 0.04) {
          video.currentTime = target;
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]" aria-hidden>
      <img
        src={HERO_POSTER_URL}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          hasFrame || framesReady ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {src && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            hasFrame && !framesReady ? 'opacity-100' : 'opacity-0'
          }`}
          src={src}
          muted
          playsInline
          preload="auto"
        />
      )}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          framesReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {src && framesReady && (
        <video
          ref={sharpRef}
          className="absolute inset-0 h-full w-full object-cover opacity-0"
          src={src}
          muted
          playsInline
          preload="auto"
        />
      )}
      {/* Transparent scrim: keeps white type legible over the bright office shots */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 35%, rgba(10,10,10,0.3) 60%, rgba(10,10,10,0.7) 100%)',
        }}
      />
    </div>
  );
}
