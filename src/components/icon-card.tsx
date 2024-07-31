import React from "react";
import { Card } from "./ui/card";
import { IconType } from "react-icons/lib";
import { Label } from "./ui/label";

type IconCardProps = {
  Icon: IconType;
  value: string | number;
  title: string;
};

export default function IconCard({ Icon, value, title }: IconCardProps) {
  return (
    <Card className="flex items-center gap-3 p-3">
      <Icon className="text-4xl" />
      <div className="flex flex-col">
        <span className="text-2xl font-semibold">{value}</span>
        <Label className="text-muted-foreground">{title}</Label>
      </div>
    </Card>
  );
}
