import { useMemo, useState } from "react";

import {
  CalendarCheck,
  Users,
  UserCheck,
  UserX,
  Clock,
  Pencil,
} from "lucide-react";

import { useHR } from "../context/HRContext";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/common/Button";
import Select from "../components/common/Select";
import SearchBar from "../components/common/SearchBar";
import StatusBadge from "../components/common/StatusBadge";
import Modal from "../components/common/Modal";

function Attendance() {
  const {
    attendance,
    employees,
    addAttendance,
    updateAttendance,
    showToast,
  } = useHR();

  const today = new Date().toISOString().slice(0, 10);

  const [selectedDate, setSelectedDate] = useState(today);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const [form, setForm] = useState({
    employeeId: "",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
  });

  const employeeOptions = employees.map((employee) => ({
    label: `${employee.name} (${employee.employeeId})`,
    value: String(employee.id),
  }));

  const dailyRecords = useMemo(() => {
    return attendance.filter((record) => {
      const matchesDate = record.date === selectedDate;

      const matchesSearch = record.employeeName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        !statusFilter || record.status === statusFilter;

      return matchesDate && matchesSearch && matchesStatus;
    });
  }, [attendance, selectedDate, search, statusFilter]);

  const allDailyRecords = attendance.filter(
    (record) => record.date === selectedDate
  );

  const presentCount = allDailyRecords.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = allDailyRecords.filter(
    (record) => record.status === "Absent"
  ).length;

  const lateCount = allDailyRecords.filter(
    (record) => record.status === "Late"
  ).length;

  const openAddModal = () => {
    setEditingRecord(null);

    setForm({
      employeeId: "",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
    });

    setModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditingRecord(record);

    setForm({
      employeeId: String(record.employeeId),
      status: record.status,
      checkIn: record.checkIn,
      checkOut: record.checkOut,
    });

    setModalOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const employee = employees.find(
      (item) => item.id === Number(form.employeeId)
    );

    if (!employee) {
      showToast("Please select an employee", "error");
      return;
    }

    const duplicate = attendance.some(
      (record) =>
        record.employeeId === employee.id &&
        record.date === selectedDate &&
        record.id !== editingRecord?.id
    );

    if (duplicate) {
      showToast(
        "Attendance already exists for this employee and date",
        "error"
      );
      return;
    }

    const recordData = {
      employeeId: employee.id,
      employeeName: employee.name,
      date: selectedDate,
      checkIn: form.status === "Absent" || form.status === "On Leave"
        ? "-"
        : form.checkIn,
      checkOut: form.status === "Absent" || form.status === "On Leave"
        ? "-"
        : form.checkOut,
      status: form.status,
    };

    if (editingRecord) {
      updateAttendance(editingRecord.id, recordData);
    } else {
      addAttendance(recordData);
    }

    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Attendance Management"
        description="Monitor and manage employee attendance."
        action={
          <Button icon={CalendarCheck} onClick={openAddModal}>
            Mark Attendance
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total Recorded",
            value: allDailyRecords.length,
            icon: Users,
            color: "text-indigo-600",
          },
          {
            title: "Present",
            value: presentCount,
            icon: UserCheck,
            color: "text-emerald-600",
          },
          {
            title: "Absent",
            value: absentCount,
            icon: UserX,
            color: "text-red-600",
          },
          {
            title: "Late",
            value: lateCount,
            icon: Clock,
            color: "text-amber-600",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border bg-white p-5 shadow-sm"
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
        <div className="flex flex-col gap-4 border-b p-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Attendance Date
              </label>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div className="flex items-end">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search employee..."
              />
            </div>
          </div>

          <div className="w-full sm:w-44">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                "Present",
                "Absent",
                "Late",
                "On Leave",
              ]}
              placeholder="All Status"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Employee",
                  "Date",
                  "Check In",
                  "Check Out",
                  "Status",
                  "Action",
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
              {dailyRecords.length > 0 ? (
                dailyRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-5 py-4 text-sm font-medium text-slate-800">
                      {record.employeeName}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {record.date}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {record.checkIn}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {record.checkOut}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={record.status} />
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => openEditModal(record)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Pencil size={17} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No attendance records for this date.
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
        title={
          editingRecord ? "Edit Attendance" : "Mark Attendance"
        }
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
            label="Attendance Status"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
            options={[
              "Present",
              "Absent",
              "Late",
              "On Leave",
            ]}
          />

          {form.status !== "Absent" &&
            form.status !== "On Leave" && (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Check In
                  </label>

                  <input
                    type="time"
                    value={form.checkIn}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        checkIn: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border px-3 py-2.5"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Check Out
                  </label>

                  <input
                    type="time"
                    value={form.checkOut}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        checkOut: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border px-3 py-2.5"
                  />
                </div>
              </>
            )}

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              Save Attendance
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Attendance;