import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  Clock,
} from "lucide-react";

import { useHR } from "../context/HRContext";

import PageHeader from "../components/layout/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import EmployeeChart from "../components/dashboard/EmployeeChart";
import DepartmentChart from "../components/dashboard/DepartmentChart";
import RecentEmployees from "../components/dashboard/RecentEmployees";
import QuickActions from "../components/dashboard/QuickActions";

function Dashboard() {
  const {
    employees,
    departments,
    leaves,
    attendance,
  } = useHR();

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const onLeaveEmployees = employees.filter(
    (employee) => employee.status === "On Leave"
  ).length;

  const pendingLeaves = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const presentToday = attendance.filter(
    (record) =>
      record.date === new Date().toISOString().slice(0, 10) &&
      record.status === "Present"
  ).length;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's your HR overview."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={employees.length}
          icon={Users}
          color="bg-indigo-100 text-indigo-600"
          subtitle="All employee records"
        />

        <StatCard
          title="Active Employees"
          value={activeEmployees}
          icon={UserCheck}
          color="bg-emerald-100 text-emerald-600"
          subtitle="Currently active"
        />

        <StatCard
          title="Inactive Employees"
          value={inactiveEmployees}
          icon={UserX}
          color="bg-red-100 text-red-600"
          subtitle="Currently inactive"
        />

        <StatCard
          title="Employees on Leave"
          value={onLeaveEmployees}
          icon={CalendarDays}
          color="bg-amber-100 text-amber-600"
          subtitle="Currently on leave"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <EmployeeChart employees={employees} />

        <DepartmentChart
          employees={employees}
          departments={departments}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <RecentEmployees employees={employees} />

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <Clock size={18} />
                <span className="text-xs">Pending Leaves</span>
              </div>

              <h2 className="mt-3 text-3xl font-bold text-amber-600">
                {pendingLeaves}
              </h2>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <CalendarDays size={18} />
                <span className="text-xs">Present Today</span>
              </div>

              <h2 className="mt-3 text-3xl font-bold text-emerald-600">
                {presentToday}
              </h2>
            </div>
          </div>

          <QuickActions />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;