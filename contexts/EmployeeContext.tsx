import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Employee, AttendanceRecord, EmployeeStatus } from '../types';
import { employees as initialEmployees, attendanceRecords as initialAttendance } from '../data/employees';

interface EmployeeContextType {
  employees: Employee[];
  attendanceRecords: AttendanceRecord[];
  getEmployeeById: (id: string) => Employee | undefined;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (employeeId: string) => void;
  getAttendanceForDate: (date: Date) => (AttendanceRecord & { employeeName: string })[];
  addAttendanceRecord: (record: Omit<AttendanceRecord, 'id'>) => void;
  calculateHoursForPeriod: (employeeId: string, startDate: Date, endDate: Date) => number;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendance);

  const getEmployeeById = (id: string) => {
    return employees.find(e => e.id === id);
  };

  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: `E${Date.now()}`,
    };
    setEmployees(prev => [newEmployee, ...prev]);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev =>
      prev.map(e => (e.id === updatedEmployee.id ? updatedEmployee : e))
    );
  };

  const deleteEmployee = (employeeId: string) => {
    setEmployees(prev => prev.filter(e => e.id !== employeeId));
  };
  
  const getAttendanceForDate = (date: Date): (AttendanceRecord & { employeeName: string })[] => {
    const targetDate = date.toISOString().split('T')[0];
    return attendanceRecords
        .filter(rec => rec.clockIn.startsWith(targetDate))
        .map(rec => {
            const employee = getEmployeeById(rec.employeeId);
            return {
                ...rec,
                employeeName: employee ? employee.name : 'Unknown Employee'
            };
        })
        .sort((a, b) => new Date(a.clockIn).getTime() - new Date(b.clockIn).getTime());
  };

  const addAttendanceRecord = (recordData: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = {
        ...recordData,
        id: `A${Date.now()}`
    };
    setAttendanceRecords(prev => [...prev, newRecord]);
  };

  const calculateHoursForPeriod = (employeeId: string, startDate: Date, endDate: Date): number => {
    const startTimestamp = startDate.getTime();
    // Set endDate to the end of the day
    const endTimestamp = new Date(endDate.setHours(23, 59, 59, 999)).getTime();

    const relevantRecords = attendanceRecords.filter(rec => {
        const clockInTime = new Date(rec.clockIn).getTime();
        return rec.employeeId === employeeId && clockInTime >= startTimestamp && clockInTime <= endTimestamp && rec.clockOut;
    });
    
    const totalMilliseconds = relevantRecords.reduce((total, rec) => {
        if (rec.clockOut) {
            const duration = new Date(rec.clockOut).getTime() - new Date(rec.clockIn).getTime();
            return total + (duration > 0 ? duration : 0);
        }
        return total;
    }, 0);

    return totalMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
  };


  return (
    <EmployeeContext.Provider value={{ employees, attendanceRecords, getEmployeeById, addEmployee, updateEmployee, deleteEmployee, getAttendanceForDate, addAttendanceRecord, calculateHoursForPeriod }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};