
function SkillCard({ title, skills }) {
  return (
    <article
      className="group rounded-2xl border border-white/15
                 bg-white/5 p-6 shadow-lg shadow-black/10
                 backdrop-blur-md transition-all duration-300
                 hover:-translate-y-1 hover:border-violet-400/50
                 hover:bg-violet-400/10
                 hover:shadow-[0_12px_30px_rgba(139,92,246,0.15)]
                 motion-reduce:hover:translate-y-0"
    >
      <h3
        className="mb-5 font-alan text-xl font-semibold
                   text-slate-100 transition-colors duration-300
                   group-hover:text-violet-400"
      >
        {title}
      </h3>

      <ul className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <li key={skill}>
            <span
              className="inline-flex rounded-xl border border-white/15
                         bg-gradient-to-br from-white/15 to-white/5
                         px-4 py-2 font-sora text-sm text-slate-200
                         shadow-sm backdrop-blur-lg
                         transition-all duration-300
                         group-hover:border-violet-400/40
                         group-hover:bg-violet-400/15
                         group-hover:text-white
                         group-hover:shadow-[0_4px_15px_rgba(139,92,246,0.12)]
                         active:scale-95"
            >
              {skill}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default SkillCard;
