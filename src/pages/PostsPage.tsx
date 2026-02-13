import { useEffect, useMemo, useState, useCallback } from "react";
import { Plus, FileText, AlertCircle, RefreshCw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  setFilter,
  setStatusFilter,
  setSortOrder,
  setSearchQuery,
} from "@/store/postsSlice";
import PostCard from "@/components/posts/PostCard";
import PostFilters from "@/components/posts/PostFilters";
import CreatePostDialog from "@/components/posts/CreatePostDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Post } from "@/types";

/* ===== Posts Page ===== */
export default function PostsPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error, filter, statusFilter, sortOrder, searchQuery } =
    useAppSelector((state) => state.posts);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  /* Fetch posts on mount */
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  /* Filtered & Sorted Posts */
  const filteredPosts = useMemo(() => {
    let result = [...items];

    // Platform filter
    if (filter !== "all") {
      result = result.filter((post) => post.platform === filter);
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((post) => post.status === statusFilter);
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.content.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortOrder) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "most-liked":
        result.sort((a, b) => b.likes - a.likes);
        break;
      case "most-commented":
        result.sort((a, b) => b.comments - a.comments);
        break;
    }

    return result;
  }, [items, filter, statusFilter, sortOrder, searchQuery]);

  /* Handlers */
  const handleCreatePost = useCallback(
    (
      post: Omit<Post, "id" | "createdAt" | "likes" | "comments" | "shares">
    ) => {
      if (editingPost) {
        dispatch(updatePost({ id: editingPost.id, updates: post }));
      } else {
        dispatch(createPost(post));
      }
      setEditingPost(null);
    },
    [dispatch, editingPost]
  );

  const handleEdit = useCallback((post: Post) => {
    setEditingPost(post);
    setDialogOpen(true);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deletePost(id));
    },
    [dispatch]
  );

  const handleOpenDialog = useCallback(() => {
    setEditingPost(null);
    setDialogOpen(true);
  }, []);

  /* Loading State */
  if (loading && items.length === 0) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[250px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  /* Error State */
  if (error && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-destructive/50 bg-destructive/5 py-16">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="mt-4 text-lg font-medium text-destructive">
          Failed to load posts
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{error}</p>
        <button
          onClick={() => dispatch(fetchPosts())}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Posts</h2>
          <p className="text-sm text-muted-foreground">
            Manage and monitor your social media posts
          </p>
        </div>
        <Button onClick={handleOpenDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Post
        </Button>
      </div>

      {/* Filters */}
      <PostFilters
        searchQuery={searchQuery}
        filter={filter}
        statusFilter={statusFilter}
        sortOrder={sortOrder}
        onSearchChange={(q) => dispatch(setSearchQuery(q))}
        onFilterChange={(f) => dispatch(setFilter(f))}
        onStatusChange={(s) => dispatch(setStatusFilter(s))}
        onSortChange={(o) => dispatch(setSortOrder(o))}
      />

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredPosts.length} of {items.length} posts
      </p>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
          <FileText className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            No posts found
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters or create a new post.
          </p>
          <Button onClick={handleOpenDialog} className="mt-4 gap-2">
            <Plus className="h-4 w-4" />
            Create Post
          </Button>
        </div>
      )}

      {/* Create / Edit Dialog */}
      <CreatePostDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreatePost}
        editingPost={editingPost}
      />
    </div>
  );
}
