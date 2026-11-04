export const initialEmployees = [
  { id: 101, name: 'Olivia Rhye', email: 'olivia@acme.io', role: 'Product Designer', department: 'Design', status: 'Active', type: 'Full-time', joined: '2023-02-14', phone: '+1 202 555 0148', location: 'New York', salary: 92000, avatar: 'https://i.pravatar.cc/100?img=47' },
  { id: 102, name: 'Phoenix Baker', email: 'phoenix@acme.io', role: 'Engineering Lead', department: 'Engineering', status: 'Active', type: 'Full-time', joined: '2022-08-21', phone: '+1 202 555 0182', location: 'Austin', salary: 128000, avatar: 'https://i.pravatar.cc/100?img=12' },
  { id: 103, name: 'Lana Steiner', email: 'lana@acme.io', role: 'People Partner', department: 'People', status: 'On Leave', type: 'Full-time', joined: '2023-06-05', phone: '+1 202 555 0163', location: 'Chicago', salary: 78000, avatar: 'https://i.pravatar.cc/100?img=44' },
  { id: 104, name: 'Demi Wilkinson', email: 'demi@acme.io', role: 'Product Manager', department: 'Product', status: 'Active', type: 'Full-time', joined: '2021-11-18', phone: '+1 202 555 0109', location: 'New York', salary: 112000, avatar: 'https://i.pravatar.cc/100?img=49' },
  { id: 105, name: 'Candice Wu', email: 'candice@acme.io', role: 'UX Researcher', department: 'Design', status: 'Inactive', type: 'Contract', joined: '2024-01-09', phone: '+1 202 555 0193', location: 'Seattle', salary: 69000, avatar: 'https://i.pravatar.cc/100?img=45' },
  { id: 106, name: 'Natali Craig', email: 'natali@acme.io', role: 'Backend Developer', department: 'Engineering', status: 'Active', type: 'Full-time', joined: '2022-04-12', phone: '+1 202 555 0171', location: 'Boston', salary: 105000, avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: 107, name: 'Drew Cano', email: 'drew@acme.io', role: 'Marketing Lead', department: 'Marketing', status: 'Active', type: 'Full-time', joined: '2023-09-25', phone: '+1 202 555 0132', location: 'Denver', salary: 88000, avatar: 'https://i.pravatar.cc/100?img=60' },
  { id: 108, name: 'Orlando Diggs', email: 'orlando@acme.io', role: 'Account Executive', department: 'Sales', status: 'Active', type: 'Full-time', joined: '2024-03-11', phone: '+1 202 555 0118', location: 'Miami', salary: 81000, avatar: 'https://i.pravatar.cc/100?img=13' },
  { id: 109, name: 'Andi Lane', email: 'andi@acme.io', role: 'HR Coordinator', department: 'People', status: 'Active', type: 'Part-time', joined: '2024-05-20', phone: '+1 202 555 0155', location: 'Austin', salary: 54000, avatar: 'https://i.pravatar.cc/100?img=32' },
]

export const initialDepartments = [
  { id: 1, name: 'Engineering', lead: 'Phoenix Baker', color: '#8b7cf6' },
  { id: 2, name: 'Design', lead: 'Olivia Rhye', color: '#f59e0b' },
  { id: 3, name: 'People', lead: 'Lana Steiner', color: '#ec6b9a' },
  { id: 4, name: 'Product', lead: 'Demi Wilkinson', color: '#35b8a5' },
  { id: 5, name: 'Marketing', lead: 'Drew Cano', color: '#4e9cf5' },
  { id: 6, name: 'Sales', lead: 'Orlando Diggs', color: '#f07855' },
]

export const initialLeaves = [
  { id: 1, name: 'Lana Steiner', type: 'Annual leave', from: '2026-11-05', to: '2026-11-08', days: 4, reason: 'Family vacation', status: 'Pending', avatar: 'https://i.pravatar.cc/100?img=44' },
  { id: 2, name: 'Phoenix Baker', type: 'Sick leave', from: '2026-11-02', to: '2026-11-03', days: 2, reason: 'Not feeling well', status: 'Approved', avatar: 'https://i.pravatar.cc/100?img=12' },
  { id: 3, name: 'Demi Wilkinson', type: 'Personal leave', from: '2026-11-12', to: '2026-11-12', days: 1, reason: 'Personal appointment', status: 'Pending', avatar: 'https://i.pravatar.cc/100?img=49' },
  { id: 4, name: 'Natali Craig', type: 'Annual leave', from: '2026-10-28', to: '2026-10-30', days: 3, reason: 'Travel plans', status: 'Rejected', avatar: 'https://i.pravatar.cc/100?img=5' },
]

export const attendanceData = [
  { day: 'Mon', present: 88, absent: 7, late: 5 },
  { day: 'Tue', present: 92, absent: 4, late: 4 },
  { day: 'Wed', present: 85, absent: 9, late: 6 },
  { day: 'Thu', present: 95, absent: 3, late: 2 },
  { day: 'Fri', present: 90, absent: 6, late: 4 },
  { day: 'Sat', present: 30, absent: 65, late: 5 },
  { day: 'Sun', present: 12, absent: 83, late: 5 },
]
