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

export { sampleBlog };
