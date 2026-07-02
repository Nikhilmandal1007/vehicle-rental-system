import Spinner from "./Spinner";

export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
      <Spinner size="lg" />
    </div>
  );
}
