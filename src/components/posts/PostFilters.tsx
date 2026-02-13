import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { platformConfig } from "@/lib/helpers";
import type { PostFilter, PostStatus, SortOrder } from "@/types";

/* ===== Post Filters Props ===== */
interface PostFiltersProps {
  searchQuery: string;
  filter: PostFilter;
  statusFilter: PostStatus;
  sortOrder: SortOrder;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: PostFilter) => void;
  onStatusChange: (status: PostStatus) => void;
  onSortChange: (sort: SortOrder) => void;
}

/* ===== Post Filters Component ===== */
export default function PostFilters({
  searchQuery,
  filter,
  statusFilter,
  sortOrder,
  onSearchChange,
  onFilterChange,
  onStatusChange,
  onSortChange,
}: PostFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Platform Filter */}
      <Select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value as PostFilter)}
        className="w-full sm:w-40"
      >
        <option value="all">All Platforms</option>
        {Object.entries(platformConfig).map(([key, config]) => (
          <option key={key} value={key}>
            {config.label}
          </option>
        ))}
      </Select>

      {/* Status Filter */}
      <Select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as PostStatus)}
        className="w-full sm:w-36"
      >
        <option value="all">All Status</option>
        <option value="published">Published</option>
        <option value="scheduled">Scheduled</option>
        <option value="draft">Draft</option>
      </Select>

      {/* Sort */}
      <Select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as SortOrder)}
        className="w-full sm:w-40"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="most-liked">Most Liked</option>
        <option value="most-commented">Most Commented</option>
      </Select>
    </div>
  );
}
