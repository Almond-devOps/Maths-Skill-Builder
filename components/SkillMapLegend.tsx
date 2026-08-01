export default function SkillMapLegend() {
  const items = [
    { swatch: "bg-gold border-gold-soft", mark: "★", label: "mastered" },
    { swatch: "bg-redpen-soft border-redpen", mark: "✕", label: "gap" },
    { swatch: "bg-[#EAE6D8] border-[#B8B29C]", mark: "", label: "blocked by gap" },
    { swatch: "bg-white border-paper-line border-dashed", mark: "", label: "not yet assessed" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[11px] text-ink-soft">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span className={`inline-block h-3 w-3 rounded-full border ${item.swatch}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
