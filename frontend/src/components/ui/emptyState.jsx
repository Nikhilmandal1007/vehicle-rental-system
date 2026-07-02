export default function EmptyState({ title, description }) {
  return (
    <div className="py-16 text-center">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h2>

      <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
