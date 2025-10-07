import React, { useState, useMemo } from 'react';
import { useEmployees } from '../../contexts/EmployeeContext';
import AttendanceFormModal from '../../components/admin/AttendanceFormModal';
import { AttendanceRecord } from '../../types';

const AdminAttendancePage: React.FC = () => {
  const { getAttendanceForDate, getAttendanceForMonth } = useEmployees();
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const attendanceData = useMemo(() => {
    if (viewMode === 'monthly') {
        const [year, month] = selectedMonth.split('-').map(Number);
        return getAttendanceForMonth(year, month - 1);
    }
    return getAttendanceForDate(selectedDate);
  }, [selectedDate, selectedMonth, viewMode, getAttendanceForDate, getAttendanceForMonth]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    // Adjust for timezone offset
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    setSelectedDate(new Date(date.getTime() + userTimezoneOffset));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(e.target.value);
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
  
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
            <div className="flex space-x-1 bg-gray-200 p-1 rounded-md">
                <button 
                    onClick={() => setViewMode('daily')}
                    className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${viewMode === 'daily' ? 'bg-white shadow' : 'text-text-secondary hover:bg-gray-300'}`}
                >
                    Daily
                </button>
                <button 
                    onClick={() => setViewMode('monthly')}
                    className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${viewMode === 'monthly' ? 'bg-white shadow' : 'text-text-secondary hover:bg-gray-300'}`}
                >
                    Monthly
                </button>
            </div>
            
            {viewMode === 'daily' ? (
                 <input 
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                    className="bg-surface border border-gray-300 rounded-md p-2"
                />
            ) : (
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="bg-surface border border-gray-300 rounded-md p-2"
                />
            )}
           
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
              {viewMode === 'monthly' && <th scope="col" className="px-6 py-3">Date</th>}
              <th scope="col" className="px-6 py-3">Employee</th>
              <th scope="col" className="px-6 py-3">Clock In</th>
              <th scope="col" className="px-6 py-3">Clock Out</th>
              <th scope="col" className="px-6 py-3">Duration</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record) => (
              <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                {viewMode === 'monthly' && <td className="px-6 py-4">{formatDate(record.clockIn)}</td>}
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
        {attendanceData.length === 0 && (
            <p className="text-center p-8">No attendance records for this period.</p>
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