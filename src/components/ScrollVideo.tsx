import { useEffect, useRef, useState } from 'react';

export const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';

const MAX_FRAMES = 90;
const MIN_FRAMES = 24;
const FRAMES_PER_SECOND = 12;
const MAX_FRAME_WIDTH = 960;
const LERP = 0.12;

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / max));
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  sw: number,
  sh: number,
  cw: number,
  ch: number,
) {
  const scale = Math.max(cw / sw, ch / sh);
  const dw = sw * scale;
  const dh = sh * scale;
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

async function extractFrames(src: string, signal: { cancelled: boolean }) {
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.src = src;

  await waitFor(video, 'loadedmetadata');
  const duration = video.duration;
  if (!Number.isFinite(duration) || duration <= 0) throw new Error('no duration');

  const count = Math.min(MAX_FRAMES, Math.max(MIN_FRAMES, Math.round(duration * FRAMES_PER_SECOND)));
  const scale = Math.min(1, MAX_FRAME_WIDTH / video.videoWidth);
  const width = Math.round(video.videoWidth * scale);
  const height = Math.round(video.videoHeight * scale);

  const frames: ImageBitmap[] = [];
  for (let i = 0; i < count; i++) {
    if (signal.cancelled) break;
    video.currentTime = (i / (count - 1)) * (duration - 0.05);
    await waitFor(video, 'seeked');
    frames.push(
      await createImageBitmap(video, { resizeWidth: width, resizeHeight: height, resizeQuality: 'medium' }),
    );
  }

  video.removeAttribute('src');
  video.load();
  return frames;
}

export default function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[] | null>(null);
  const [hasFrame, setHasFrame] = useState(false);
  const [framesReady, setFramesReady] = useState(false);

  // Build the frame cache once the visible video has decoded its first frame.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const signal = { cancelled: false };

    const start = async () => {
      setHasFrame(true);
      await new Promise((r) => setTimeout(r, 300));
      if (signal.cancelled) return;
      try {
        const frames = await extractFrames(HERO_VIDEO_URL, signal);
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
  }, []);

  // Scroll → smoothed progress → canvas frame or video seek.
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let smoothed = scrollProgress();
    let lastIndex = -1;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      lastIndex = -1;
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      smoothed += (scrollProgress() - smoothed) * LERP;
      const frames = framesRef.current;

      if (frames && frames.length > 0) {
        const index = Math.round(smoothed * (frames.length - 1));
        if (index !== lastIndex) {
          const frame = frames[index];
          drawCover(ctx, frame, frame.width, frame.height, canvas.width, canvas.height);
          lastIndex = index;
        }
      } else if (video.readyState >= 1 && Number.isFinite(video.duration)) {
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
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]" aria-hidden>
      {/* Poster: mist-toned fallback shown until the video has a frame */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          hasFrame || framesReady ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background:
            'radial-gradient(60% 50% at 62% 42%, rgba(245,170,90,0.28) 0%, rgba(245,170,90,0) 60%), radial-gradient(90% 80% at 30% 20%, #7d8a99 0%, #4a5562 45%, #1d232b 100%)',
        }}
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          hasFrame && !framesReady ? 'opacity-100' : 'opacity-0'
        }`}
        src={HERO_VIDEO_URL}
        muted
        playsInline
        preload="auto"
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          framesReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
