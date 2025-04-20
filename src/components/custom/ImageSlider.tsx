import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const ImageSlider = ({ children }: { children: React.ReactNode }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="relative mt-6 overflow-hidden rounded-lg border border-gray-800">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>{children}</CarouselContent>
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-gray-700/50 bg-black/70 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
          {current} / {count}
        </div>
        <CarouselPrevious className="absolute left-2 border border-gray-700/50 bg-black/70 text-gray-200 backdrop-blur-sm hover:bg-black/90" />
        <CarouselNext className="absolute right-2 border border-gray-700/50 bg-black/70 text-gray-200 backdrop-blur-sm hover:bg-black/90" />
      </Carousel>
    </div>
  );
};

export default ImageSlider;
