import React, { useState } from 'react';
import { useEmployees } from '../../contexts/EmployeeContext';
import { Employee, EmployeeStatus } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import EmployeeFormModal from '../../components/admin/EmployeeFormModal';

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);
const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const statusStyles: Record<EmployeeStatus, string> = {
    active: 'bg-green-100 text-green-800',
    'on-leave': 'bg-yellow-100 text-yellow-800',
    terminated: 'bg-red-100 text-red-800',
};

const AdminEmployeesPage: React.FC = () => {
  const { employees, deleteEmployee } = useEmployees();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const { showToast } = useToast();

  const handleOpenModal = (employee: Employee | null = null) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(false);
  };

  const handleDelete = (employeeId: string) => {
    if (window.confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      deleteEmployee(employeeId);
      showToast('Employee record deleted.', 'success');
    }
  };
  
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-text-primary">Manage Employees</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
        >
          Add Employee
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-text-secondary">
          <thead className="text-xs text-text-primary uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Employee Name</th>
              <th scope="col" className="px-6 py-3">Position</th>
              <th scope="col" className="px-6 py-3">Start Date</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-text-primary whitespace-nowrap">
                  {employee.name}
                  <p className="font-normal text-xs text-text-secondary">{employee.email}</p>
                </th>
                <td className="px-6 py-4">{employee.position}</td>
                <td className="px-6 py-4">{formatDate(employee.startDate)}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[employee.status]}`}>
                        {employee.status.replace('-', ' ')}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleOpenModal(employee)}
                      className="p-2 text-accent hover:text-blue-800"
                      aria-label={`Edit ${employee.name}`}
                    >
                      <PencilIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="p-2 text-red-500 hover:text-red-700"
                      aria-label={`Delete ${employee.name}`}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {employees.length === 0 && (
            <p className="text-center p-8">No employees found. Add one to get started!</p>
        )}
      </div>

      {isModalOpen && (
        <EmployeeFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          employee={editingEmployee}
        />
      )}
    </div>
  );
};

export default AdminEmployeesPage;
