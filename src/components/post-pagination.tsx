import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostPaginationProps {
  currentPage: number;
  totalPages: number;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("ellipsis");
  }

  pages.push(total);

  return pages;
}

function getPageHref(page: number): string {
  if (page === 1) return "/";
  return `/?page=${page}`;
}

export default function PostPagination({
  currentPage,
  totalPages,
}: PostPaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mt-12">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 ? (
              <Link
                href={getPageHref(currentPage - 1)}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" })
                )}
                aria-label="上一页"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Link>
            ) : (
              <span
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "pointer-events-none opacity-50"
                )}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </span>
            )}
          </PaginationItem>

          {pageNumbers.map((page, idx) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <Link
                  href={getPageHref(page)}
                  className={cn(
                    buttonVariants({
                      variant: page === currentPage ? "outline" : "ghost",
                      size: "icon",
                    })
                  )}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </Link>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            {currentPage < totalPages ? (
              <Link
                href={getPageHref(currentPage + 1)}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" })
                )}
                aria-label="下一页"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            ) : (
              <span
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "pointer-events-none opacity-50"
                )}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
