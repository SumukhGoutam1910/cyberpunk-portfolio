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

    // Add: shooting stars
    type ShootingStar = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number };
    const shootingStars: Array<ShootingStar> = [];

    // Helper: spawn a shooting star occasionally
    const maybeSpawnShootingStar = () => {
      if (shootingStars.length > 4) return; // cap
      if (Math.random() < 0.008) {
        const fromLeft = Math.random() < 0.5;
        const startX = fromLeft ? -50 : window.innerWidth + 50;
        const startY = Math.random() * window.innerHeight * 0.5;
        const speed = 6 + Math.random() * 4;
        const angle = fromLeft ? (Math.PI / 4) : (3 * Math.PI) / 4;
        shootingStars.push({
          x: startX,
          y: startY,
          vx: (fromLeft ? 1 : -1) * Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.6,
          life: 0,
          maxLife: 80 + Math.random() * 60,
        });
      }
    };

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

      // Aurora / nebula ribbons behind grid for depth
      ctx.save();
      const t = time * 0.0004;
      for (let i = 0; i < 2; i++) {
        const baseY = h * (0.18 + i * 0.07);
        const amp = 28 + i * 18;
        const freq = 0.002 + i * 0.0008;

        const grad = ctx.createLinearGradient(0, baseY - 120, 0, baseY + 120);
        grad.addColorStop(0, 'rgba(0,255,255,0.02)');
        grad.addColorStop(0.5, i === 0 ? 'rgba(255,0,128,0.06)' : 'rgba(0,255,255,0.06)');
        grad.addColorStop(1, 'rgba(0,255,255,0.02)');

        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= w; x += 8) {
          const y =
            baseY +
            Math.sin(x * freq + t * 6 + i) * amp +
            Math.sin(x * (freq * 0.6) + t * 4.2 + i * 2.3) * (amp * 0.4);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, baseY + 180);
        ctx.lineTo(0, baseY + 180);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
      ctx.globalCompositeOperation = 'source-over';

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

      // Add: subtle rotating hex wireframe field for extra depth (below horizon)
      ctx.save();
      const hexSize = 60;
      const rot = t * 0.35;
      ctx.translate(w / 2 + mouse.x * 60, (h + horizonY) / 2 + 40);
      ctx.rotate(rot);
      ctx.translate(-(w / 2 + mouse.x * 60), -((h + horizonY) / 2 + 40));
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.06)';
      ctx.lineWidth = 1;

      const drawHex = (cx: number, cy: number, r: number) => {
        ctx.beginPath();
        for (let a = 0; a < 6; a++) {
          const ang = (Math.PI / 3) * a;
          const x = cx + Math.cos(ang) * r;
          const y = cy + Math.sin(ang) * r;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      };

      const stepX = hexSize * 1.5;
      const stepY = Math.sqrt(3) * hexSize * 0.5;
      for (let y = horizonY + 60; y < h + hexSize; y += stepY) {
        const offsetX = ((Math.floor((y - horizonY) / stepY) % 2) * hexSize) / 2;
        for (let x = -hexSize; x < w + hexSize; x += stepX) {
          drawHex(x + offsetX, y, hexSize * 0.5);
        }
      }
      ctx.restore();

      // Shooting stars layer (on top but behind UI overlays)
      ctx.save();
      maybeSpawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;

        const alpha = Math.max(0, 1 - s.life / s.maxLife);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 3, s.y - s.vy * 3);
        ctx.stroke();

        // glow head
        ctx.fillStyle = `rgba(0, 255, 255, ${0.25 * alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        if (s.life >= s.maxLife || s.x < -60 || s.x > w + 60 || s.y > h + 60) {
          shootingStars.splice(i, 1);
        }
      }
      ctx.restore();

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

      // Add: subtle vignette to focus attention
      ctx.save();
      const vignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.7);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

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