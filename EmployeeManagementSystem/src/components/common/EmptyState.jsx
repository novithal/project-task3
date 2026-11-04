import { Inbox } from "lucide-react";

function EmptyState({
  title = "No records found",
  description = "Try changing your search or filters.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-4">
        <Inbox size={28} className="text-slate-400" />
      </div>

      <h3 className="font-semibold text-slate-800">{title}</h3>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;