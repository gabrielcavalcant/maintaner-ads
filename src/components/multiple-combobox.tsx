import React, { useEffect, useState } from "react";
import Combobox from "./ui/combobox";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { IoIosRemove } from "react-icons/io";

type OptionType = {
  id: string;
  name: string;
};

type MultipleComboboxProps = {
  options: OptionType[];
  render: (item: OptionType) => React.ReactNode;
  values?: OptionType[];
  onValuesChange?: (values: OptionType[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  search?: string;
  emptyMessage?: string;
  disabled?: boolean;
  renderCustomAction?: () => React.ReactNode;
  className?: string;
};

export default function MultipleCombobox({
  render,
  search,
  searchPlaceholder,
  placeholder,
  options,
  emptyMessage,
  values = [],
  onValuesChange,
  disabled,
  className,
  renderCustomAction,
}: MultipleComboboxProps) {
  const [selectedValues, setSelectedValues] = useState<OptionType[]>(values);

  useEffect(() => {
    if (Array.isArray(values)) setSelectedValues(values);
  }, [values]);

  const handleValueChange = (option: OptionType) => {
    setSelectedValues((prev) => {
      const isSelected = prev.some((item) => item.id === option.id);
      const updatedValues = isSelected
        ? prev.filter((item) => item.id !== option.id)
        : [...prev, option];
      if (onValuesChange) {
        onValuesChange(updatedValues);
      }
      return updatedValues;
    });
  };

  const handleDelete = (id: string) => {
    setSelectedValues((prev) => {
      const updatedValues = prev.filter((item) => item.id !== id);
      if (onValuesChange) {
        onValuesChange(updatedValues);
      }
      return updatedValues;
    });
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <Combobox
        options={options}
        onValueChange={(id: string) => {
          const option = options.find((op) => op.id === id);
          if (option) handleValueChange(option);
        }}
        searchPlaceholder={searchPlaceholder}
        placeholder={placeholder}
        value={""}
        search={search}
        render={render}
        renderCustomAction={renderCustomAction}
        emptyMessage={emptyMessage}
        disabled={disabled}
        className={className}
      />
      {/* Display selected values */}
      <div className="flex flex-wrap gap-2">
        {selectedValues.map((item) => (
          <Badge
            key={item.id}
            className="selected-item flex text-sm gap-2 "
            variant="outline"
          >
            {item.name}
            <Button
              size="icon"
              variant="ghost"
              className="flex items-center justify-center rounded-full p-1 h-5 w-5 text-center text-sm"
              type="button"
              onClick={() => handleDelete(item.id)}
            >
              <span className="text-center">x</span>
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
