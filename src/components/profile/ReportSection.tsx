import { AlertTriangle, Flag, Shield, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReportSection() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl font-semibold text-white">Report Center</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-amber-900/20 bg-amber-900/10 p-4">
          <div className="mb-3 flex items-center space-x-3">
            <div className="rounded-full bg-amber-900/20 p-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </div>
            <h3 className="font-medium text-amber-400">Report Content</h3>
          </div>
          <p className="mb-4 text-sm text-gray-400">
            See something that violates our community guidelines? Report it for
            review.
          </p>
          <Button
            variant="outline"
            className="w-full border-amber-900/20 bg-amber-900/10 text-amber-400 hover:bg-amber-900/20"
          >
            <Flag className="mr-2 h-4 w-4" /> Report Content
          </Button>
        </div>

        <div className="rounded-lg border border-red-900/20 bg-red-900/10 p-4">
          <div className="mb-3 flex items-center space-x-3">
            <div className="rounded-full bg-red-900/20 p-2">
              <ThumbsDown className="h-4 w-4 text-red-400" />
            </div>
            <h3 className="font-medium text-red-400">Block User</h3>
          </div>
          <p className="mb-4 text-sm text-gray-400">
            Don't want to interact with someone? Block them from your feed.
          </p>
          <Button
            variant="outline"
            className="w-full border-red-900/20 bg-red-900/10 text-red-400 hover:bg-red-900/20"
          >
            <Shield className="mr-2 h-4 w-4" /> Manage Blocks
          </Button>
        </div>
      </div>
    </div>
  );
}
