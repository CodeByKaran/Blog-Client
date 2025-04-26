import React, { useEffect, useState } from "react";
import { Carousel, CarouselApi, CarouselContent } from "../ui/carousel";

const ImageSlider = ({ children }: { children: React.ReactNode }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState<number>();

  useEffect(() => {
    if (!api) return;

    const updateCount = () => {
      const newCount = api.scrollSnapList().length;
      setCount(newCount);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    // Initialize immediately
    updateCount();

    // Update on select events
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Update when children change
    api.on("slidesChanged", updateCount);

    return () => {
      api.off("select", () => {});
      api.off("slidesChanged", updateCount);
    };
  }, [api]);
  return (
    <div className="relative mt-6 overflow-hidden rounded-lg border border-gray-800">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>{children}</CarouselContent>
        <div className="absolute top-2 -right-5 z-10 -translate-x-1/2 rounded-full border border-gray-700/50 bg-black/40 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
          {current} / {count}
        </div>
      </Carousel>
    </div>
  );
};

export default ImageSlider;
