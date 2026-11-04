import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function EmployeeChart({ employees }) {
  const data = [
    { name: "Active", count: employees.filter(e => e.status === "Active").length },
    { name: "Inactive", count: employees.filter(e => e.status === "Inactive").length },
    { name: "On Leave", count: employees.filter(e => e.status === "On Leave").length },
  ];

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900">
        Employee Overview
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        Employees by current status
      </p>

      <div className="mt-5 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EmployeeChart;