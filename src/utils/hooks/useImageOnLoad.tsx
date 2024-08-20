import type { CSSProperties } from 'react'
import { useState } from 'react'

interface ImageStyle {
  thumbnail: CSSProperties
  fullSize: CSSProperties
}

interface ImageOnLoadType {
  handleImageOnLoad: () => void
  css: ImageStyle
}

export function useImageOnLoad(): ImageOnLoadType {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // Triggered when full image will be loaded.
  const handleImageOnLoad = () => {
    setIsLoaded(true)
  }

  const css: ImageStyle = {
    // Thumbnail style.
    thumbnail: {
      visibility: 'visible',
      filter: isLoaded ? 'blur(0px)' : 'blur(8px)',
      transition: 'filter 0ms ease-out 100ms',
    },
    // Full image style.
    fullSize: {
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 100ms ease-in 0ms',
    },
  }

  return { handleImageOnLoad, css }
}
