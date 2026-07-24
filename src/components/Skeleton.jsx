function Skeleton({ className = '', rounded = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-sunken ${rounded} ${className}`}
    />
  )
}

export default Skeleton
