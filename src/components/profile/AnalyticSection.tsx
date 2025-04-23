import { Activity, BookOpen, MessageSquare, TrendingUp } from "lucide-react";

interface AnalyticsData {
  totalBlogs: number;
  totalViews: number;
  totalComments: number;
  totalLikes: number;
}

interface AnalyticsSectionProps {
  data: AnalyticsData;
}

export function AnalyticsSection({ data }: AnalyticsSectionProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-transparent p-6">
      <h2 className="mb-4 text-xl font-semibold text-white">Analytics</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
          <div className="mb-2 rounded-full bg-purple-900/20 p-3">
            <BookOpen className="h-5 w-5 text-purple-400" />
          </div>
          <span className="text-2xl font-bold text-white">
            {data.totalBlogs}
          </span>
          <span className="text-xs text-gray-400">Blogs Posted</span>
        </div>

        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
          <div className="mb-2 rounded-full bg-blue-900/20 p-3">
            <Activity className="h-5 w-5 text-blue-400" />
          </div>
          <span className="text-2xl font-bold text-white">
            {data.totalViews}
          </span>
          <span className="text-xs text-gray-400">Total Views</span>
        </div>

        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
          <div className="mb-2 rounded-full bg-pink-900/20 p-3">
            <MessageSquare className="h-5 w-5 text-pink-400" />
          </div>
          <span className="text-2xl font-bold text-white">
            {data.totalComments}
          </span>
          <span className="text-xs text-gray-400">Comments</span>
        </div>

        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
          <div className="mb-2 rounded-full bg-green-900/20 p-3">
            <TrendingUp className="h-5 w-5 text-green-400" />
          </div>
          <span className="text-2xl font-bold text-white">
            {data.totalLikes}
          </span>
          <span className="text-xs text-gray-400">Total Likes</span>
        </div>
      </div>
    </div>
  );
}
