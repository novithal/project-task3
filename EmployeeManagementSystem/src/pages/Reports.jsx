import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { Download, FileBarChart } from "lucide-react";

import { useHR } from "../context/HRContext";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/common/Button";
import StatusBadge from "../components/common/StatusBadge";

function Reports() {
  const {
    employees,
    departments,
    attendance,
    leaves,
  } = useHR();

  const departmentData = departments.map((department) => ({
    name: department.name,
    employees: employees.filter(
      (employee) => employee.department === department.name
    ).length,
  }));

  const attendanceData = [
    {
      name: "Present",
      value: attendance.filter((a) => a.status === "Present").length,
    },
    {
      name: "Absent",
      value: attendance.filter((a) => a.status === "Absent").length,
    },
    {
      name: "Late",
      value: attendance.filter((a) => a.status === "Late").length,
    },
    {
      name: "On Leave",
      value: attendance.filter((a) => a.status === "On Leave").length,
    },
  ];

  const COLORS = [
    "#10b981",
    "#ef4444",
    "#f59e0b",
    "#6366f1",
  ];

  const exportCSV = () => {
    const headers = [
      "Employee ID",
      "Name",
      "Email",
      "Phone",
      "Department",
      "Designation",
      "Joining Date",
      "Salary",
      "Status",
    ];

    const rows = employees.map((employee) => [
      employee.employeeId,
      employee.name,
      employee.email,
      employee.phone,
      employee.department,
      employee.designation,
      employee.joiningDate,
      employee.salary,
      employee.status,
    ]);

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(
      ["\uFEFF" + csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "NEXHR_Employee_Report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        description="View employee, attendance and leave reports."
        action={
          <Button icon={Download} onClick={exportCSV}>
            Export Employees CSV
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total Employees", employees.length],
          ["Departments", departments.length],
          ["Attendance Records", attendance.length],
          ["Leave Requests", leaves.length],
        ].map(([title, value]) => (
          <div
            key={title}
            className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <FileBarChart className="text-indigo-600" size={22} />

            <p className="mt-3 text-sm text-slate-500">
              {title}
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {value}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900">
            Department Employee Report
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Employee count in each department
          </p>

          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="employees"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900">
            Attendance Report
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Distribution of recorded attendance
          </p>

          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {attendanceData.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b p-5">
          <h3 className="font-semibold text-slate-900">
            Leave Summary
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Current leave request status
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Employee",
                  "Leave Type",
                  "Start Date",
                  "End Date",
                  "Days",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-4 text-xs font-semibold uppercase text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td className="px-5 py-4 text-sm font-medium">
                    {leave.employeeName}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {leave.leaveType}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {leave.fromDate}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {leave.toDate}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {leave.days}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={leave.status} />
                  </td>
                </tr>
              ))}

              {leaves.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No leave records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;