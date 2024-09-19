import React, { ReactNode, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Card } from "./card";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import { Label } from "./label";

type ComboboxProps = {
  options: any[];
  render: (item: any) => ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  search?: string;
  emptyMessage?: string;
  disabled?: boolean;
  renderCustomAction?: () => ReactNode;
  className?: string;
};

export default function Combobox({
  value,
  onValueChange,
  searchPlaceholder,
  options,
  render,
  placeholder,
  emptyMessage,
  disabled = false,
  renderCustomAction,
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        if (!disabled) setOpen(open);
      }}
    >
      <PopoverTrigger
        className="w-full flex h-auto"
        asChild
        disabled={disabled}
      >
        <Button
          variant="outline"
          type="button"
          className="w-full justify-start"
          disabled={disabled}
        >
          {value ? (
            <div className="flex items-start justify-center flex-col">
              {render?.(options.find((item) => item.id == value))}
            </div>
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-full" asChild>
        <Card className="z-50">
          <div className="flex gap-2">
            <Input
              placeholder={searchPlaceholder}
              className="mb-2"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            {renderCustomAction?.()}
          </div>
          <ScrollArea className="h-[200px] px-2 z-[1000]">
            {filteredOptions.length > 0 ? (
              filteredOptions?.map((item, index) => (
                <Button
                  variant="ghost"
                  className="flex flex-col  justify-center items-start h-auto w-full"
                  key={index}
                  onClick={() => {
                    onValueChange?.(item.id);
                    setOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {render
                    ? render(item)
                    : Object.values(item).map((value, i) => (
                        <span key={i}>{String(value)}</span>
                      ))}
                </Button>
              ))
            ) : (
              <Label className="w-full justify-center items-center py-5 flex">
                {emptyMessage}
              </Label>
            )}
          </ScrollArea>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
