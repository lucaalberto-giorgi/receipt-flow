function Skeleton({ className = '', rounded = 'rounded-md' }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-sunken ${rounded} ${className}`}
    />
  )
}

export default Skeleton
