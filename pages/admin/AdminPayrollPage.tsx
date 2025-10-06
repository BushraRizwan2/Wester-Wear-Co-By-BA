import React, { useState, useMemo } from 'react';
import { useEmployees } from '../../contexts/EmployeeContext';

const AdminPayrollPage: React.FC = () => {
  const { employees, calculateHoursForPeriod } = useEmployees();
  
  const getLastWeek = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);
    return { start, end };
  };

  const [startDate, setStartDate] = useState(getLastWeek().start);
  const [endDate, setEndDate] = useState(getLastWeek().end);

  const payrollData = useMemo(() => {
    return employees
      .filter(emp => emp.status === 'active')
      .map(employee => {
        const hoursWorked = calculateHoursForPeriod(employee.id, startDate, endDate);
        const totalPay = hoursWorked * employee.hourlyRate;
        return {
          ...employee,
          hoursWorked,
          totalPay,
        };
      });
  }, [employees, startDate, endDate, calculateHoursForPeriod]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(e.target.value));
  };
  
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(e.target.value));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-serif font-bold text-text-primary">Employee Payroll</h1>
        <div className="flex items-center space-x-4 bg-surface p-2 rounded-md border">
            <label htmlFor="start-date" className="text-sm font-medium">From:</label>
            <input 
                type="date"
                id="start-date"
                value={startDate.toISOString().split('T')[0]}
                onChange={handleStartDateChange}
                className="bg-transparent border border-gray-300 rounded-md p-1"
            />
            <label htmlFor="end-date" className="text-sm font-medium">To:</label>
            <input 
                type="date"
                id="end-date"
                value={endDate.toISOString().split('T')[0]}
                onChange={handleEndDateChange}
                className="bg-transparent border border-gray-300 rounded-md p-1"
            />
        </div>
      </div>

      <div className="bg-surface rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-text-secondary">
          <thead className="text-xs text-text-primary uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Employee</th>
              <th scope="col" className="px-6 py-3">Hours Worked</th>
              <th scope="col" className="px-6 py-3">Hourly Rate</th>
              <th scope="col" className="px-6 py-3">Total Pay</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((data) => (
              <tr key={data.id} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-text-primary whitespace-nowrap">
                  {data.name}
                </th>
                <td className="px-6 py-4">{data.hoursWorked.toFixed(2)}</td>
                <td className="px-6 py-4">${data.hourlyRate.toFixed(2)}</td>
                <td className="px-6 py-4 font-semibold text-green-700">${data.totalPay.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {payrollData.length === 0 && (
            <p className="text-center p-8">No active employees found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPayrollPage;