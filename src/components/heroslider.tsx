"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "SUPER DELICIOUS BURGERS",
    subtitle: "Experience the taste of premium handcrafted burgers.",
    image: "https://images.pexels.com/photos/1352274/pexels-photo-1352274.jpeg",
  },
  {
    id: 2,
    title: "FRESH HOT PIZZA",
    subtitle: "Loaded with cheese & baked to perfection.",
    image: "/images/food1.jpg",
  },
  {
    id: 3,
    title: "CRISPY FRIED BERGER",
    subtitle: "Golden crispy bites with signature spices.",
    image: "/images/food2.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
        relative w-full h-[100vh] min-h-[450px] max-h-[620px] overflow-hidden"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1480px"
            className="object-cover object-center"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative z-30 h-full flex items-center px-4 md:px-10">
            <div className="w-full max-w-[1480px] mx-auto">
              <div className="max-w-[95vw] sm:max-w-xl md:max-w-2xl text-white space-y-4 sm:space-y-6 lg:space-y-8 py-8">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-md">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-medium drop-shadow">
                  {slide.subtitle}
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <button
                    onClick={() => router.push("/cart")}
                    className="
                        px-6
                        py-2.5
                        sm:py-3
                        text-base sm:text-lg
                        bg-gradient-to-r 
                        from-orange-500 to-red-500 
                        rounded-full 
                        text-white 
                        font-semibold 
                        shadow-xl 
                        hover:scale-105
                        transition 
                        min-w-[130px] sm:min-w-[160px]
                    "
                  >
                    Order Now
                  </button>

                  <button
                    onClick={() => router.push("/meals")}
                    className="
                        px-6
                        py-2.5
                        sm:py-3
                        text-base sm:text-lg
                        border border-white 
                        rounded-full 
                        backdrop-blur-md 
                        hover:bg-white 
                        hover:text-black 
                        transition
                        min-w-[130px] sm:min-w-[160px]
                    "
                  >
                    View Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 sm:gap-3 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition ${
              current === index ? "bg-white scale-110 sm:scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}