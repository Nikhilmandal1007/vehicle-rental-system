export default function TextArea({
  label,
  error,
  rows = 4,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        className={`
        w-full
        rounded-lg
        border
        border-gray-300
        dark:border-gray-700
        bg-white
        dark:bg-gray-900
        text-gray-900
        dark:text-white
        px-4
        py-3
        outline-none
        resize-none
        focus:ring-2
        focus:ring-blue-300
        ${className}
        `}
        {...props}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
