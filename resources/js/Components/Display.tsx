'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Label } from "@/Components/ui/label"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

const productVariants = [
  {
    color: 'Black',
    images: [
      '/img/Prodotti/Black1.jpg',
      '/img/Prodotti/Black2.jpg',
      '/img/Prodotti/Black3.jpg',
      '/img/Prodotti/Black4.jpg',
      '/img/Prodotti/Black5.jpg',
      '/img/Prodotti/Black6.jpg',
      '/img/Prodotti/Black7.jpg',
      '/img/Lifestyle/Lifestyle-Black-1.jpg'
    ]
  },
  {
    color: 'Blue',
    images: [
      '/img/Prodotti/Blue1.jpg',
      '/img/Prodotti/Blue2.jpg',
      '/img/Prodotti/Blue3.jpg',
      '/img/Prodotti/Blue4.jpg',
      '/img/Prodotti/Blue5.jpg',
      '/img/Prodotti/Blue6.jpg',
      '/img/Lifestyle/Lifestyle-Blue-1.jpg',
    ]
  },
  {
    color: 'Gray',
    images: [
      '/img/Prodotti/Gray1.jpg',
      '/img/Prodotti/White2.jpg',
      '/img/Prodotti/White3.jpg',
      '/img/Prodotti/White4.jpg',
      '/img/Prodotti/White5.jpg',
      '/img/Lifestyle/Lifestyle-White-1.jpg',
      '/img/Prodotti/White9.jpg',
    ]
  },
  {
    color: 'Pink',
    images: [
      '/img/Prodotti/Pink1.jpg',
      '/img/Prodotti/Pink2.jpg',
      '/img/Prodotti/Pink3.jpg',
      '/img/Prodotti/Pink4.jpg',
      '/img/Prodotti/Pink5.jpg',
      '/img/Prodotti/Pink6.jpg',
      '/img/Prodotti/Pink7.jpg',
      '/img/Lifestyle/Lifestyle-Pink-1.jpg',
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
  const [isAddingToCart, setIsAddingToCart] = useState(false)

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

const handleAddToCart = async () => {
  try {
    // Verifichiamo prima l'autenticazione
    const authResponse = await axios.get('/api/user').catch(() => null)
    
    // Se non c'è risposta, l'utente non è autenticato
    if (!authResponse) {
      const currentPath = window.location.pathname
      window.location.href = `/login-register?redirect_to=${encodeURIComponent(currentPath)}`
      return
    }

    setIsAddingToCart(true)
    
    const productData = {
      name: 'Glide Signature Quilted Bag',
      color: productVariants[currentVariant].color,
      price: 50.00,
      quantity: 1,
    }

    const cartResponse = await axios.post('/cart', productData)
    
    toast.success("Product added to cart successfully", {
      duration: 3000,
    })

  } catch (error) {
    console.error('Error adding to cart:', error)
    toast.error("Failed to add product to cart. Please try again.", {
      duration: 3000,
    })
  } finally {
    setIsAddingToCart(false)
  }
}

  return (
    <div className="w-full min-h-screen bg-white">
      <Toaster position="top-center" />
      <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Glide Signature Quilted Bag
        </h1>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8">
          <div className="lg:col-span-7 space-y-3">
            <div className="relative aspect-square w-full">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${currentVariant}-${currentImage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full rounded-lg overflow-hidden"
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
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/80 hover:bg-black"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </Button>
              
              <Button
                variant="default"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/80 hover:bg-black"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </Button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {productVariants[currentVariant].images.map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setIsLoading(true)
                    setCurrentImage(index)
                  }}
                  className={cn(
                    "relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden border-2",
                    currentImage === index ? "border-primary" : "border-transparent"
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

          <div className="lg:col-span-5">
            <div className="rounded-lg p-4 space-y-4 bg-white">
              {/* Prezzo */}
              <div className="border-b pb-6">
                <span className="text-xs text-muted-foreground">Price:</span>
                <p className="text-4xl font-bold">
                  <span className="text-lg align-top">$</span>
                  50<span className="text-lg">.00</span>
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
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <ShoppingBag className="mr-3 h-6 w-6" />
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>

              {/* Info aggiuntive */}
              <div className="border-t pt-6 space-y-4 text-sm">
                <p className="text-muted-foreground">
                  Our signature quilted bag combines style and functionality. Perfect for everyday use or special occasions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


