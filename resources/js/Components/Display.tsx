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
      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">Glide Signature Quilted Bag</h1>

      <motion.div 
        initial={false}
        className="grid lg:grid-cols-12 gap-8 lg:gap-12"
      >
        <div className="lg:col-span-7 relative space-y-4">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${currentVariant}-${currentImage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="aspect-square overflow-hidden rounded-lg bg-background"
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
                  currentImage === index ? "border-primary" : ""
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

        <div className="lg:col-span-5 flex items-center">
          <div className="border rounded-lg p-8 space-y-8 bg-white shadow-sm w-full">
            {/* Prezzo */}
            <div className="border-b pb-6">
              <span className="text-xs text-muted-foreground">Price:</span>
              <p className="text-4xl font-bold">
                <span className="text-lg align-top">$</span>
                299<span className="text-lg">.99</span>
              </p>
            </div>

            {/* Stato prodotto */}
            <div className="flex items-center text-sm text-[hsl(142,76%,36%)]">
              <span className="mr-2">●</span>
              In Stock
            </div>

            {/* Colori */}
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-foreground">Color</h2>
              <RadioGroup
                value={currentVariant.toString()}
                onValueChange={(value) => setCurrentVariant(parseInt(value))}
                className="flex gap-4"
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
                        "h-10 w-10 rounded-full shadow-sm transition-all",
                        {
                          'bg-[hsl(222.2,84%,4.9%)]': variant.color === 'Black',
                          'bg-[hsl(199,95%,74%)]': variant.color === 'Blue',
                          'bg-[hsl(210,40%,96.1%)]': variant.color === 'Gray',
                          'bg-[hsl(325,90%,70%)]': variant.color === 'Pink',
                        }
                      )}
                    />
                    <span className="sr-only">{variant.color}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Bottone */}
            <Button 
              className="w-full bg-[hsl(222.2,84%,4.9%)] hover:bg-[hsl(222.2,84%,4.9%)/90] text-white py-7 text-lg rounded-xl transition-all duration-200 shadow-sm" 
              size="lg"
              variant="default"
            >
              <ShoppingBag className="mr-3 h-6 w-6" />
              Add to Cart
            </Button>

            {/* Info aggiuntive */}
            <div className="border-t pt-6 space-y-4 text-sm">
              <div className="flex gap-2">
                <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">Free delivery on orders over $50</p>
              </div>
              <p className="text-muted-foreground">
                Our signature quilted bag combines style and functionality. Perfect for everyday use or special occasions.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


