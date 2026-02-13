import { Menu, Moon, Sun, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/* ===== Header Props ===== */
interface HeaderProps {
  onToggleSidebar: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

/* ===== Header Component ===== */
export default function Header({
  onToggleSidebar,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold md:text-xl">
            Welcome back, Alex
          </h1>
          <p className="hidden text-sm text-muted-foreground md:block">
            Here's what's happening with your social media today.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        {/* User Avatar */}
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
            alt="Alex Turner"
          />
          <AvatarFallback>AT</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
