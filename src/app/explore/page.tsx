import ExploreBlogCards from "@/components/custom/ExploreBlogCards";
import { exploreBlogs } from "@/lib/data";
import React from "react";

const Explore = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 pb-16 md:grid-cols-2">
      {exploreBlogs.map((blog) => (
        <ExploreBlogCards key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Explore;
