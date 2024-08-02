import React from "react";
import { FaCheck } from "react-icons/fa6";
import { Label } from "./label";

interface CheckboxInputProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function CheckboxInput({
  label,
  required = false,
  checked,
  disabled = false,
  onChange,
  className,
  style,
}: CheckboxInputProps) {
  const id = `checkbox-${label?.replace(/\s+/g, "-")?.toLowerCase()}`; // Cria um ID baseado no label

  return (
    <div
      className={`${className} flex flex-col gap-2 ${
        label && "h-full items-center justify-start"
      } `}
      style={style}
    >
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-primary ml-1 ">*</span>}
        </Label>
      )}
      <input
        disabled={disabled}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden" // Esconde o checkbox padrão
      />
      <label
        htmlFor={id}
        className={`w-5 h-5 border-2 rounded transition-all ${
          !disabled && "hover:scale-105 cursor-pointer"
        } ${
          checked
            ? "border-secondary-color-1  bg-primary"
            : "border-muted-foreground bg-muted-foreground"
        }  flex justify-center items-center`}
      >
        {checked && (
          <span className="text-white material-icons">
            <FaCheck />
          </span>
        )}
      </label>
    </div>
  );
}
