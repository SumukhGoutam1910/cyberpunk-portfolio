import { useEffect, useRef } from 'react';

export function CyberpunkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Add DPR-aware sizing for crisp lines
    const resizeCanvas = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse-based parallax
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;  // -1..1
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2; // -1..1
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Pre-generate stars for parallax background
    type Star = { x: number; y: number; size: number; speed: number };
    const stars: Array<Star> = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.2,
      speed: Math.random() * 0.2 + 0.05,
    }));

    let animationFrame: number;

    const drawGrid = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
      gradient.addColorStop(1, 'rgba(5, 5, 8, 0.98)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Subtle stars with parallax drift
      ctx.save();
      for (const s of stars) {
        const driftX = mouse.x * 8;
        const driftY = mouse.y * 8;
        const twinkle = 0.5 + Math.sin((time * 0.003 + s.x + s.y) * s.speed) * 0.5;

        ctx.globalAlpha = 0.35 + twinkle * 0.4;
        ctx.fillStyle = 'rgba(180, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(s.x + driftX, s.y + driftY, s.size, 0, Math.PI * 2);
        ctx.fill();

        // gentle downward scroll for stars
        s.y += s.speed * 0.6;
        if (s.y > h + 10) s.y = -10;
      }
      ctx.restore();
      ctx.globalAlpha = 1;

      // Perspective ground grid (retro synthwave style)
      const vpX = w / 2 + mouse.x * 40;           // vanishing point X with mouse sway
      const horizonY = h * 0.42 + mouse.y * 20;   // horizon shifts with mouse Y
      const rows = 28;                             // horizontal lines
      const cols = 20;                             // vertical lines count each side
      const bottomSpacing = 60;                    // spacing at bottom

      // Horizon glow
      const glowGrad = ctx.createRadialGradient(vpX, horizonY, 5, vpX, horizonY, w * 0.7);
      glowGrad.addColorStop(0, 'rgba(0, 255, 255, 0.12)');
      glowGrad.addColorStop(1, 'rgba(0, 255, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      // Horizontal perspective lines (accelerated spacing toward bottom)
      for (let i = 1; i <= rows; i++) {
        const t = i / rows;
        // Ease exponent > 1 to cluster lines near horizon, spread near bottom
        const eased = t * t;
        const y = horizonY + (h - horizonY) * eased;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.08 + (1 - t) * 0.12})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Vertical lines converging to vanishing point
      for (let i = -cols; i <= cols; i++) {
        const xBottom = vpX + i * bottomSpacing;
        ctx.beginPath();
        ctx.moveTo(vpX, horizonY);
        ctx.lineTo(xBottom, h);
        const alpha = 0.08 + (1 - Math.min(1, Math.abs(i) / cols)) * 0.12;
        ctx.strokeStyle = `rgba(255, 0, 128, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Neon scan line
      const scanLineY = (time * 0.1) % h;
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanLineY);
      ctx.lineTo(w, scanLineY);
      ctx.stroke();

      // Occasional holographic glitch bands
      if (Math.random() < 0.02) {
        const glitchY = Math.random() * h * 0.8 + horizonY * 0.1;
        const glitchHeight = 16 + Math.random() * 28;
        ctx.fillStyle = 'rgba(255, 0, 128, 0.07)';
        ctx.fillRect(0, glitchY, w, glitchHeight);
      }

      animationFrame = requestAnimationFrame(drawGrid);
    };

    drawGrid(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}