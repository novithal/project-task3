import { useMemo, useState } from "react";

import {
  Plus,
  Check,
  X,
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { useHR } from "../context/HRContext";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Modal from "../components/common/Modal";
import StatusBadge from "../components/common/StatusBadge";
import SearchBar from "../components/common/SearchBar";

function Leaves() {
  const {
    leaves,
    employees,
    addLeave,
    updateLeaveStatus,
    showToast,
  } = useHR();

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [form, setForm] = useState({
    employeeId: "",
    leaveType: "Casual Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const employeeOptions = employees.map((employee) => ({
    label: `${employee.name} (${employee.employeeId})`,
    value: String(employee.id),
  }));

  const filteredLeaves = useMemo(() => {
    return leaves.filter((leave) => {
      const matchesSearch = leave.employeeName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        !statusFilter || leave.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leaves, search, statusFilter]);

  const pendingCount = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const approvedCount = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const rejectedCount = leaves.filter(
    (leave) => leave.status === "Rejected"
  ).length;

  const handleSubmit = (event) => {
    event.preventDefault();

    const employee = employees.find(
      (item) => item.id === Number(form.employeeId)
    );

    if (!employee) {
      showToast("Please select an employee", "error");
      return;
    }

    if (!form.fromDate || !form.toDate || !form.reason.trim()) {
      showToast("Please complete all fields", "error");
      return;
    }

    if (form.toDate < form.fromDate) {
      showToast("End date cannot be before start date", "error");
      return;
    }

    const start = new Date(`${form.fromDate}T00:00:00`);
    const end = new Date(`${form.toDate}T00:00:00`);

    const days =
      Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

    addLeave({
      employeeId: employee.id,
      employeeName: employee.name,
      leaveType: form.leaveType,
      fromDate: form.fromDate,
      toDate: form.toDate,
      days,
      reason: form.reason.trim(),
      status: "Pending",
    });

    setModalOpen(false);

    setForm({
      employeeId: "",
      leaveType: "Casual Leave",
      fromDate: "",
      toDate: "",
      reason: "",
    });
  };

  const handleStatus = (id, status) => {
    updateLeaveStatus(id, status);
  };

  return (
    <div>
      <PageHeader
        title="Leave Management"
        description="Review and manage employee leave requests."
        action={
          <Button
            icon={Plus}
            onClick={() => setModalOpen(true)}
          >
            Apply Leave
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total Requests",
            value: leaves.length,
            icon: CalendarDays,
            color: "text-indigo-600",
          },
          {
            title: "Pending",
            value: pendingCount,
            icon: Clock,
            color: "text-amber-600",
          },
          {
            title: "Approved",
            value: approvedCount,
            icon: CheckCircle,
            color: "text-emerald-600",
          },
          {
            title: "Rejected",
            value: rejectedCount,
            icon: XCircle,
            color: "text-red-600",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <Icon size={23} className={item.color} />

              <p className="mt-3 text-sm text-slate-500">
                {item.title}
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {item.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">
              Leave Requests
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {filteredLeaves.length} requests found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search employee..."
            />

            <div className="w-full sm:w-40">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={["Pending", "Approved", "Rejected"]}
                placeholder="All Status"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Employee",
                  "Leave Type",
                  "From Date",
                  "To Date",
                  "Days",
                  "Reason",
                  "Status",
                  "Actions",
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
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((leave) => (
                  <tr key={leave.id}>
                    <td className="px-5 py-4 text-sm font-medium text-slate-800">
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

                    <td className="max-w-48 truncate px-5 py-4 text-sm text-slate-600">
                      {leave.reason}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={leave.status} />
                    </td>

                    <td className="px-5 py-4">
                      {leave.status === "Pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatus(leave.id, "Approved")
                            }
                            title="Approve"
                            className="rounded-lg bg-emerald-50 p-2 text-emerald-600 hover:bg-emerald-100"
                          >
                            <Check size={17} />
                          </button>

                          <button
                            onClick={() =>
                              handleStatus(leave.id, "Rejected")
                            }
                            title="Reject"
                            className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                          >
                            <X size={17} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Submit Leave Request"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Employee"
            value={form.employeeId}
            onChange={(e) =>
              setForm({ ...form, employeeId: e.target.value })
            }
            options={employeeOptions}
            placeholder="Select employee"
          />

          <Select
            label="Leave Type"
            value={form.leaveType}
            onChange={(e) =>
              setForm({ ...form, leaveType: e.target.value })
            }
            options={[
              "Casual Leave",
              "Sick Leave",
              "Annual Leave",
              "Unpaid Leave",
              "Maternity Leave",
              "Paternity Leave",
            ]}
          />

          <Input
            label="From Date"
            type="date"
            value={form.fromDate}
            onChange={(e) =>
              setForm({ ...form, fromDate: e.target.value })
            }
          />

          <Input
            label="To Date"
            type="date"
            value={form.toDate}
            onChange={(e) =>
              setForm({ ...form, toDate: e.target.value })
            }
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Reason
            </label>

            <textarea
              rows="3"
              value={form.reason}
              onChange={(e) =>
                setForm({ ...form, reason: e.target.value })
              }
              placeholder="Enter reason for leave"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              Submit Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Leaves;