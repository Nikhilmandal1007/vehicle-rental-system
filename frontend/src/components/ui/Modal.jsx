import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${sizes[size]} rounded-2xl bg-white dark:bg-gray-900 shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-md p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
