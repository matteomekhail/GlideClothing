'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Label } from "@/Components/ui/label"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from 'framer-motion'

const productVariants = [
  {
    color: 'Black',
    images: [
      '/img/Prodotti/Black1.jpg',
      '/img/Lifestyle/Lifestyle-Black-1.jpg',
      '/img/Prodotti/Black2.jpg',
      '/img/Lifestyle/Lifestyle-Black-2.jpg'
    ]
  },
  {
    color: 'Blue',
    images: [
      '/img/Prodotti/Blue1.jpg',
      '/img/Lifestyle/Lifestyle-Blue-1.jpg',
      '/img/Prodotti/Blue2.jpg',
      '/img/Lifestyle/Lifestyle-Blue-2.jpg'
    ]
  },
  {
    color: 'Gray',
    images: [
      '/img/Prodotti/White1.jpg',
      '/img/Lifestyle/Lifestyle-White-1.jpg',
      '/img/Prodotti/White2.jpg',
      '/img/Lifestyle/Lifestyle-White-2.jpg'
    ]
  },
  {
    color: 'Pink',
    images: [
      '/img/Prodotti/Pink1.jpg',
      '/img/Lifestyle/Lifestyle-Pink-1.jpg',
      '/img/Prodotti/Pink2.jpg',
      '/img/Lifestyle/Lifestyle-Pink-2.jpg'
    ]
  }
]
// Pre-caricamento delle immagini
const preloadImages = (images: string[]) => {
  images.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

// Estrai tutte le immagini in un array piatto
const allImages = productVariants.flatMap(variant => variant.images)

export default function ProductDisplay() {
  const [currentVariant, setCurrentVariant] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('Medium')
  const [isLoading, setIsLoading] = useState(true)

  // Pre-carica le immagini al mount del componente
  useEffect(() => {
    preloadImages(allImages)
  }, [])

  // Gestisce il cambio di variante
  const handleVariantChange = (value: string) => {
    setIsLoading(true)
    setCurrentVariant(parseInt(value))
    setCurrentImage(0)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productVariants[currentVariant].images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productVariants[currentVariant].images.length) % productVariants[currentVariant].images.length)
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <motion.div 
        initial={false}
        className="grid lg:grid-cols-2 gap-8 lg:gap-12"
      >
        <div className="relative space-y-4">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${currentVariant}-${currentImage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="aspect-square overflow-hidden rounded-lg bg-background border"
            >
              <img
                src={productVariants[currentVariant].images[currentImage]}
                alt={`Glide bag in ${productVariants[currentVariant].color}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onLoad={() => setIsLoading(false)}
              />
            </motion.div>
          </AnimatePresence>
          
          <Button
            variant="default"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black hover:bg-black/90"
            onClick={() => {
              setIsLoading(true)
              prevImage()
            }}
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black hover:bg-black/90"
            onClick={nextImage}
          >
            <ChevronRight className="h-5 w-5 text-white" />
            <span className="sr-only">Next image</span>
          </Button>

          <div className="flex gap-3 overflow-x-auto pb-2 px-1">
            {productVariants[currentVariant].images.map((img, index) => (
              <motion.button
                key={index}
                initial={false}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setIsLoading(true)
                  setCurrentImage(index)
                }}
                className={cn(
                  "relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2",
                  currentImage === index ? "border-primary" : "border-border"
                )}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Glide Signature Quilted Bag</h1>
              <p className="text-2xl mt-2 text-black font-semibold">$299.99</p>
            </div>
            
            <p className="text-muted-foreground text-base/relaxed">
              Our signature quilted bag combines style and functionality. Perfect for everyday use or special occasions.
            </p>

            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium mb-3">Color</h2>
                <RadioGroup
                  value={currentVariant.toString()}
                  onValueChange={(value) => setCurrentVariant(parseInt(value))}
                  className="flex gap-3"
                >
                  {productVariants.map((variant, index) => (
                    <Label
                      key={variant.color}
                      className="relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-offset-2 ring-offset-background"
                    >
                      <RadioGroupItem value={index.toString()} id={`color-${index}`} className="sr-only" />
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        aria-hidden="true"
                        className={cn(
                          "h-8 w-8 rounded-full border shadow-sm transition-all",
                          {
                            'bg-gray-900': variant.color === 'Black',
                            'bg-sky-400': variant.color === 'Blue',
                            'bg-white': variant.color === 'White',
                            'bg-pink-400': variant.color === 'Pink',
                          }
                        )}
                      />
                      <span className="sr-only">{variant.color}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-black hover:bg-black/90 text-white" 
            size="lg"
            variant="default"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Add to Bag
          </Button>
        </div>
      </motion.div>
    </div>
  )
}


