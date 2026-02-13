import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  PlatformStats,
  AnalyticsDataPoint,
  DashboardSummary,
} from "@/types";
import { dashboardApi } from "@/services/api";

/* ===== State Interface ===== */
interface DashboardState {
  stats: PlatformStats[];
  summary: DashboardSummary | null;
  analytics: AnalyticsDataPoint[];
  analyticsPeriod: "weekly" | "monthly";
  loading: boolean;
  error: string | null;
}

/* ===== Initial State ===== */
const initialState: DashboardState = {
  stats: [],
  summary: null,
  analytics: [],
  analyticsPeriod: "weekly",
  loading: false,
  error: null,
};

/* ===== Async Thunks ===== */
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async () => {
    const response = await dashboardApi.getStats();
    return response.data;
  }
);

export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchSummary",
  async () => {
    const response = await dashboardApi.getSummary();
    return response.data;
  }
);

export const fetchAnalytics = createAsyncThunk(
  "dashboard/fetchAnalytics",
  async (period: "weekly" | "monthly") => {
    const response = await dashboardApi.getAnalytics(period);
    return { data: response.data, period };
  }
);

/* ===== Slice ===== */
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* Stats */
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch stats";
      })
      /* Summary */
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })
      /* Analytics */
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload.data;
        state.analyticsPeriod = action.payload.period;
      });
  },
});

export default dashboardSlice.reducer;
