import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { platformConfig } from "@/lib/helpers";
import type { Platform, Post } from "@/types";

/* ===== Create Post Dialog Props ===== */
interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    post: Omit<Post, "id" | "createdAt" | "likes" | "comments" | "shares">
  ) => void;
  editingPost?: Post | null;
}

/* ===== Create Post Dialog Component ===== */
export default function CreatePostDialog({
  open,
  onOpenChange,
  onSubmit,
  editingPost,
}: CreatePostDialogProps) {
  const [platform, setPlatform] = useState<Platform>(
    editingPost?.platform || "instagram"
  );
  const [content, setContent] = useState(editingPost?.content || "");
  const [author, setAuthor] = useState(editingPost?.author || "");
  const [status, setStatus] = useState<"published" | "scheduled" | "draft">(
    editingPost?.status || "draft"
  );
  const [image, setImage] = useState(editingPost?.image || "");

  const isEditing = !!editingPost;

  /* Sync form fields when editingPost changes */
  useEffect(() => {
    if (editingPost) {
      setPlatform(editingPost.platform);
      setContent(editingPost.content);
      setAuthor(editingPost.author);
      setStatus(editingPost.status);
      setImage(editingPost.image || "");
    } else {
      setPlatform("instagram");
      setContent("");
      setAuthor("");
      setStatus("draft");
      setImage("");
    }
  }, [editingPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !author.trim()) return;

    onSubmit({
      platform,
      content: content.trim(),
      author: author.trim(),
      authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.trim().replace(/\s/g, "")}`,
      status,
      image: image.trim() || undefined,
    });

    // Reset form
    setPlatform("instagram");
    setContent("");
    setAuthor("");
    setStatus("draft");
    setImage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Post" : "Create New Post"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your post details below."
              : "Fill in the details to create a new social media post."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Platform */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Platform</label>
            <Select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
            >
              {Object.entries(platformConfig).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Author</label>
            <Input
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              placeholder="Write your post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Image URL <span className="text-muted-foreground">(optional)</span>
            </label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "published" | "scheduled" | "draft")
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </Select>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Create Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
