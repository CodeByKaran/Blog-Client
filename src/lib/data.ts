const sampleBlog = {
  user: {
    username: "Sarah Wilson",
    image:
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=150&h=150",
  },
  blog: {
    title: "The Future of Web Development",
    content:
      "As we venture into 2025, the landscape of web development continues to evolve at an unprecedented pace. From AI-powered development tools to revolutionary frameworks, let's explore what lies ahead...",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["webdev", "technology", "programming", "future"],
    createdAt: new Date(),
    metrics: {
      helps: 42,
      messages: 12,
      saves: 8,
    },
  },
};

const exploreBlogs = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    content:
      "Learn how to build modern web applications with Next.js and React",
    image: "/placeholder.svg?height=300&width=500",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    tags: "Codings",
    publishedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Latest Fashion Trends 2025",
    content:
      "Discover the hottest fashion trends that are dominating the industry this year",
    image: "/placeholder.svg?height=300&width=500",
    author: {
      name: "Taylor Swift",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    tags: "Fashion",
    publishedAt: "1 week ago",
  },
  {
    id: "3",
    title: "Top Movies to Watch",
    content:
      "A curated list of must-watch movies that will keep you entertained",
    image: "/placeholder.svg?height=300&width=500",
    author: {
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    tags: "Trendings",
    publishedAt: "3 days ago",
  },
  {
    id: "4",
    title: "Building a Personal Brand",
    content: "Tips and strategies to build a strong personal brand online",
    image: "/placeholder.svg?height=300&width=500",
    author: {
      name: "Sam Wilson",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    tags: "Trendings",
    publishedAt: "5 days ago",
  },
];

export { sampleBlog, exploreBlogs };
