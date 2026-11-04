export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

export const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getInitials = (name = "") => {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

export const getEmployeeStatus = (employees, status) => {
  return employees.filter(
    (employee) => employee.status === status
  ).length;
};

export const generateEmployeeId = (employees) => {
  const highestId = employees.reduce((max, employee) => {
    const number = Number(
      employee.employeeId?.replace("EMP", "") || 0
    );

    return Math.max(max, number);
  }, 0);

  return `EMP${String(highestId + 1).padStart(3, "0")}`;
};

export const getDepartmentCount = (employees, department) => {
  return employees.filter(
    (employee) => employee.department === department
  ).length;
};