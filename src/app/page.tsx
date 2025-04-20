import BlogCard from "@/components/custom/BlogCard";
import React from "react";
import { sampleBlog } from "@/lib/data";

const Home = () => {
  return (
    <div className="relative overflow-hidden p-4">
      <div className="flex w-full flex-col items-center space-y-4 py-9">
        <BlogCard blog={sampleBlog.blog} user={sampleBlog.user} />
        <BlogCard blog={sampleBlog.blog} user={sampleBlog.user} />
        <BlogCard blog={sampleBlog.blog} user={sampleBlog.user} />
        <BlogCard blog={sampleBlog.blog} user={sampleBlog.user} />
        <BlogCard blog={sampleBlog.blog} user={sampleBlog.user} />
        <BlogCard blog={sampleBlog.blog} user={sampleBlog.user} />
      </div>
    </div>
  );
};

export default Home;
