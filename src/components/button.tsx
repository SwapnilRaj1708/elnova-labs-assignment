import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonPropsType = {
  children: React.ReactNode;
  className?: string;
  tooltipOnDisabled?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export default function Button({
  children,
  className,
  tooltipOnDisabled,
  ...rest
}: ButtonPropsType) {
  return (
    <button
      className={twMerge(
        "group",
        "relative",
        "w-fit",
        "rounded-md",
        "bg-[#263F60]",
        "px-5",
        "py-3",
        "text-sm",
        "font-medium",
        "leading-[13px]",
        "text-white",
        "disabled:bg-[#607590]",
        className,
      )}
      {...rest}
    >
      {children}
      {!!tooltipOnDisabled && (
        <span className="invisible absolute bottom-[calc(100%_+_5px)] left-2/4 z-[1] -ml-[50%] w-full cursor-default rounded-md bg-[#a4a4a4] p-2 text-center leading-4 text-white after:absolute after:left-2/4 after:top-full after:ml-[-5px] after:border-[5px] after:border-solid after:border-[#a4a4a4_transparent_transparent_transparent] after:content-[''] group-disabled:group-hover:visible">
          {tooltipOnDisabled}
        </span>
      )}
    </button>
  );
}
