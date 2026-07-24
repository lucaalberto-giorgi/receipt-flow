function DashboardSummaryCard({ index, title, value, caption }) {
  return (
    <article className="card p-0">
      <div className="strip">
        <span>{title}</span>
        <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
          {index}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="figure text-3xl font-bold tracking-tight text-ink sm:text-[34px]">
          {value}
        </p>

        <div className="tear mt-4" />

        <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint">
          {caption}
        </p>
      </div>
    </article>
  )
}

export default DashboardSummaryCard
