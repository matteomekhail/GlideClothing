import { ArrowRight } from 'lucide-react'
import { Button } from "@/Components/ui/button"

export default function AboutSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div className="relative pb-[120px] lg:pb-[150px]">
            <img
              alt="Glide signature quilted bag in light gray"
              className="rounded-lg object-cover object-center w-full h-[300px] lg:h-[400px]"
              src="/img/Lifestyle/Lifestyle-White-4.jpg"
            />
            <img
              alt="Person carrying a Glide bag"
              className="rounded-lg object-cover object-center w-2/3 h-[200px] lg:h-[300px] absolute right-0 bottom-0 border-4 border-white"
              src="/img/Lifestyle/Lifestyle-Blue-1.jpg"
            />
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
            <h3 className="text-xl font-bold">Sustainable Luxury</h3>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We're dedicated to responsible fashion, ensuring our manufacturing processes respect both our environment and
              our artisans. Every Glide bag is a testament to our commitment to sustainable luxury.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

