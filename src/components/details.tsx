import React from "react";
import CheckboxInput from "./ui/checkbox-input";
import { Details as DetailsType } from "@/types";
import CopyButton from "./ui/copy-button";
import { Skeleton } from "./ui/skeleton";

interface DetailsProps {
  data: { [key: string]: any } | null;
  options?: DetailsType[];
  showNull?: boolean;
  showAllAttributes?: boolean; // Novo parâmetro para mostrar todos os atributos do objeto data
  isPending?: boolean;
}

export default function Details({
  data,
  options,
  showNull = true,
  showAllAttributes = false, // Por padrão, não mostra todos os campos
  isPending = false,
}: Readonly<DetailsProps>) {
  if (!data) {
    return (
      <div className="flex gap-8 p-3 flex-wrap">
        <Skeleton />
      </div>
    );
  }

  const groupedOptions =
    showAllAttributes || !options
      ? Object.keys(data).reduce((acc, key, index) => {
          // Cria grupos para todos os atributos em data
          const groupIndex = Math.floor(index / 2);
          acc[groupIndex] = acc[groupIndex] || [];
          acc[groupIndex].push({
            dataName: key,
            label: key,
            canCopy: false,
          });
          return acc;
        }, [] as DetailsType[][])
      : options.reduce((acc, option, index) => {
          // Agrupamento padrão baseado em options
          const groupIndex = Math.floor(index / 2);
          acc[groupIndex] = acc[groupIndex] || [];
          acc[groupIndex].push(option);
          return acc;
        }, [] as DetailsType[][]);

  return !isPending ? (
    <div className="p-3 flex w-full justify-start gap-x-14 gap-y-5 flex-wrap">
      {groupedOptions.map((group, groupIndex) => (
        <div key={groupIndex} className="flex gap-10">
          {group.map((option) => {
            const value = data[option.dataName];
            // Se showNull for false e o valor for null, não renderize o item.
            if ((value === null && !showNull) || value === undefined) {
              return null;
            }

            return (
              <div key={option.dataName} className="select-text">
                <h2 className="font-semibold">{option.label}</h2>
                <div className="flex gap-x-2">
                  {option.customInstance ? (
                    option.customInstance(value)
                  ) : value === "true" || value === "false" ? (
                    <CheckboxInput disabled={true} checked={value === "true"} />
                  ) : (
                    <p>
                      {value !== null
                        ? String(
                            option.formatInput
                              ? option.formatInput(value)
                              : value
                          )
                        : "-"}
                    </p>
                  )}
                  {option.canCopy && (
                    <CopyButton
                      column={option}
                      copyText={`${
                        option?.formatOutput
                          ? option.formatOutput(value)
                          : value
                      }`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  ) : (
    <Skeleton className="w-full min-h-[100px] bg-muted-foreground"></Skeleton>
  );
}
