"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  onPaginationChange?: (pagination: number) => void;
  pageCount?: number;
  isFetching: boolean;
  pageSize?: number;
  rowCount: number;
  topText?: string;
  height?: string;
  noResultsText?: string;
  onRowClick?: (row: Row<TData>) => void;
  maxItems?: number; // Adicione esta linha
  hidePagination?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data = [],
  onPaginationChange,
  pageCount,
  isFetching,
  pageSize = 20,
  rowCount,
  topText,
  noResultsText,
  onRowClick,
  height = "74vh",
  maxItems,
  hidePagination = false,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations();
  const pageParam = searchParams.get("page") ?? "0";

  // Determine the number of items to display
  const itemsToDisplay = React.useMemo(() => {
    return maxItems ? data.slice(0, maxItems) : data;
  }, [maxItems, data]);

  const table = useReactTable({
    data: itemsToDisplay,
    columns,
    pageCount: pageCount,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination: {
        pageIndex: parseInt(pageParam),
        pageSize: pageSize,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
    rowCount: rowCount,
  });

  const updateUrl = React.useCallback(
    (updatedPage: string, paramName: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (newSearchParams.get(paramName) !== updatedPage) {
        newSearchParams.set(paramName, updatedPage);
        router.push(pathname + "?" + newSearchParams.toString());
      }
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="relative flex h-full w-full flex-col gap-2 pb-3">
      {/* <DataTableToolbar table={table} /> */}
      {topText ?? <Label className="ml-4 text-sm">{topText}</Label>}
      <Card className="rounded-md">
        <div className={`overflow-auto rounded-md`} style={{ height: height }}>
          <Table className="relative">
            <TableHeader className="sticky top-0 z-10 bg-card">
              {table?.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="h-8 hover:bg-card">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className="p-2"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isFetching ? (
                Array.from({ length: pageSize }).map((_, rowIndex) => (
                  <TableRow key={rowIndex} className="h-8 hover:bg-background">
                    {columns.map((column, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        className="py-0"
                        style={{ paddingInline: 10 }}
                      >
                        <Skeleton className="h-5 w-full rounded bg-gray-200 bg-opacity-25" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table?.getRowModel().rows.length ? (
                table?.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`h-8 hover:bg-accent hover:text-accent-foreground ${
                      onRowClick && "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (onRowClick) onRowClick(row);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`py-0`}
                        style={{ paddingInline: 10 }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="h-8 hover:bg-card">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center "
                  >
                    {noResultsText ?? t("Table.noResult")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      {!hidePagination && (
        <DataTablePagination table={table} isFetching={isFetching} />
      )}
    </div>
  );
}
