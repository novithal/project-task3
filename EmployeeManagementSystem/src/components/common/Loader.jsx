import { LoaderCircle } from "lucide-react";

function Loader() {
  return (
    <div className="flex min-h-48 items-center justify-center">
      <LoaderCircle
        size={32}
        className="animate-spin text-indigo-600"
      />
    </div>
  );
}

export default Loader;