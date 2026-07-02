export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900 dark:text-red-300">
      {message}
    </div>
  );
}
