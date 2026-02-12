import { getPostsFromCache } from "@/lib/notion";
import PostCard from "@/components/post-card";
import PostPagination from "@/components/post-pagination";
import { Separator } from "@/components/ui/separator";

const POSTS_PER_PAGE = 6;

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const posts = getPostsFromCache();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const currentPage = Math.min(
    Math.max(1, Number(params.page) || 1),
    totalPages || 1
  );

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative max-w-2xl mx-auto text-center mb-12">
        <div className="absolute inset-0 -z-10 mx-auto max-w-lg blur-3xl opacity-20">
          <div className="aspect-square w-full rounded-full bg-gradient-to-tr from-primary/60 via-primary/30 to-transparent" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-lg text-muted-foreground mb-3">
          Discover interesting articles and insights
        </p>
      </div>

      <Separator className="mb-10" />

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <PostPagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
