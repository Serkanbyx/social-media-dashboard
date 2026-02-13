import { Link } from "react-router-dom";
import { ArrowRight, Heart, MessageCircle, Share2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatNumber, formatRelativeTime, platformConfig } from "@/lib/helpers";
import type { Post } from "@/types";

/* ===== Recent Posts Props ===== */
interface RecentPostsProps {
  posts: Post[];
}

/* ===== Recent Posts Component ===== */
export default function RecentPosts({ posts }: RecentPostsProps) {
  const recentPosts = posts.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>Latest activity across platforms</CardDescription>
        </div>
        <Link to="/posts">
          <Button variant="ghost" size="sm" className="gap-1">
            View all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPosts.map((post) => {
            const config = platformConfig[post.platform];
            return (
              <div
                key={post.id}
                className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
              >
                {/* Author Avatar */}
                <Avatar className="h-9 w-9">
                  <AvatarImage src={post.authorAvatar} alt={post.author} />
                  <AvatarFallback>
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{post.author}</span>
                    <Badge variant="outline" className="text-xs">
                      <span className={config.color}>{config.label}</span>
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(post.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {post.content}
                  </p>

                  {/* Engagement Stats */}
                  <div className="mt-2 flex items-center gap-4">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart className="h-3.5 w-3.5" />
                      {formatNumber(post.likes)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {formatNumber(post.comments)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Share2 className="h-3.5 w-3.5" />
                      {formatNumber(post.shares)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
