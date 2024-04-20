import React from "react";
import { cn } from "../../../../lib/utils";

function ErrorMassage({ className, message }) {
  return (
    <p className={cn("p-0 text-red-600", className)}>
      {message || "This field is required"}
    </p>
  );
}

export default ErrorMassage;
