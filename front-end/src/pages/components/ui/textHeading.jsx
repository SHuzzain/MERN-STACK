import React from "react";
import { cn } from "../../../../lib/utils";

const TextHeading = ({
  containerClassName,
  spanClassName,
  label = { 1: "De", 2: "sign" },
}) => {
  return (
    <span
      className={cn(
        `font-bold text-3xl text-primary whitespace-nowrap group hover:text-[#1d1d1d] hover:dark:text-gray-400 transition-colors`,
        containerClassName
      )}
    >
      {label[1]}
      <span
        className={cn(
          `text-[#1d1d1d] group-hover:text-primary dark:text-gray-400`,
          spanClassName
        )}
      >
        {label[2]}
      </span>
    </span>
  );
};

export default TextHeading;
