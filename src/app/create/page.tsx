"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  ImageIcon,
  LinkIcon,
  Code,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  Save,
  Trash2,
  HelpCircle,
  FileText,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

// Available categories for blog posts
const categories = [
  { value: "technology", label: "Technology" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business" },
  { value: "health", label: "Health & Wellness" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food & Cooking" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "entertainment", label: "Entertainment" },
];

// Popular tags for blog posts
const popularTags = [
  "nextjs",
  "react",
  "webdev",
  "javascript",
  "typescript",
  "design",
  "ui",
  "ux",
  "productivity",
  "career",
  "tutorial",
  "beginners",
  "advanced",
  "tips",
  "tricks",
];

export default function CreatePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    tags: [] as string[],
    coverImage: null as string | null,
    isPublished: true,
    scheduledDate: "",
  });

  // Image preview state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.includes(tag)
        ? formData.tags.filter((t) => t !== tag)
        : [...formData.tags, tag],
    });
  };

  // Handle custom tag addition
  const handleAddCustomTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      const newTag = e.currentTarget.value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      if (!formData.tags.includes(newTag)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, newTag],
        });
      }
      e.currentTarget.value = "";
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setFormData({
            ...formData,
            coverImage: URL.createObjectURL(file),
          });
        }
      }, 300);
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData({
      ...formData,
      coverImage: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle AI content generation
  const handleAIGenerate = () => {
    if (!aiPrompt.trim()) return;

    setAiGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = `# ${aiPrompt}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc, quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.\n\n## Key Points\n\n- Point one about ${aiPrompt}\n- Another important consideration\n- Final thoughts on the topic\n\nIn conclusion, ${aiPrompt} is a fascinating subject that deserves more attention.`;

      setFormData({
        ...formData,
        content: formData.content
          ? `${formData.content}\n\n${generatedContent}`
          : generatedContent,
      });

      setAiGenerating(false);
      setShowAIDialog(false);
      setAiPrompt("");
    }, 2000);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/profile");
    }, 2000);
  };

  // Format the content for preview
  const formatContentForPreview = () => {
    if (!formData.content) return "<p>No content to preview</p>";

    // Very basic markdown-like formatting
    return formData.content
      .replace(/# (.*?)$/gm, "<h1>$1</h1>")
      .replace(/## (.*?)$/gm, "<h2>$1</h2>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br />");
  };

  // Insert formatting into content
  const insertFormatting = (format: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let formattedText = "";

    switch (format) {
      case "bold":
        formattedText = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        formattedText = `*${selectedText || "italic text"}*`;
        break;
      case "h1":
        formattedText = `# ${selectedText || "Heading 1"}`;
        break;
      case "h2":
        formattedText = `## ${selectedText || "Heading 2"}`;
        break;
      case "quote":
        formattedText = `> ${selectedText || "Quote"}`;
        break;
      case "code":
        formattedText = `\`${selectedText || "code"}\``;
        break;
      case "link":
        formattedText = `[${selectedText || "link text"}](url)`;
        break;
      case "list":
        formattedText = `\n- ${selectedText || "List item"}`;
        break;
      case "ordered-list":
        formattedText = `\n1. ${selectedText || "List item"}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent =
      textarea.value.substring(0, start) +
      formattedText +
      textarea.value.substring(end);
    setFormData({
      ...formData,
      content: newContent,
    });

    // Set focus back to textarea and position cursor after inserted text
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + formattedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header with title and actions */}
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <div className="m-1 flex w-full items-center justify-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAIDialog(true)}
                    className="border-purple-800/50 bg-purple-900/20"
                  >
                    <Sparkles className="mr-2 h-4 w-4 text-purple-400" />
                    AI Assist
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate content with AI</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-red-800/50 bg-red-900/10"
                >
                  <Trash2 className="mr-2 h-4 w-4 text-red-400" />
                  Discard
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. All your progress will be
                    lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                    Discard Draft
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Publish
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 gap-8 font-poppins">
          {/* Left column - Main content editor */}
          <div className="w-full space-y-6">
            {/* Title input */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="flex items-center text-base font-medium"
              >
                Title <span className="ml-1 text-red-500">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="ml-2 h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>A catchy title helps your post get noticed</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter an attention-grabbing title"
                className="border-gray-700 bg-gray-900/50 py-6 text-lg focus:border-purple-500"
                required
              />
            </div>

            {/* Description input */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="flex items-center text-base font-medium"
              >
                Description <span className="ml-1 text-red-500">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="ml-2 h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>A brief summary that appears in search results</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write a compelling description (150-200 characters)"
                className="h-20 resize-none border-gray-700 bg-gray-900/50 focus:border-purple-500"
                required
              />
              <div className="flex justify-end text-xs text-gray-400">
                {formData.description.length}/200 characters
              </div>
            </div>

            {/* Content editor with tabs */}
            <div className="space-y-2">
              <Label
                htmlFor="content"
                className="flex items-center text-base font-medium"
              >
                Content <span className="ml-1 text-red-500">*</span>
              </Label>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="mb-2 grid w-full grid-cols-2">
                  <TabsTrigger
                    value="write"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Write
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="write" className="space-y-4">
                  {/* Formatting toolbar */}
                  <div className="flex flex-wrap items-center gap-1 rounded-md border border-gray-700 bg-gray-800 p-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => insertFormatting("bold")}
                            className="h-8 w-8 p-0"
                          >
                            <Bold className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Bold</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => insertFormatting("italic")}
                            className="h-8 w-8 p-0"
                          >
                            <Italic className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Italic</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => insertFormatting("h1")}
                            className="h-8 w-8 p-0"
                          >
                            <Heading1 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Heading 1</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => insertFormatting("h2")}
                            className="h-8 w-8 p-0"
                          >
                            <Heading2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Heading 2</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <div className="mx-1 h-6 w-px bg-gray-700"></div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => insertFormatting("list")}
                            className="h-8 w-8 p-0"
                          >
                            <List className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Bullet List</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => insertFormatting("ordered-list")}
                            className="h-8 w-8 p-0"
                          >
                            <ListOrdered className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Numbered List</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => insertFormatting("quote")}
                            className="h-8 w-8 p-0"
                          >
                            <Quote className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Quote</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <div className="mx-1 h-6 w-px bg-gray-700"></div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => insertFormatting("code")}
                            className="h-8 w-8 p-0"
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Code</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => insertFormatting("link")}
                            className="h-8 w-8 p-0"
                          >
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Link</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <div className="ml-auto flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertFormatting("align-left")}
                        className="h-8 w-8 p-0"
                      >
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertFormatting("align-center")}
                        className="h-8 w-8 p-0"
                      >
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertFormatting("align-right")}
                        className="h-8 w-8 p-0"
                      >
                        <AlignRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content textarea */}
                  <Textarea
                    id="content"
                    name="content"
                    spellCheck={false}
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Start writing your amazing blog post here..."
                    className="min-h-[400px] resize-none border-gray-700 bg-black font-mono text-sm focus:border-purple-500"
                    required
                  />

                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Supports Markdown formatting</span>
                    <span>{formData.content.length} characters</span>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="min-h-[400px]">
                  <div className="prose prose-invert min-h-[400px] max-w-none rounded-md border border-gray-700 bg-gray-900/50 p-6">
                    {formData.title && (
                      <h1 className="mb-4 text-2xl font-bold">
                        {formData.title}
                      </h1>
                    )}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatContentForPreview(),
                      }}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right column - Settings and metadata */}
          <div className="space-y-6">
            {/* Cover image upload */}
            <Card className="border-gray-800 bg-transparent">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Cover Image</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Add a high-quality image to make your post stand out
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {imagePreview ? (
                  <div className="relative overflow-hidden rounded-md">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Cover preview"
                      width={400}
                      height={225}
                      className="h-[200px] w-full object-cover"
                    />
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="h-2.5 w-3/4 rounded-full bg-gray-700">
                          <div
                            className="h-2.5 rounded-full bg-purple-600"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={handleRemoveImage}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer rounded-md border-2 border-dashed border-gray-700 p-8 text-center transition-colors hover:border-gray-600"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="mx-auto mb-4 h-10 w-10 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-400">
                      Drag and drop an image, or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      Recommended: 1200 x 675px (16:9)
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </CardContent>
            </Card>

            {/* Category selection */}
            <Card className="border-gray-800 bg-transparent">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Category</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select a category that best fits your content</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="border-gray-700 bg-gray-800">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="border-b-0 bg-transparent font-poppins">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Tags</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Add up to 5 tags to help readers discover your post
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer bg-purple-900/30 text-purple-200 hover:bg-purple-900/50"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                  {formData.tags.length < 10 && (
                    <Input
                      placeholder="Add a tag... (press Enter)"
                      className="h-6 w-32 border-gray-700 bg-gray-800 text-xs"
                      onKeyDown={handleAddCustomTag}
                      disabled={formData.tags.length >= 5}
                    />
                  )}
                </div>

                <div>
                  <p className="mb-2 text-xs text-gray-400">Popular tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={`cursor-pointer border-gray-700 ${
                          formData.tags.includes(tag)
                            ? "bg-purple-900/30 text-purple-200"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                        onClick={() =>
                          formData.tags.length < 10
                            ? handleTagToggle(tag)
                            : toast.custom((t) => (
                                <div className="relative w-[350px] rounded-md border border-r-gray-900 bg-black p-4 font-poppins">
                                  <h1 className="text-xs text-gray-200/50">
                                    Maximum tags reached
                                  </h1>
                                  <p className="text-sm text-red-400">
                                    You can only add up to 10 tags.
                                  </p>
                                  <X
                                    height={4}
                                    width={4}
                                    className="absolute top-2 right-2 h-4 w-4 text-gray-200/40"
                                    onClick={() => toast.dismiss(t)}
                                  />
                                </div>
                              ))
                        }
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Publishing options */}
          </div>
        </div>
      </form>

      {/* AI Content Generation Dialog */}
      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Content with AI</DialogTitle>
            <DialogDescription>
              Describe what you want to write about and our AI will help you
              create content.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="ai-prompt">
                What would you like to write about?
              </Label>
              <Textarea
                id="ai-prompt"
                placeholder="E.g., Write an introduction about the benefits of meditation for productivity"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="min-h-[100px] border-gray-700 bg-gray-800"
              />
            </div>

            <div className="rounded-md border border-gray-700 bg-gray-800 p-3">
              <p className="flex items-start text-sm text-gray-300">
                <InfoIcon className="mt-0.5 mr-2 h-4 w-4 text-blue-400" />
                AI-generated content is a starting point. Always review and edit
                to ensure accuracy and add your personal touch.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAIDialog(false)}
              disabled={aiGenerating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAIGenerate}
              disabled={!aiPrompt.trim() || aiGenerating}
            >
              {aiGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
