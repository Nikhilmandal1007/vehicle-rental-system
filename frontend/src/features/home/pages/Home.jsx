import ThemeToggle from "../../../components/common/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container py-10">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Vehicle Rental System
        </h1>
      </div>
    </div>
  );
}
