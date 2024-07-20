import { cn } from "@/lib/utils";
import React from "react";

interface HomeCardsProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  handleClick: () => void;
  className: string;
}

const HomeCards = ({
  icon,
  title,
  description,
  handleClick,
  className,
}: HomeCardsProps) => {
  return (
    <div
      onClick={handleClick}
      className={cn(
        "bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",
        className
      )}
    >
      <div className="flex-center glassmorphism size-12 rounded-[12px]">
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCards;
