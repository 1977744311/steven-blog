import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { DeployButton } from "@/components/deploy-button";
import { getPostsFromCache } from "@/lib/notion";
import { ArrowUp } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const posts = getPostsFromCache();

  // Pass lightweight post data (without content) to client-side Navbar
  const searchPosts = posts.map(({ slug, title, description, date, tags, category }) => ({
    slug,
    title,
    description,
    date,
    tags,
    category,
  }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar posts={searchPosts} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      <footer className="border-t bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-foreground">My Blog</p>
              <p className="text-sm text-muted-foreground mt-1">
                Discover interesting articles and insights
              </p>
            </div>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="回到顶部"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} My Blog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <DeployButton />
    </div>
  );
}
