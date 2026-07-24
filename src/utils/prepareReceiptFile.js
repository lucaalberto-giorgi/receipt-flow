// Vercel serverless functions cap request bodies at ~4.5 MB, and huge photos
// slow extraction down anyway. Downscale large images client-side before
// upload; reject anything else that exceeds the limit.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024
const COMPRESS_THRESHOLD_BYTES = 1.5 * 1024 * 1024
const MAX_DIMENSION = 1600
const JPEG_QUALITY = 0.85

export class FileTooLargeError extends Error {
  constructor() {
    super('File is too large. The maximum upload size is 4 MB.')
    this.name = 'FileTooLargeError'
  }
}

async function downscaleImage(file) {
  const bitmap = await createImageBitmap(file)

  try {
    const scale = Math.min(
      1,
      MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
    )
    const width = Math.max(1, Math.round(bitmap.width * scale))
    const height = Math.max(1, Math.round(bitmap.height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d').drawImage(bitmap, 0, 0, width, height)

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY),
    )

    if (!blob) {
      return null
    }

    const baseName = file.name.replace(/\.[^.]+$/, '')
    return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' })
  } finally {
    bitmap.close?.()
  }
}

export async function prepareReceiptFile(file) {
  const isImage = file.type.startsWith('image/')

  if (!isImage) {
    if (file.size > MAX_UPLOAD_BYTES) {
      throw new FileTooLargeError()
    }
    return file
  }

  if (file.size <= COMPRESS_THRESHOLD_BYTES) {
    return file
  }

  let compressed = null
  try {
    compressed = await downscaleImage(file)
  } catch {
    compressed = null
  }

  // Prefer the smaller of the two; fall back to the original if compression
  // failed but the original still fits under the limit.
  const candidate =
    compressed && compressed.size < file.size ? compressed : file

  if (candidate.size > MAX_UPLOAD_BYTES) {
    throw new FileTooLargeError()
  }

  return candidate
}
