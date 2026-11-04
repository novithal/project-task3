import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(onClose, 3000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed right-5 top-5 z-[100] flex min-w-[280px] items-center gap-3 rounded-xl border bg-white p-4 shadow-lg">
      {isSuccess ? (
        <CheckCircle2 className="text-emerald-600" />
      ) : (
        <AlertCircle className="text-red-600" />
      )}

      <p className="flex-1 text-sm font-medium text-slate-700">
        {toast.message}
      </p>

      <button onClick={onClose}>
        <X size={16} className="text-slate-400" />
      </button>
    </div>
  );
}

export default Toast;