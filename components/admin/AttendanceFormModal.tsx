import React, { useState, useEffect } from 'react';
import { useEmployees } from '../../contexts/EmployeeContext';
import { useToast } from '../../contexts/ToastContext';

interface AttendanceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
}

const AttendanceFormModal: React.FC<AttendanceFormModalProps> = ({ isOpen, onClose, selectedDate }) => {
  const { employees, addAttendanceRecord } = useEmployees();
  const { showToast } = useToast();
  
  const [employeeId, setEmployeeId] = useState('');
  const [clockInTime, setClockInTime] = useState('');
  const [clockOutTime, setClockOutTime] = useState('');

  useEffect(() => {
    if (employees.length > 0) {
        setEmployeeId(employees[0].id);
    }
  }, [employees]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !clockInTime) {
        showToast('Please select an employee and provide a clock-in time.', 'error');
        return;
    }

    const datePart = selectedDate.toISOString().split('T')[0];
    const clockInISO = new Date(`${datePart}T${clockInTime}`).toISOString();
    const clockOutISO = clockOutTime ? new Date(`${datePart}T${clockOutTime}`).toISOString() : null;

    addAttendanceRecord({
        employeeId,
        clockIn: clockInISO,
        clockOut: clockOutISO,
    });

    showToast('Attendance record added successfully.', 'success');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" role="dialog" aria-modal="true">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-2xl font-serif font-bold mb-4">Manual Attendance Entry</h2>
            <p className="mb-4 text-sm text-text-secondary">
              Date: <strong>{selectedDate.toLocaleDateString()}</strong>
            </p>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="employeeId" className="block text-sm font-medium">Employee</label>
                    <select 
                        name="employeeId" 
                        id="employeeId" 
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white"
                        required
                    >
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="clockInTime" className="block text-sm font-medium">Clock In Time</label>
                        <input 
                            type="time" 
                            name="clockInTime" 
                            id="clockInTime" 
                            value={clockInTime}
                            onChange={(e) => setClockInTime(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="clockOutTime" className="block text-sm font-medium">Clock Out Time</label>
                         <input 
                            type="time" 
                            name="clockOutTime" 
                            id="clockOutTime" 
                            value={clockOutTime}
                            onChange={(e) => setClockOutTime(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" 
                        />
                    </div>
                </div>
            </div>

          </div>
          
          <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark">
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceFormModal;
