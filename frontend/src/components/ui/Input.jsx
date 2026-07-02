export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <input
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
        placeholder:text-gray-400
        dark:placeholder:text-gray-500
        px-4
        py-2.5
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-300
        dark:focus:ring-blue-800
        ${error ? "border-red-500" : ""}
        ${className}
        `}
        {...props}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
