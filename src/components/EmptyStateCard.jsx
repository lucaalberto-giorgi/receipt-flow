import { Link } from 'react-router-dom'

function EmptyStateCard({
  title,
  description,
  actionLabel,
  actionTo,
  eyebrow = 'Empty State',
  padded = true,
}) {
  return (
    <div
      className={`rounded-2xl border border-violet-100 bg-violet-50/70 text-center dark:border-slate-700 dark:bg-slate-800/80 sm:rounded-[24px] ${
        padded ? 'px-5 py-8 sm:px-8 sm:py-12' : 'px-4 py-6 sm:px-5 sm:py-8'
      }`}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_16px_30px_-22px_rgba(76,29,149,0.35)] dark:bg-slate-900">
        <div className="h-2.5 w-2.5 rounded-full bg-violet-500" />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-violet-500">
        {eyebrow}
      </p>
      <h4 className="mt-3 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h4>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>
      {actionLabel && actionTo ? (
        <Link
          to={actionTo}
          className="mt-5 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_32px_-20px_rgba(124,58,237,0.9)] transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}

export default EmptyStateCard
