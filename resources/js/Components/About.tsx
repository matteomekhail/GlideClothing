import { ArrowRight } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/Components/ui/carousel"
import { useEffect, useState } from "react"

function getLifestyleImages() {
  const images = [
    'Lifestyle-Black-1.jpg',
    'Lifestyle-Black-2.jpg',
    'Lifestyle-Black-3.jpg',
    'Lifestyle-Black-4.jpg',
    'Lifestyle-Black-5.jpg',
    'Lifestyle-Blue-1.jpg',
    'Lifestyle-Blue-2.jpg',
    'Lifestyle-Blue-3.jpg',
    'Lifestyle-Pink-1.jpg',
    'Lifestyle-Pink-2.jpg',
    'Lifestyle-Pink-3.jpg',
    'Lifestyle-White-1.jpg',
    'Lifestyle-White-2.jpg',
    'Lifestyle-White-3.jpg',
    'Lifestyle-White-4.jpg'
  ]
  return images.map(image => `/img/Lifestyle/${image}`)
}

export default function AboutSection() {
  const [api, setApi] = useState<CarouselApi>()
  const images = getLifestyleImages()

  useEffect(() => {
    if (!api) {
      return
    }

    const interval = setInterval(() => {
      api.scrollNext()
    }, 3000) // Cambia immagine ogni 3 secondi

    return () => clearInterval(interval)
  }, [api])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div className="relative">
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="flex items-center justify-center p-1">
                      <img
                        alt="Glide signature quilted bag in light gray"
                        className="rounded-lg max-h-[600px] w-auto"
                        src={image}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          <div className="flex flex-col justify-center space-y-4 lg:pt-24">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Glide</h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              At Glide, we believe in the perfect fusion of style and functionality. Founded with a passion for creating
              timeless accessories, our journey began with a simple vision: to craft bags that seamlessly integrate into
              modern lifestyles.
            </p>
            <h3 className="text-xl font-bold">Our Signature Style</h3>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Each Glide bag features our distinctive quilted design, crafted from premium materials that combine durability
              with elegance. Our commitment to quality is evident in every stitch, every curve, and every detail.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

