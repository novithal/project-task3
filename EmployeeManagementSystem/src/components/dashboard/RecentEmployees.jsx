import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Avatar from "../common/Avatar";
import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../../utils/helpers";

function RecentEmployees({ employees }) {
  const recentEmployees = [...employees]
    .sort(
      (a, b) =>
        new Date(b.joiningDate) - new Date(a.joiningDate)
    )
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h3 className="font-semibold text-slate-900">
            Recent Employees
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Latest employee records
          </p>
        </div>

        <Link
          to="/employees"
          className="flex items-center gap-1 text-sm font-medium text-indigo-600"
        >
          View all <ArrowRight size={15} />
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {recentEmployees.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-between gap-3 p-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Avatar name={employee.name} />

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {employee.name}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {employee.designation}
                </p>

                <p className="text-xs text-slate-400">
                  Joined {formatDate(employee.joiningDate)}
                </p>
              </div>
            </div>

            <StatusBadge status={employee.status} />
          </div>
        ))}

        {recentEmployees.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-500">
            No employees available.
          </p>
        )}
      </div>
    </div>
  );
}

export default RecentEmployees;