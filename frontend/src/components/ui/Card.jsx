export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
      rounded-2xl
      bg-white
      dark:bg-gray-900
      shadow-md
      dark:shadow-black/30
      border
      border-gray-200
      dark:border-gray-800
      p-4
      sm:p-6
      transition-all
      ${className}
      `}
    >
      {children}
    </div>
  );
}
