import { useMediaQuery } from '@uidotdev/usehooks'
import { useEffect, useRef, useState } from 'react'

interface Product {
  id: string
  productPhoto: string
  icon?: string
  name: string
  to: string
  position: {
    x: number
    y: number
  }
  xl: {
    x: number
    y: number
    scale: number
  }
  lg: {
    x: number
    y: number
    scale: number
  }
  sm: {
    x: number
    y: number
    scale: number
  }
}

const productsSlide: Product[] = [
  {
    id: 'productSlide1',
    productPhoto: '/home/slideSection/1.png',
    icon: '/home/slideSection/1.svg',
    name: 'aires.name',
    to: '/productos/aires',
    position: {
      x: 1485,
      y: 200
    },
    xl: {
      x: 0,
      y: 50,
      scale: 3
    },
    lg: {
      x: 0,
      y: 50,
      scale: 3
    },
    sm: {
      x: 8,
      y: 30,
      scale: 1.6
    }
  },
  {
    id: 'productSlide2',
    productPhoto: '/home/slideSection/2.png',
    icon: '/home/slideSection/2.svg',
    name: 'tvs.name',
    to: '/productos/tvs',
    position: {
      x: 1456,
      y: 650
    },
    lg: {
      x: 0,
      y: 360,
      scale: 2
    },
    xl: {
      x: 0,
      y: 500,
      scale: 2
    },
    sm: {
      x: 0,
      y: 230,
      scale: 1.7
    }
  },
  {
    id: 'productSlide3',
    productPhoto: '/home/slideSection/3.png',
    icon: '/home/slideSection/3.svg',
    name: 'scooters.name',
    to: '/productos/scooters',
    position: {
      x: 1109,
      y: 480
    },
    xl: {
      x: 0,
      y: 620,
      scale: 2
    },
    lg: {
      x: 0,
      y: 450,
      scale: 1.4
    },
    sm: {
      x: 0,
      y: 350,
      scale: 1.2
    }
  }
]

async function loadImage (
  src: string,
  setImages:
  React.Dispatch<React.SetStateAction<HTMLImageElement[]>>,
  index: number
): Promise<HTMLImageElement> {
  return await new Promise((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      setImages((prev) => {
        const newImages = [...prev]
        newImages[index] = image
        return newImages
      })

      resolve(image)
    }
    image.onerror = reject
  })
}

interface UseSlides {
  canvasRef: React.RefObject<HTMLCanvasElement>
  selectedProduct: Product | null
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>
  productsSlide: Product[]
  stopInterval: () => void
}

export const useSlides = (): UseSlides => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null >(null)
  const isLg = useMediaQuery('(min-width: 1024px)')
  const isXl = useMediaQuery('(min-width: 2000px)')

  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas != null) {
      const ctx = canvas.getContext('2d')
      if (ctx != null && selectedProduct != null) {
        const canvasWidth = canvas.offsetWidth
        const transformY = isXl ? selectedProduct.xl.y : isLg ? selectedProduct.lg.y : selectedProduct.sm.y
        const transformX = isXl ? selectedProduct.xl.x : isLg ? selectedProduct.lg.x : selectedProduct.sm.x
        const x = canvasWidth / 2 + transformX
        const y = transformY
        canvas.style.transformOrigin = `${x}px ${y}px`
        canvas.style.transform = `scale(${isLg ? selectedProduct.lg.scale : selectedProduct.sm.scale})`
      } else {
        canvas.style.transform = 'scale(1)'
        canvas.style.transformOrigin = 'center'
      }
      ctx?.clearRect(0, 0, canvas.width, canvas.height)

      void drawImages(productsSlide, ctx)
    }
  }, [canvasRef, selectedProduct])

  async function drawImages (productsSlide: Product[], ctx: CanvasRenderingContext2D | null): Promise<void> {
    if (ctx == null && canvasRef.current == null) {
      return
    }

    for (let i = 0; i < productsSlide.length; i++) {
      const product = productsSlide[i]

      const image = typeof images[i] !== 'undefined'
        ? images[i]
        : await loadImage(product.productPhoto, setImages, i)

      if (ctx == null) {
        return
      }
      if (selectedProduct?.id === product.id) {
        ctx?.drawImage(
          image,
          product.position.x,
          product.position.y,
          image.width,
          image.height
        )
        ctx?.save()
      } else {
        if (selectedProduct !== null) {
          ctx.filter = 'blur(10px)'
        }

        ctx?.drawImage(
          image,
          product.position.x,
          product.position.y,
          image.width, image.height
        )
        ctx?.save()
        ctx.filter = 'none'
      }
    }
  }

  useEffect(() => {
    let index = 0
    const id = setInterval(() => {
      setSelectedProduct(productsSlide[index])
      index = index === productsSlide.length - 1 ? 0 : index + 1
    }, 5000)
    setIntervalId(id)

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId)
      }
    }
  }, [])

  const stopInterval = (): void => {
    if (intervalId !== null) {
      clearInterval(intervalId)
    }
  }

  return { canvasRef, selectedProduct, setSelectedProduct, productsSlide, stopInterval }
}
