import { motion } from "framer-motion";
import * as React from "react";

type SkillItem = { name: string; level: number };
type SkillsData = {
  frontend: Array<SkillItem>;
  backend: Array<SkillItem>;
  tools: Array<SkillItem>;
  programmingLanguages?: Array<SkillItem>;
  ai?: Array<SkillItem>;
};

type Props = {
  skills: SkillsData;
};

const RADIUS = 420; // distance from center for 3D ring
const AUTO_ROTATE_SPEED = 0.02; // radians per frame

const slides: Array<{ key: keyof SkillsData; title: string; color: string; barFrom: string; barVia: string; barTo: string; border: string; glow: string }> = [
  { key: "frontend", title: "Frontend", color: "text-cyan-400", barFrom: "from-cyan-400", barVia: "via-sky-400", barTo: "to-blue-500", border: "border-cyan-500/30", glow: "shadow-[0_0_12px_#22d3ee]" },
  { key: "backend", title: "Backend", color: "text-pink-400", barFrom: "from-pink-400", barVia: "via-fuchsia-400", barTo: "to-rose-500", border: "border-pink-500/30", glow: "shadow-[0_0_12px_#f472b6]" },
  { key: "tools", title: "Tools", color: "text-emerald-400", barFrom: "from-emerald-400", barVia: "via-teal-400", barTo: "to-cyan-500", border: "border-green-500/30", glow: "shadow-[0_0_12px_#34d399]" },
  { key: "programmingLanguages", title: "Programming Languages", color: "text-violet-400", barFrom: "from-violet-400", barVia: "via-fuchsia-400", barTo: "to-pink-500", border: "border-violet-500/30", glow: "shadow-[0_0_12px_#a78bfa]" },
];

export function SkillsCarousel3D({ skills }: Props) {
  const items = slides.filter(s => (skills as any)[s.key] && ( (skills as any)[s.key] as Array<SkillItem>).length > 0);
  const [angle, setAngle] = React.useState(0); // in radians
  const draggingRef = React.useRef(false);
  const lastXRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);

  // Auto-rotate
  React.useEffect(() => {
    const tick = () => {
      if (!draggingRef.current) {
        setAngle((prev: number) => prev + AUTO_ROTATE_SPEED);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Pointer drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    lastXRef.current = e.clientX;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    // Sensitivity tweak
    setAngle((prev: number) => prev + dx * 0.005);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  // Distribute items evenly around ring
  const step = (2 * Math.PI) / Math.max(items.length, 1);

  return (
    <div className="relative">
      {/* 3D stage */}
      <div
        className="relative mx-auto max-w-full h-[520px] sm:h-[560px]"
        style={{
          perspective: 1200,
        }}
      >
        {/* Centered 3D ring container */}
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {/* Ring root */}
          <motion.div
            className="w-full h-full relative"
            style={{
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateY: (angle * 180) / Math.PI, // radians -> degrees
            }}
            transition={{ type: "tween", ease: "linear", duration: 0 }}
          >
            {items.map((s, idx) => {
              const theta = idx * step;
              const rotateY = (theta * 180) / Math.PI;
              return (
                <motion.div
                  key={s.key as string}
                  className={`absolute left-1/2 top-1/2 w-[78%] sm:w-[62%] lg:w-[46%] xl:w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-xl border ${s.border} bg-black/60 backdrop-blur-md p-6`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `
                      rotateY(${rotateY}deg)
                      translateZ(${RADIUS}px)
                    `,
                  }}
                  whileHover={{ scale: 1.03, translateZ: 8 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  {/* Depth gradients */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10" />

                  {/* Title */}
                  <div className="relative z-10">
                    <h3 className={`text-2xl font-bold font-mono ${s.color}`}>{s.title}</h3>
                    <div className="w-12 h-1 bg-white/20 rounded mb-6 mt-2" />
                  </div>

                  {/* List */}
                  <div className="relative z-10 space-y-5">
                    {((skills as any)[s.key] as Array<SkillItem>).map((skill, i) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-200">{skill.name}</span>
                          <span className={`${s.color.replace("text-", "text-")} font-mono`}>{skill.level}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-800/60 border border-white/10 overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${s.barFrom} ${s.barVia} ${s.barTo} ${s.glow}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.06, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Subtle scanline */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                  >
                    <motion.div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-white/25 to-transparent"
                      animate={{ y: ["0%", "120%", "0%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Edge softening */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-black to-transparent" />
      </div>

      {/* Hint */}
      <div className="mt-4 text-center text-xs text-gray-400">
        Drag horizontally to rotate the carousel
      </div>
    </div>
  );
}

export default SkillsCarousel3D;