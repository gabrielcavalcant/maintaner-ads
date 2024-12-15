import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { usePathname, Link } from "@/navigation";
import { useCallback } from "react";
import { Label } from "../ui/label";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  isFetching: boolean;
}

export function DataTablePagination<TData>({
  table,
  isFetching,
}: DataTablePaginationProps<TData>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updateUrl = useCallback(
    (updatedPage: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", String(updatedPage));
      return `${pathname}?${newSearchParams.toString()}`;
    },
    [pathname, searchParams]
  );

  // Verifica se o table está definido e se não está em busca antes de acessar as propriedades do table
  if (!table || isFetching) {
    return (
      <div className="flex w-full items-center justify-end px-2">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              disabled
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" disabled>
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" disabled>
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              disabled
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentPage = table.getState().pagination.pageIndex + 1;

  const pageCount = table.getPageCount();
 
  return (
    <div className="flex w-full items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">

        <div className="flex items-center space-x-2">
          <Link
            href={updateUrl(0)}
            className={!table.getCanPreviousPage() ? "pointer-events-none" : ""}
            aria-disabled={!table.getCanPreviousPage()}
            tabIndex={!table.getCanPreviousPage() ? -1 : undefined}
          >
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={updateUrl(currentPage - 2)}
            className={!table.getCanPreviousPage() ? "pointer-events-none" : ""}
            aria-disabled={!table.getCanPreviousPage()}
            tabIndex={!table.getCanPreviousPage() ? -1 : undefined}
          >
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          {pageCount !== currentPage - 1 && (
            <Label className="text-muted-foreground">{currentPage - 1}</Label>
          )}

          <Link
            href={updateUrl(currentPage)}
            className={!table.getCanNextPage() ? "pointer-events-none" : ""}
            aria-disabled={!table.getCanNextPage()}
            tabIndex={!table.getCanNextPage() ? -1 : undefined}
          >
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={updateUrl(pageCount - 1)}
            className={!table.getCanNextPage() ? "pointer-events-none" : ""}
            aria-disabled={!table.getCanNextPage()}
            tabIndex={!table.getCanNextPage() ? -1 : undefined}
          >
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
