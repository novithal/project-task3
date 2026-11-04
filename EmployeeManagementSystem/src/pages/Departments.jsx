import { useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Building2,
  Users,
  MapPin,
} from "lucide-react";

import { useHR } from "../context/HRContext";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Avatar from "../components/common/Avatar";

function Departments() {
  const {
    departments,
    employees,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useHR();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    name: "",
    head: "",
    location: "",
    description: "",
  });

  const [error, setError] = useState("");

  const openAddModal = () => {
    setEditingDepartment(null);

    setForm({
      name: "",
      head: "",
      location: "",
      description: "",
    });

    setError("");
    setModalOpen(true);
  };

  const openEditModal = (department) => {
    setEditingDepartment(department);
    setForm({ ...department });
    setError("");
    setModalOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.head.trim() ||
      !form.location.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const duplicate = departments.some(
      (department) =>
        department.name.toLowerCase() ===
          form.name.trim().toLowerCase() &&
        department.id !== editingDepartment?.id
    );

    if (duplicate) {
      setError("Department already exists.");
      return;
    }

    if (editingDepartment) {
      updateDepartment(editingDepartment.id, form);
    } else {
      addDepartment(form);
    }

    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    const hasEmployees = employees.some(
      (employee) =>
        employee.department === deleteTarget.name
    );

    if (hasEmployees) {
      window.alert(
        "This department has employees. Reassign them before deleting."
      );
      setDeleteTarget(null);
      return;
    }

    deleteDepartment(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div>
      <PageHeader
        title="Departments"
        description="Manage your organization's departments."
        action={
          <Button icon={Plus} onClick={openAddModal}>
            Add Department
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <Building2 className="text-indigo-600" size={24} />
          <p className="mt-3 text-sm text-slate-500">
            Total Departments
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            {departments.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <Users className="text-emerald-600" size={24} />
          <p className="mt-3 text-sm text-slate-500">
            Total Employees
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            {employees.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <MapPin className="text-amber-600" size={24} />
          <p className="mt-3 text-sm text-slate-500">
            Office Locations
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            {new Set(departments.map(d => d.location)).size}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {departments.map((department) => {
          const employeeCount = employees.filter(
            (employee) =>
              employee.department === department.name
          ).length;

          return (
            <div
              key={department.id}
              className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                  <Building2 size={24} />
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(department)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                    title="Edit department"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    onClick={() => setDeleteTarget(department)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    title="Delete department"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {department.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {department.description || "No description"}
              </p>

              <div className="mt-5 flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                  <Avatar name={department.head} size="sm" />

                  <div>
                    <p className="text-xs text-slate-400">
                      Department Head
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      {department.head}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">
                    Employees
                  </p>
                  <p className="text-lg font-bold text-indigo-600">
                    {employeeCount}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={14} />
                {department.location}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          editingDepartment
            ? "Edit Department"
            : "Add Department"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Department Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Enter department name"
          />

          <Input
            label="Department Head"
            value={form.head}
            onChange={(e) =>
              setForm({ ...form, head: e.target.value })
            }
            placeholder="Enter department head"
          />

          <Input
            label="Location"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
            placeholder="Enter location"
          />

          <Input
            label="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            placeholder="Department description"
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              {editingDepartment ? "Save Changes" : "Add Department"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Department"
        message={`Are you sure you want to delete ${deleteTarget?.name}?`}
      />
    </div>
  );
}

export default Departments;