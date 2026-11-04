
import { useMemo, useState } from "react";

import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Users,
  X,
} from "lucide-react";

import { useHR } from "../context/HRContext";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import StatusBadge from "../components/common/StatusBadge";
import Avatar from "../components/common/Avatar";
import SearchBar from "../components/common/SearchBar";
import DataTable from "../components/common/DataTable";
import Pagination from "../components/common/Pagination";

import {
  formatCurrency,
  formatDate,
  generateEmployeeId,
} from "../utils/helpers";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  joiningDate: "",
  salary: "",
  status: "Active",
  employmentType: "Full Time",
  location: "",
  gender: "",
};

function Employees() {
  const {
    employees,
    departments,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    showToast,
  } = useHR();

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const searchText = search.toLowerCase();

      const matchesSearch = [
        employee.name,
        employee.email,
        employee.employeeId,
        employee.designation,
      ].some((value) =>
        String(value || "").toLowerCase().includes(searchText)
      );

      const matchesDepartment =
        !departmentFilter ||
        employee.department === departmentFilter;

      const matchesStatus =
        !statusFilter ||
        employee.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [employees, search, departmentFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const openAddModal = () => {
    setEditingEmployee(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);

    setForm({
      ...emptyForm,
      ...employee,
      salary: String(employee.salary ?? ""),
    });

    setErrors({});
    setModalOpen(true);
  };

  const openViewModal = (employee) => {
    setSelectedEmployee(employee);
    setViewOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEmployee(null);
    setForm(emptyForm);
    setErrors({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Employee name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!form.department) {
      newErrors.department = "Select a department";
    }

    if (!form.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!form.joiningDate) {
      newErrors.joiningDate = "Joining date is required";
    }

    if (!form.salary || Number(form.salary) <= 0) {
      newErrors.salary = "Enter a valid salary";
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!form.gender) {
      newErrors.gender = "Select gender";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const emailExists = employees.some(
      (employee) =>
        employee.email.toLowerCase() === form.email.toLowerCase() &&
        employee.id !== editingEmployee?.id
    );

    if (emailExists) {
      setErrors((previous) => ({
        ...previous,
        email: "This email is already registered",
      }));

      return;
    }

    const employeeData = {
      ...form,
      salary: Number(form.salary),
    };

    if (editingEmployee) {
      updateEmployee(editingEmployee.id, employeeData);
    } else {
      addEmployee({
        ...employeeData,
        employeeId: generateEmployeeId(employees),
      });
    }

    closeModal();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    deleteEmployee(deleteTarget.id);

    setDeleteTarget(null);
  };

  const departmentOptions = departments.map(
    (department) => ({
      label: department.name,
      value: department.name,
    })
  );

  const columns = [
    "Employee",
    "Employee ID",
    "Department",
    "Designation",
    "Joining Date",
    "Salary",
    "Status",
    "Actions",
  ];

  return (
    <div>
      <PageHeader
        title="Employees"
        description="Manage employee information and records."
        action={
          <Button icon={Plus} onClick={openAddModal}>
            Add Employee
          </Button>
        }
      />

      {/* Summary */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-100 p-3 text-indigo-600">
              <Users size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Employees
              </p>

              <h3 className="text-2xl font-bold text-slate-900">
                {employees.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Active Employees
          </p>

          <h3 className="mt-2 text-2xl font-bold text-emerald-600">
            {employees.filter(e => e.status === "Active").length}
          </h3>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            On Leave
          </p>

          <h3 className="mt-2 text-2xl font-bold text-amber-600">
            {employees.filter(e => e.status === "On Leave").length}
          </h3>
        </div>
      </div>

      {/* Employee table */}

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">
              Employee Directory
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {filteredEmployees.length} employees found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <SearchBar
              value={search}
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
              placeholder="Search employees..."
            />

            <div className="w-full sm:w-44">
              <Select
                value={departmentFilter}
                onChange={(event) => {
                  setDepartmentFilter(event.target.value);
                  setPage(1);
                }}
                options={departmentOptions}
                placeholder="All Departments"
              />
            </div>

            <div className="w-full sm:w-36">
              <Select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
                options={["Active", "Inactive", "On Leave"]}
                placeholder="All Status"
              />
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={paginatedEmployees}
          renderRow={(employee) => (
            <tr key={employee.id} className="hover:bg-slate-50">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar name={employee.name} />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {employee.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {employee.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4 text-sm text-slate-600">
                {employee.employeeId}
              </td>

              <td className="px-5 py-4 text-sm text-slate-600">
                {employee.department}
              </td>

              <td className="px-5 py-4 text-sm text-slate-600">
                {employee.designation}
              </td>

              <td className="px-5 py-4 text-sm text-slate-600">
                {formatDate(employee.joiningDate)}
              </td>

              <td className="px-5 py-4 text-sm font-medium text-slate-700">
                {formatCurrency(employee.salary)}
              </td>

              <td className="px-5 py-4">
                <StatusBadge status={employee.status} />
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openViewModal(employee)}
                    title="View employee"
                    className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    onClick={() => openEditModal(employee)}
                    title="Edit employee"
                    className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    onClick={() => setDeleteTarget(employee)}
                    title="Delete employee"
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          )}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Add/Edit Modal */}

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editingEmployee ? "Edit Employee" : "Add New Employee"}
        size="max-w-3xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter employee name"
              error={errors.name}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="employee@company.com"
              error={errors.email}
            />

            <Input
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              error={errors.phone}
            />

            <Select
              label="Department"
              value={form.department}
              onChange={(event) =>
                handleChange({
                  target: {
                    name: "department",
                    value: event.target.value,
                  },
                })
              }
              options={departmentOptions}
              error={errors.department}
            />

            <Input
              label="Designation"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="e.g. Python Developer"
              error={errors.designation}
            />

            <Input
              label="Joining Date"
              name="joiningDate"
              type="date"
              value={form.joiningDate}
              onChange={handleChange}
              error={errors.joiningDate}
            />

            <Input
              label="Monthly Salary (₹)"
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              placeholder="Enter salary"
              error={errors.salary}
            />

            <Input
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter city"
              error={errors.location}
            />

            <Select
              label="Gender"
              value={form.gender}
              onChange={(event) =>
                handleChange({
                  target: {
                    name: "gender",
                    value: event.target.value,
                  },
                })
              }
              options={["Male", "Female", "Other"]}
              placeholder="Select gender"
            />

            <Select
              label="Employment Type"
              value={form.employmentType}
              onChange={(event) =>
                handleChange({
                  target: {
                    name: "employmentType",
                    value: event.target.value,
                  },
                })
              }
              options={[
                "Full Time",
                "Part Time",
                "Contract",
                "Intern",
              ]}
            />

            <Select
              label="Employee Status"
              value={form.status}
              onChange={(event) =>
                handleChange({
                  target: {
                    name: "status",
                    value: event.target.value,
                  },
                })
              }
              options={["Active", "Inactive", "On Leave"]}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={closeModal}
            >
              Cancel
            </Button>

            <Button type="submit">
              {editingEmployee ? "Save Changes" : "Add Employee"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Employee Modal */}

      <Modal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title="Employee Details"
      >
        {selectedEmployee && (
          <div>
            <div className="mb-6 flex items-center gap-4">
              <Avatar name={selectedEmployee.name} size="lg" />

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedEmployee.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {selectedEmployee.employeeId}
                </p>

                <StatusBadge status={selectedEmployee.status} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["Email", selectedEmployee.email],
                ["Phone", selectedEmployee.phone],
                ["Department", selectedEmployee.department],
                ["Designation", selectedEmployee.designation],
                ["Joining Date", formatDate(selectedEmployee.joiningDate)],
                ["Salary", formatCurrency(selectedEmployee.salary)],
                ["Employment Type", selectedEmployee.employmentType],
                ["Location", selectedEmployee.location],
                ["Gender", selectedEmployee.gender],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg bg-slate-50 p-3"
                >
                  <p className="text-xs text-slate-500">
                    {label}
                  </p>

                  <p className="mt-1 break-words text-sm font-medium text-slate-800">
                    {value || "-"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                variant="secondary"
                onClick={() => setViewOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Employee"
        message={`Are you sure you want to delete ${deleteTarget?.name}? This action cannot be undone.`}
      />
    </div>
  );
}

export default Employees;