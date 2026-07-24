function DashboardSummaryCard({ index, title, value, caption }) {
  return (
    <article className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow">{title}</p>
        <span className="copy-meta">{index}</span>
      </div>

      <p className="figure mt-4 text-[28px] font-bold tracking-tight text-ink">
        {value}
      </p>

      <div className="tear mt-4" />

      <p className="copy-meta mt-3">{caption}</p>
    </article>
  )
}

export default DashboardSummaryCard
