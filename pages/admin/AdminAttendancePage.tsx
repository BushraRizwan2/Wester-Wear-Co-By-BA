import React, { useState, useMemo } from 'react';
import { useEmployees } from '../../contexts/EmployeeContext';
import AttendanceFormModal from '../../components/admin/AttendanceFormModal';
import { AttendanceRecord } from '../../types';

const AdminAttendancePage: React.FC = () => {
  const { getAttendanceForDate } = useEmployees();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const attendanceForDay = useMemo(() => getAttendanceForDate(selectedDate), [selectedDate, getAttendanceForDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    // Adjust for timezone offset
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    setSelectedDate(new Date(date.getTime() + userTimezoneOffset));
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const calculateDuration = (record: AttendanceRecord): string => {
    if (!record.clockOut) return 'Clocked In';
    const start = new Date(record.clockIn);
    const end = new Date(record.clockOut);
    const diffMs = end.getTime() - start.getTime();
    if (diffMs < 0) return 'Invalid';

    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-serif font-bold text-text-primary">Attendance Log</h1>
        <div className="flex items-center space-x-4">
            <input 
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                className="bg-surface border border-gray-300 rounded-md p-2"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300"
            >
              Manual Entry
            </button>
        </div>
      </div>

      <div className="bg-surface rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-text-secondary">
          <thead className="text-xs text-text-primary uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Employee</th>
              <th scope="col" className="px-6 py-3">Clock In</th>
              <th scope="col" className="px-6 py-3">Clock Out</th>
              <th scope="col" className="px-6 py-3">Duration</th>
            </tr>
          </thead>
          <tbody>
            {attendanceForDay.map((record) => (
              <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-text-primary whitespace-nowrap">
                  {record.employeeName}
                </th>
                <td className="px-6 py-4">{formatTime(record.clockIn)}</td>
                <td className="px-6 py-4">{formatTime(record.clockOut)}</td>
                <td className="px-6 py-4">{calculateDuration(record)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {attendanceForDay.length === 0 && (
            <p className="text-center p-8">No attendance records for this date.</p>
        )}
      </div>
      
      {isModalOpen && (
        <AttendanceFormModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default AdminAttendancePage;
