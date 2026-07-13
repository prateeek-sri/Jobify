import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-[#007AFF] selection:text-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/80 h-9 w-full min-w-0 rounded-lg border bg-white dark:bg-zinc-900/50 px-3 py-1 text-sm shadow-sm transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-4 focus-visible:ring-[#007AFF]/20 focus-visible:border-[#007AFF]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props} />
  );
}

export { Input }
