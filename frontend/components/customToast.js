import { toast } from "react-hot-toast";
import { X } from "lucide-react";

export const showProfessionalToast = (message) => {
  toast.custom((t) => (
    <div
      className={`
        pointer-events-auto w-full max-w-md
        flex items-center justify-between gap-4 px-4 py-3 rounded-lg
        bg-white text-black shadow-md
        dark:bg-zinc-950 dark:text-white
        border-[0.5px] border-zinc-300 dark:border-zinc-600
      `}
      style={{
        position: "relative", // allows proper layout
        overflow: "hidden",
      }}
    >
      {/* Text */}
      <span className="flex-1 text-sm font-medium">{message}</span>

      {/* Divider */}
      <div className="h-5 border-r-[1px] border-zinc-400 dark:border-zinc-700"></div>

      {/* Close Button */}
      <button
        onClick={() => toast.dismiss(t.id)}
        className="
          flex items-center justify-center w-7 h-7
          rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-colors
        "
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ), {
    position: "top-right", // toast appears at top-right
  });
};
