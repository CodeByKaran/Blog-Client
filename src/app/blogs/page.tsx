import BlogCard from "@/components/custom/BlogCard";
import { sampleBlog } from "@/lib/data";
import React from "react";

const Blogs = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex w-full flex-col items-center pb-24">
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

export default Blogs;
