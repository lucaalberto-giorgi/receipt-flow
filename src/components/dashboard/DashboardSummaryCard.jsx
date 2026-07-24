function DashboardSummaryCard({ index, title, value, caption }) {
  return (
    <article className="receipt-stub p-5 pb-6 sm:p-6 sm:pb-7">
      <div className="flex items-baseline justify-between gap-3">
        <p className="eyebrow">{title}</p>
        <span className="font-mono text-[11px] tracking-[0.1em] text-ink-faint">
          {index}
        </span>
      </div>

      <p className="figure mt-5 text-3xl font-semibold tracking-tight text-ink sm:mt-6 sm:text-[34px]">
        {value}
      </p>

      <div className="tear mt-4" />

      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
        {caption}
      </p>
    </article>
  )
}

export default DashboardSummaryCard
