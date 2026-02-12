import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Post, getWordCount } from "@/lib/notion";
import { Badge } from "@/components/ui/badge";
import { calculateReadingTime } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";

// Deterministic gradient based on post title for consistent colors
const gradients = [
  "from-blue-500/20 via-purple-500/10 to-pink-500/20",
  "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
  "from-orange-500/20 via-red-500/10 to-rose-500/20",
  "from-violet-500/20 via-indigo-500/10 to-blue-500/20",
  "from-amber-500/20 via-yellow-500/10 to-lime-500/20",
  "from-pink-500/20 via-fuchsia-500/10 to-purple-500/20",
];

function getGradient(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const wordCount = post.content ? getWordCount(post.content) : 0;
  const readingTime = calculateReadingTime(wordCount);

  return (
    <Card className="group relative pt-0 overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col h-full">
      <Link
        href={`/posts/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-label={post.title}
      />
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${getGradient(post.title)} flex items-center justify-center`}
          >
            <span className="text-4xl font-bold text-foreground/10">
              {post.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {post.category && (
          <div className="absolute top-4 left-4 z-20">
            <Badge
              variant="secondary"
              className="backdrop-blur-sm bg-background/80 shadow-sm"
            >
              {post.category}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="space-y-2 flex-1">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
        </div>
        <div className="pr-8 relative">
          <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
          <ArrowUpRight className="absolute top-0.5 right-0 h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
        </div>
        <p className="text-muted-foreground line-clamp-2">{post.description}</p>
      </CardHeader>
      <CardContent>
        {post.author && (
          <p className="text-sm text-muted-foreground">By {post.author}</p>
        )}
      </CardContent>
      {post.tags && post.tags.length > 0 && (
        <CardFooter className="mt-auto">
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-background/80">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
