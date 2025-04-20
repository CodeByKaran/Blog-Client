"use client";

import { format } from "date-fns";
import { HelpCircle, MessageCircle, Save, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import ImageSlider from "./ImageSlider";
import { CarouselItem } from "../ui/carousel";

interface BlogCardProps {
  user: {
    image?: string;
    username: string;
  };
  blog: {
    title: string;
    content: string;
    images: string[];
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
  return (
    <Card className="w-full overflow-hidden bg-transparent">
      {/* User Section */}
      <div className="flex items-center gap-4 px-6 pt-5">
        <div className="h-12 w-12 overflow-hidden rounded-full border border-purple-900/30 shadow-md shadow-purple-900/20">
          {user.image ? (
            <Image
              width={200}
              height={300}
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
          <ImageSlider>
            <>
              {blog.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="overflow-hidden">
                    <Image
                      width={516}
                      height={516}
                      src={image || "/placeholder.svg"}
                      alt={`${blog.title} - Image ${index + 1}`}
                      className="h-[416px] w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </CarouselItem>
              ))}
            </>
          </ImageSlider>
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
