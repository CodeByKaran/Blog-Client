"use client";
import { AboutSection } from "@/components/profile/AboutSection";
import { AnalyticsSection } from "@/components/profile/AnalyticSection";
import { CommentsSection } from "@/components/profile/CommentsSection";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ReportSection } from "@/components/profile/ReportSection";
import React, { useState } from "react";

const Profile = () => {
  // Mock data
  const [userData, setUserData] = useState({
    id: "1",
    name: "Karan kumar",
    username: "karan",
    email: "karan@example.com",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdom Lorem ipsum dolor sit amet. vol lorem ipsum dolor sit amet consectetur adipisicing elit.",
  });

  const analyticsData = {
    totalBlogs: 24,
    totalViews: 12568,
    totalComments: 342,
    totalLikes: 1287,
  };

  const comments = [
    {
      id: "1",
      content:
        "This is such a thoughtful analysis of the current trends in web development. I especially liked the section about React Server Components.",
      date: new Date(2025, 3, 21),
      blog: {
        id: "101",
        title: "The Future of Web Development in 2025",
        image: "/placeholder.svg?height=300&width=600",
      },
    },
    {
      id: "2",
      content:
        "Your recipes never disappoint! I tried this last weekend and it was a big hit with my family.",
      date: new Date(2025, 3, 18),
      blog: {
        id: "102",
        title: "5 Easy Pasta Recipes for Busy Weeknights",
        image: "/placeholder.svg?height=300&width=600",
      },
    },
    {
      id: "3",
      content:
        "The photography tips in this article were exactly what I needed. My landscape shots have improved dramatically!",
      date: new Date(2025, 3, 15),
      blog: {
        id: "103",
        title: "Photography Basics: Mastering Landscape Shots",
        image: "/placeholder.svg?height=300&width=600",
      },
    },
  ];

  const updateBio = (newBio: string) => {
    setUserData((prev) => ({ ...prev, bio: newBio }));
  };
  return (
    <div className="space-y-6 p-4">
      <ProfileCard user={userData} />

      <AboutSection bio={userData.bio} onUpdate={updateBio} />

      <AnalyticsSection data={analyticsData} />

      <CommentsSection comments={comments} />

      <ReportSection />
    </div>
  );
};

export default Profile;
