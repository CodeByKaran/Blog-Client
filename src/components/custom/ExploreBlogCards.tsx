import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";

interface ExploreBlogCardsProps {
  blog: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      avatar: string;
    };
    tags: string;
    publishedAt: string;
  };
}

const ExploreBlogCards = ({ blog }: ExploreBlogCardsProps) => {
  return (
    <Card className="overflow-hidden rounded-xl border bg-transparent transition-colors hover:border-gray-700">
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-gray-800 px-2 py-1 text-xs font-medium">
            {blog.tags}
          </span>
          <span className="text-xs text-gray-500">{blog.publishedAt}</span>
        </div>
        <h3 className="font-semibold">{blog.title}</h3>
        <p className="text-sm text-gray-400">{blog.content}</p>
        <div className="flex items-center space-x-2 pt-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full">
            <Image
              src={blog.author.avatar || "/placeholder.svg"}
              alt={blog.author.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs text-gray-500">{blog.author.name}</span>
        </div>
      </div>
    </Card>
  );
};

export default ExploreBlogCards;
