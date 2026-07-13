import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground selection:bg-[#007AFF] selection:text-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/80 flex field-sizing-content min-h-16 w-full rounded-lg border bg-white dark:bg-zinc-900/50 px-3 py-2 text-sm shadow-sm transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#007AFF]/20 focus-visible:border-[#007AFF] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props} />
  );
}

export { Textarea }
