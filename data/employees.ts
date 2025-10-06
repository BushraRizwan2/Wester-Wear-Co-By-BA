import type { Employee, AttendanceRecord } from '../types';

export const employees: Employee[] = [
  {
    id: 'E001',
    name: 'Alice Johnson',
    email: 'alice.j@westernwear.co',
    position: 'Store Manager',
    startDate: '2021-08-15T00:00:00Z',
    status: 'active',
    hourlyRate: 25.50,
  },
  {
    id: 'E002',
    name: 'Bob Williams',
    email: 'bob.w@westernwear.co',
    position: 'Sales Associate',
    startDate: '2022-03-01T00:00:00Z',
    status: 'active',
    hourlyRate: 18.00,
  },
  {
    id: 'E003',
    name: 'Charlie Brown',
    email: 'charlie.b@westernwear.co',
    position: 'Inventory Specialist',
    startDate: '2022-09-20T00:00:00Z',
    status: 'on-leave',
    hourlyRate: 20.00,
  },
   {
    id: 'E004',
    name: 'Diana Prince',
    email: 'diana.p@westernwear.co',
    position: 'Sales Associate',
    startDate: '2023-01-10T00:00:00Z',
    status: 'active',
    hourlyRate: 18.50,
  },
];

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const toISODate = (date: Date) => date.toISOString().split('T')[0];

export const attendanceRecords: AttendanceRecord[] = [
  // Today's records
  {
    id: 'A001',
    employeeId: 'E001',
    clockIn: `${toISODate(today)}T09:01:32Z`,
    clockOut: `${toISODate(today)}T17:05:11Z`,
  },
  {
    id: 'A002',
    employeeId: 'E002',
    clockIn: `${toISODate(today)}T09:05:02Z`,
    clockOut: null, // Still clocked in
  },
   {
    id: 'A003',
    employeeId: 'E004',
    clockIn: `${toISODate(today)}T11:58:45Z`,
    clockOut: `${toISODate(today)}T15:30:00Z`,
  },
  // Yesterday's records
  {
    id: 'A004',
    employeeId: 'E001',
    clockIn: `${toISODate(yesterday)}T08:59:15Z`,
    clockOut: `${toISODate(yesterday)}T17:01:20Z`,
  },
   {
    id: 'A005',
    employeeId: 'E002',
    clockIn: `${toISODate(yesterday)}T09:03:40Z`,
    clockOut: `${toISODate(yesterday)}T17:08:55Z`,
  },
   {
    id: 'A006',
    employeeId: 'E004',
    clockIn: `${toISODate(yesterday)}T12:05:00Z`,
    clockOut: `${toISODate(yesterday)}T20:00:10Z`,
  },
];