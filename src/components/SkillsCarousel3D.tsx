import { motion } from "framer-motion";

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

const slides: Array<{ key: keyof SkillsData; title: string; color: string; barFrom: string; barVia: string; barTo: string; border: string; glow: string }> = [
  { key: "frontend", title: "Frontend", color: "text-cyan-400", barFrom: "from-cyan-400", barVia: "via-sky-400", barTo: "to-blue-500", border: "border-cyan-500/30", glow: "shadow-[0_0_12px_#22d3ee]" },
  { key: "backend", title: "Backend", color: "text-pink-400", barFrom: "from-pink-400", barVia: "via-fuchsia-400", barTo: "to-rose-500", border: "border-pink-500/30", glow: "shadow-[0_0_12px_#f472b6]" },
  { key: "tools", title: "Tools", color: "text-emerald-400", barFrom: "from-emerald-400", barVia: "via-teal-400", barTo: "to-cyan-500", border: "border-green-500/30", glow: "shadow-[0_0_12px_#34d399]" },
  { key: "programmingLanguages", title: "Programming Languages", color: "text-violet-400", barFrom: "from-violet-400", barVia: "via-fuchsia-400", barTo: "to-pink-500", border: "border-violet-500/30", glow: "shadow-[0_0_12px_#a78bfa]" },
];

export function SkillsCarousel3D({ skills }: Props) {
  const items = slides.filter(s => (skills as any)[s.key] && (skills as any)[s.key].length > 0);

  return (
    <div className="relative">
      {/* Perspective wrapper */}
      <div className="relative mx-auto max-w-full">
        <motion.div
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-2 sm:px-0"
          style={{ perspective: 1200 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
        >
          {items.map((s, idx) => {
            const list: Array<SkillItem> = (skills as any)[s.key] as Array<SkillItem>;
            return (
              <motion.div
                key={s.key as string}
                className={`snap-center shrink-0 w-[85%] sm:w-[70%] lg:w-[45%] xl:w-[36%] rounded-xl border ${s.border} bg-black/60 backdrop-blur-md p-6 relative overflow-hidden`}
                whileHover={{ rotateY: 4, rotateX: -1, z: 40, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                style={{
                  transformStyle: "preserve-3d",
                }}
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
                  {list.map((skill, i) => (
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
        {/* Soft edges for scroll */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-black to-transparent" />
      </div>
      {/* Hint */}
      <div className="mt-4 text-center text-xs text-gray-400">
        Drag or scroll horizontally to explore categories
      </div>
    </div>
  );
}

export default SkillsCarousel3D;
