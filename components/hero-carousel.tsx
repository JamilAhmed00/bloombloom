"use client"

import { useCallback, useEffect, useState, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MediaSlide {
  type: "image" | "video"
  url: string
  alt: string
  caption: string
}

const slides: MediaSlide[] = [
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    alt: "Serene natural landscape with blooming wildflowers",
    caption: "Nature's beauty captured through satellite imagery",
  },
  {
    type: "video",
    url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    alt: "Time-lapse of blooming flowers",
    caption: "Watch nature's rhythms unfold in real-time",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1600&q=80",
    alt: "Vibrant field of colorful flowers in full bloom",
    caption: "Global bloom patterns tracked by NASA satellites",
  },
  {
    type: "video",
    url: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    alt: "Seasonal bloom progression",
    caption: "Seasonal changes monitored through Earth observation",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
    alt: "Lush green landscape with diverse plant life",
    caption: "Biodiversity insights from space-based monitoring",
  },
]

export function HeroCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const autoplayRef = useRef(Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }))

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayRef.current])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()
    setSelectedIndex(newIndex)

    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === newIndex && slides[index].type === "video") {
          video.play().catch(() => {
            // Ignore autoplay errors
          })
        } else {
          video.pause()
        }
      }
    })
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scrollPrev()
      } else if (e.key === "ArrowRight") {
        scrollNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [scrollPrev, scrollNext])

  return (
    <div className="relative w-full max-w-4xl mx-auto group">
      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl group-hover:blur-[4rem] transition-all duration-500 animate-pulse-glow" />

      <div className="relative overflow-hidden rounded-2xl shadow-2xl" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative aspect-video">
              {slide.type === "image" ? (
                <img
                  src={slide.url || "/placeholder.svg"}
                  alt={slide.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el
                  }}
                  src={slide.url}
                  muted
                  playsInline
                  loop
                  className="w-full h-full object-cover"
                  aria-label={slide.alt}
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-sm md:text-base font-medium">{slide.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-visible:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-visible:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
              index === selectedIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}
