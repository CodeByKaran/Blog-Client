"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Comment {
  id: string;
  content: string;
  date: Date;
  blog: {
    id: string;
    title: string;
    image: string;
  };
}

interface CommentsSectionProps {
  comments: Comment[];
}

export function CommentsSection({ comments }: CommentsSectionProps) {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCommentClick = (comment: Comment) => {
    setSelectedComment(comment);
    setIsOpen(true);
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl font-semibold text-white">Top Comments</h2>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-lg bg-gray-800 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="line-clamp-2 text-gray-300">{comment.content}</p>
                <div className="mt-2 flex items-center text-xs text-gray-400">
                  <MessageSquare className="mr-1 h-3 w-3" />
                  <span>On "{comment.blog.title}"</span>
                  <span className="mx-2">•</span>
                  <span>
                    {formatDistanceToNow(comment.date, { addSuffix: true })}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCommentClick(comment)}
                className="ml-2 h-8 w-8 text-gray-400 hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">View blog</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Blog Details</DialogTitle>
          </DialogHeader>
          {selectedComment && (
            <div className="mt-4 grid gap-6">
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={selectedComment.blog.image || "/placeholder.svg"}
                  alt={selectedComment.blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  {selectedComment.blog.title}
                </h3>
                <div className="mt-4 rounded-lg border border-gray-700 bg-gray-800 p-4">
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="mt-0.5 h-5 w-5 text-purple-400" />
                    <div className="flex-1">
                      <p className="text-gray-300">{selectedComment.content}</p>
                      <p className="mt-2 text-xs text-gray-400">
                        {formatDistanceToNow(selectedComment.date, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="outline"
                    className="border-gray-700"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
