import { Link } from "react-router-dom";
import {
  UserPlus,
  Building2,
  CalendarCheck,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

const actions = [
  {
    title: "Add Employee",
    description: "Create a new employee record",
    icon: UserPlus,
    path: "/employees",
  },
  {
    title: "Departments",
    description: "Manage company departments",
    icon: Building2,
    path: "/departments",
  },
  {
    title: "Attendance",
    description: "Review attendance records",
    icon: CalendarCheck,
    path: "/attendance",
  },
  {
    title: "Leave Requests",
    description: "Manage employee leave",
    icon: CalendarDays,
    path: "/leaves",
  },
];

function QuickActions() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900">
        Quick Actions
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {actions.map(({ title, description, icon: Icon, path }) => (
          <Link
            key={title}
            to={path}
            className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition hover:border-indigo-200 hover:bg-indigo-50"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                <Icon size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {title}
                </p>

                <p className="text-xs text-slate-500">
                  {description}
                </p>
              </div>
            </div>

            <ArrowUpRight size={16} className="text-slate-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;