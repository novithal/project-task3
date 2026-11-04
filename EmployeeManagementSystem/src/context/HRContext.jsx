import {
  createContext,
  useContext,
  useState,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

import {
  initialEmployees,
  initialDepartments,
  initialLeaves,
  initialAttendance,
} from "../data/dummyData";

const HRContext = createContext();

export const HRProvider = ({ children }) => {
  const [employees, setEmployees] = useLocalStorage(
    "nexhr_employees",
    initialEmployees
  );

  const [departments, setDepartments] = useLocalStorage(
    "nexhr_departments",
    initialDepartments
  );

  const [leaves, setLeaves] = useLocalStorage(
    "nexhr_leaves",
    initialLeaves
  );

  const [attendance, setAttendance] = useLocalStorage(
    "nexhr_attendance",
    initialAttendance
  );

  const [theme, setTheme] = useLocalStorage(
    "nexhr_theme",
    "light"
  );

  const [admin, setAdmin] = useLocalStorage(
    "nexhr_admin",
    {
      name: "Admin User",
      email: "admin@nexhr.com",
      role: "Administrator",
    }
  );

  const [toast, setToast] = useState(null);

  // Employee CRUD

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now(),
    };

    setEmployees((previous) => [
      ...previous,
      newEmployee,
    ]);

    showToast("Employee added successfully", "success");
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees((previous) =>
      previous.map((employee) =>
        employee.id === id
          ? { ...employee, ...updatedData }
          : employee
      )
    );

    showToast("Employee updated successfully", "success");
  };

  const deleteEmployee = (id) => {
    setEmployees((previous) =>
      previous.filter((employee) => employee.id !== id)
    );

    showToast("Employee deleted successfully", "success");
  };

  // Department CRUD

  const addDepartment = (department) => {
    setDepartments((previous) => [
      ...previous,
      {
        ...department,
        id: Date.now(),
      },
    ]);

    showToast("Department added successfully", "success");
  };

  const updateDepartment = (id, updatedData) => {
    setDepartments((previous) =>
      previous.map((department) =>
        department.id === id
          ? { ...department, ...updatedData }
          : department
      )
    );

    showToast("Department updated successfully", "success");
  };

  const deleteDepartment = (id) => {
    setDepartments((previous) =>
      previous.filter((department) => department.id !== id)
    );

    showToast("Department deleted successfully", "success");
  };

  // Leave management

  const addLeave = (leave) => {
    setLeaves((previous) => [
      ...previous,
      {
        ...leave,
        id: Date.now(),
      },
    ]);

    showToast("Leave request submitted", "success");
  };

  const updateLeaveStatus = (id, status) => {
    setLeaves((previous) =>
      previous.map((leave) =>
        leave.id === id
          ? { ...leave, status }
          : leave
      )
    );

    showToast(`Leave ${status.toLowerCase()}`, "success");
  };

  // Attendance management

  const updateAttendance = (id, updatedData) => {
    setAttendance((previous) =>
      previous.map((record) =>
        record.id === id
          ? { ...record, ...updatedData }
          : record
      )
    );

    showToast("Attendance updated successfully", "success");
  };

  const addAttendance = (record) => {
    setAttendance((previous) => [
      ...previous,
      {
        ...record,
        id: Date.now(),
      },
    ]);

    showToast("Attendance added successfully", "success");
  };

  // Theme management

  const toggleTheme = () => {
    setTheme((previous) =>
      previous === "light" ? "dark" : "light"
    );
  };

  // Toast notifications

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
      id: Date.now(),
    });
  };

  const hideToast = () => {
    setToast(null);
  };

  const value = {
    employees,
    departments,
    leaves,
    attendance,
    theme,
    admin,
    toast,

    setEmployees,
    setDepartments,
    setLeaves,
    setAttendance,
    setAdmin,

    addEmployee,
    updateEmployee,
    deleteEmployee,

    addDepartment,
    updateDepartment,
    deleteDepartment,

    addLeave,
    updateLeaveStatus,

    addAttendance,
    updateAttendance,

    toggleTheme,
    showToast,
    hideToast,
  };

  return (
    <HRContext.Provider value={value}>
      {children}
    </HRContext.Provider>
  );
};

export const useHR = () => {
  const context = useContext(HRContext);

  if (!context) {
    throw new Error(
      "useHR must be used inside HRProvider"
    );
  }

  return context;
};