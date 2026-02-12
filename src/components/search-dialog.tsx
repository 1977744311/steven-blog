"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, ArrowRight } from "lucide-react";
import { format } from "date-fns";

interface SearchPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  category?: string;
}

interface SearchDialogProps {
  posts: SearchPost[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ posts, open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(q)) ||
        post.category?.toLowerCase().includes(q)
    );
  }, [query, posts]);

  const handleSelect = useCallback(
    (slug: string) => {
      onOpenChange(false);
      setQuery("");
      router.push(`/posts/${slug}`);
    },
    [onOpenChange, router]
  );

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg p-0 gap-0 overflow-hidden"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">搜索文章</DialogTitle>
        <div className="flex items-center border-b px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            placeholder="搜索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 pl-3"
            autoFocus
          />
        </div>

        <div className="max-h-80 overflow-y-auto">
          {!query.trim() ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Search className="h-8 w-8 mb-3 opacity-40" />
              <p className="text-sm">输入关键词搜索文章...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <FileText className="h-8 w-8 mb-3 opacity-40" />
              <p className="text-sm">未找到匹配的文章</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredPosts.map((post, idx) => (
                <button
                  key={`${post.slug}-${idx}`}
                  onClick={() => handleSelect(post.slug)}
                  className="w-full flex items-start gap-3 rounded-lg px-3 py-3 text-left hover:bg-accent transition-colors group"
                >
                  <FileText className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-foreground truncate">
                        {post.title}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-muted-foreground/70">
                        {format(new Date(post.date), "yyyy-MM-dd")}
                      </span>
                      {post.category && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 h-4"
                        >
                          {post.category}
                        </Badge>
                      )}
                      {post.tags?.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 h-4"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {query.trim()
              ? `${filteredPosts.length} 个结果`
              : `${posts.length} 篇文章`}
          </span>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">
              ESC
            </kbd>
            <span>关闭</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
