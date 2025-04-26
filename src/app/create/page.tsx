"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  ImageIcon,
  Save,
  Trash2,
  HelpCircle,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import ImageSlider from "@/components/custom/ImageSlider";
import { CarouselItem } from "@/components/ui/carousel";

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
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed 5 images
    if (imagePreviews.length + files.length > 5) {
      alert("Please select up to 5 images total");
      e.target.value = ""; // Clear the selection
      return;
    }

    // Process all selected files
    const newImagePreviews: string[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        newImagePreviews.push(imageUrl);

        // Update state once all images are processed
        if (newImagePreviews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...newImagePreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle image removal
  const handleRemoveImage = (index?: number) => {
    if (typeof index === "number") {
      // Remove specific image
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Remove all images
      setImagePreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
            </div>
          </div>

          {/* Right column - Settings and metadata */}
          <div className="space-y-6">
            {/* Cover image upload */}
            <Card className="border-gray-800 bg-transparent">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Images</h3>
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

                <ImageSlider>
                  <>
                    {imagePreviews.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative overflow-hidden">
                          <Image
                            width={516}
                            height={516}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="h-[416px] w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 left-6 h-8 w-8"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CarouselItem>
                    ))}
                  </>
                </ImageSlider>
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

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  title="Select up to 5 images"
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
                          formData.tags.length < 6
                            ? handleTagToggle(tag)
                            : toast.custom((t) => (
                                <div className="relative w-[350px] rounded-md border border-r-gray-900 bg-black p-4 font-poppins">
                                  <h1 className="text-xs text-gray-200/50">
                                    Maximum tags reached
                                  </h1>
                                  <p className="text-sm text-red-400">
                                    You can only add up to 6 tags.
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
