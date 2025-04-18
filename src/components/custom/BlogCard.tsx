"use client";

import { format } from "date-fns";
import { HelpCircle, MessageCircle, Save, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";

interface BlogCardProps {
  user: {
    image?: string;
    username: string;
  };
  blog: {
    title: string;
    content: string;
    images?: string[];
    tags: string[];
    createdAt: Date;
    metrics: {
      helps: number;
      messages: number;
      saves: number;
    };
  };
}

const BlogCard = ({ user, blog }: BlogCardProps) => {
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
    <Card className="max-w-2xl overflow-hidden rounded-xl border-gray-800 bg-slate-950 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20">
      {/* User Section */}
      <div className="flex items-center gap-4 px-6 pt-5">
        <div className="h-12 w-12 overflow-hidden rounded-full border border-purple-900/30 shadow-md shadow-purple-900/20">
          {user.image ? (
            <img
              src={user.image || "/placeholder.svg"}
              alt={user.username}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-900 to-purple-950">
              <User className="h-6 w-6 text-purple-300" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-100">{user.username}</h3>
          <p className="text-sm text-gray-400">
            {format(blog.createdAt, "MMM d, yyyy")}
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="space-y-3 p-6">
        <h2 className="bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-2xl font-bold text-transparent">
          {blog.title}
        </h2>
        <p className="text-gray-300">{blog.content}</p>

        {blog.images && blog.images.length > 0 && (
          <div className="relative mt-6 overflow-hidden rounded-lg border border-gray-800">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {blog.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${blog.title} - Image ${index + 1}`}
                        className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-gray-700/50 bg-black/70 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                {current} / {count}
              </div>
              <CarouselPrevious className="absolute left-2 border border-gray-700/50 bg-black/70 text-gray-200 backdrop-blur-sm hover:bg-black/90" />
              <CarouselNext className="absolute right-2 border border-gray-700/50 bg-black/70 text-gray-200 backdrop-blur-sm hover:bg-black/90" />
            </Carousel>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-purple-800/30 bg-purple-950/70 px-3 py-1 text-sm font-medium text-purple-300 transition-all duration-300 hover:bg-purple-900/70 hover:text-purple-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="flex items-center justify-between px-6 py-4">
        <button className="group flex items-center gap-2 text-gray-400 transition-all duration-300 hover:text-purple-400">
          <HelpCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="text-sm font-medium">{blog.metrics.helps}</span>
        </button>
        <button className="group flex items-center gap-2 text-gray-400 transition-all duration-300 hover:text-purple-400">
          <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="text-sm font-medium">{blog.metrics.messages}</span>
        </button>
        <button className="group flex items-center gap-2 text-gray-400 transition-all duration-300 hover:text-purple-400">
          <Save className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="text-sm font-medium">{blog.metrics.saves}</span>
        </button>
      </div>
    </Card>
  );
};

export default BlogCard;
