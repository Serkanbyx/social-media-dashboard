import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Edit,
  Trash2,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  formatNumber,
  formatRelativeTime,
  formatDate,
  platformConfig,
} from "@/lib/helpers";
import { cn } from "@/lib/utils";
import type { Post } from "@/types";
import { useState } from "react";

/* ===== Post Card Props ===== */
interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

/* ===== Status Badge Variant ===== */
const statusVariant = {
  published: "success" as const,
  scheduled: "warning" as const,
  draft: "secondary" as const,
};

/* ===== Post Card Component ===== */
export default function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  const config = platformConfig[post.platform];
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.authorAvatar} alt={post.author} />
              <AvatarFallback>
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{post.author}</span>
                <Badge variant="outline" className="text-xs">
                  <span className={config.color}>{config.label}</span>
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatRelativeTime(post.createdAt)}</span>
                <Badge variant={statusVariant[post.status]} className="text-xs">
                  {post.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Post actions"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 z-50 mt-1 w-36 rounded-md border bg-popover p-1 shadow-lg">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onEdit(post);
                    }}
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(post.id);
                    }}
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-accent cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <p className="mt-3 text-sm leading-relaxed">{post.content}</p>

        {/* Image */}
        {post.image && (
          <div className="mt-3 overflow-hidden rounded-lg">
            <img
              src={post.image}
              alt="Post media"
              className="h-48 w-full object-cover transition-transform hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* Scheduled Info */}
        {post.status === "scheduled" && post.scheduledAt && (
          <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-amber-50 p-2 text-xs text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            <Clock className="h-3.5 w-3.5" />
            Scheduled for {formatDate(post.scheduledAt)}
          </div>
        )}

        {/* Engagement Stats */}
        <div
          className={cn(
            "mt-4 flex items-center gap-6 border-t pt-3",
            "text-muted-foreground"
          )}
        >
          <span className="flex items-center gap-1.5 text-sm">
            <Heart className="h-4 w-4" />
            {formatNumber(post.likes)}
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <MessageCircle className="h-4 w-4" />
            {formatNumber(post.comments)}
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <Share2 className="h-4 w-4" />
            {formatNumber(post.shares)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
