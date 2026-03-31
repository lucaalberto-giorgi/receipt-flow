function Skeleton({ className = '', rounded = 'rounded-xl' }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-slate-200/80 dark:bg-slate-700/70 ${rounded} ${className}`}
    />
  )
}

export default Skeleton
