import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Post, PostFilter, PostStatus, SortOrder } from "@/types";
import { postsApi } from "@/services/api";

/* ===== State Interface ===== */
interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
  filter: PostFilter;
  statusFilter: PostStatus;
  sortOrder: SortOrder;
  searchQuery: string;
}

/* ===== Initial State ===== */
const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
  filter: "all",
  statusFilter: "all",
  sortOrder: "newest",
  searchQuery: "",
};

/* ===== Async Thunks ===== */
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await postsApi.getPosts();
  return response.data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (
    post: Omit<Post, "id" | "createdAt" | "likes" | "comments" | "shares">
  ) => {
    const response = await postsApi.createPost(post);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, updates }: { id: string; updates: Partial<Post> }) => {
    const response = await postsApi.updatePost(id, updates);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    await postsApi.deletePost(id);
    return id;
  }
);

/* ===== Slice ===== */
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setFilter(state, action: { payload: PostFilter }) {
      state.filter = action.payload;
    },
    setStatusFilter(state, action: { payload: PostStatus }) {
      state.statusFilter = action.payload;
    },
    setSortOrder(state, action: { payload: SortOrder }) {
      state.sortOrder = action.payload;
    },
    setSearchQuery(state, action: { payload: string }) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Fetch */
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      /* Create */
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      /* Update */
      .addCase(updatePost.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.items.findIndex(
            (p) => p.id === action.payload!.id
          );
          if (index !== -1) state.items[index] = action.payload;
        }
      })
      /* Delete */
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setFilter, setStatusFilter, setSortOrder, setSearchQuery } =
  postsSlice.actions;
export default postsSlice.reducer;
