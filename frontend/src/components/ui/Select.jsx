export default function Select({
  label,
  error,
  options = [],
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

      <select
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
        py-2.5
        outline-none
        focus:ring-2
        focus:ring-blue-300
        ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
