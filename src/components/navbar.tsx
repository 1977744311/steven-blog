"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SearchDialog } from "@/components/search-dialog";
import { Button } from "@/components/ui/button";

interface SearchPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  category?: string;
}

interface NavbarProps {
  posts: SearchPost[];
}

export function Navbar({ posts }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors"
              >
                My Blog
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="搜索"
              >
                <Search className="h-4 w-4" />
              </Button>
              <ModeToggle />
            </div>
          </div>
        </nav>
      </header>

      <SearchDialog
        posts={posts}
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />
    </>
  );
}
