"use client";
import React, { HTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";

import {
  IoIosArrowRoundUp,
  IoIosArrowRoundDown,
  IoIosArrowBack,
} from "react-icons/io";

interface DataTableColumnHeaderProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export default function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const renderSortIcon = () => {
    const sort = column.getIsSorted();
    if (!sort) {
      return <IoIosArrowBack className="ml-2 h-4 w-4 rotate-90" />;
    }
    return sort === "desc" ? (
      <IoIosArrowRoundDown className="ml-2 h-4 w-4" />
    ) : (
      <IoIosArrowRoundUp className="ml-2 h-4 w-4" />
    );
  };

  if (!column.getCanSort()) {
    return <div className={className}>{title}</div>;
  }
  return (
    <div className={className}>
      <Button
        variant="ghost"
        size="sm"
        className="h-8"
        onClick={column.getToggleSortingHandler()}
      >
        <span className="text-sm">{title}</span>
        {renderSortIcon()}
      </Button>
    </div>
  );
}
