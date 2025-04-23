"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, X, Save } from "lucide-react";

interface AboutSectionProps {
  bio: string;
  onUpdate?: (newBio: string) => void;
}

export function AboutSection({ bio, onUpdate }: AboutSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentBio, setCurrentBio] = useState(bio);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(currentBio);
    }
    setIsOpen(false);
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-transparent p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">About Me</h2>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <p className="whitespace-pre-wrap text-gray-400">{bio}</p>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit About Me</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <Textarea
              value={currentBio}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setCurrentBio(e.target.value)
              }
              placeholder="Write something about yourself..."
              className="min-h-[200px] border-gray-700 bg-gray-800"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-gray-700"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
