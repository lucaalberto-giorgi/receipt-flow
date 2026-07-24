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
      className={`border-[1.5px] border-dashed border-rule bg-card text-center ${
        padded ? 'px-5 py-8 sm:px-8 sm:py-12' : 'px-4 py-6 sm:px-5 sm:py-8'
      }`}
    >
      <div className="mx-auto flex h-11 w-11 items-center justify-center bg-ink text-card">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
        >
          <path d="M6 3h12v16.5l-2 -1.5l-2 1.5l-2 -1.5l-2 1.5l-2 -1.5l-2 1.5Z" />
          <path d="M9 7.5h6" />
          <path d="M9 11h6" />
          <path d="M9 14.5h3.5" />
        </svg>
      </div>
      <p className="copy-meta mt-5">{eyebrow} — Nothing on file</p>
      <h4 className="mt-3 text-lg font-bold tracking-tight text-ink">
        {title}
      </h4>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-soft">
        {description}
      </p>
      {actionLabel && actionTo ? (
        <Link to={actionTo} className="btn btn-primary mt-6">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}

export default EmptyStateCard
