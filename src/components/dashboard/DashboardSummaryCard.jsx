const accentStyles = {
  violet: {
    badge:
      'border-violet-200 bg-violet-50 text-violet-700',
    icon: 'bg-violet-600 text-white shadow-[0_18px_30px_-18px_rgba(124,58,237,0.8)]',
  },
  indigo: {
    badge:
      'border-indigo-200 bg-indigo-50 text-indigo-700',
    icon: 'bg-indigo-600 text-white shadow-[0_18px_30px_-18px_rgba(79,70,229,0.8)]',
  },
  emerald: {
    badge:
      'border-emerald-200 bg-emerald-50 text-emerald-700',
    icon: 'bg-emerald-600 text-white shadow-[0_18px_30px_-18px_rgba(5,150,105,0.8)]',
  },
  amber: {
    badge:
      'border-amber-200 bg-amber-50 text-amber-700',
    icon: 'bg-amber-500 text-white shadow-[0_18px_30px_-18px_rgba(245,158,11,0.8)]',
  },
}

function DashboardSummaryCard({ accent = 'violet', eyebrow, title, value }) {
  const styles = accentStyles[accent] ?? accentStyles.violet

  return (
    <article className="rounded-[28px] border border-violet-100/80 bg-white p-5 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            {eyebrow}
          </p>
          <h3 className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">{title}</h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold ${styles.icon}`}
        >
          {title.charAt(0)}
        </div>
      </div>

      <p className="mt-8 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {value}
      </p>

      <span
        className={`mt-5 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${styles.badge}`}
      >
        Shared state
      </span>
    </article>
  )
}

export default DashboardSummaryCard
