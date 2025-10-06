import React, { useState, useEffect } from 'react';
import { Employee, EmployeeStatus } from '../../types';
import { useEmployees } from '../../contexts/EmployeeContext';
import { useToast } from '../../contexts/ToastContext';

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const initialFormState: Omit<Employee, 'id'> = {
  name: '',
  email: '',
  position: '',
  startDate: new Date().toISOString().split('T')[0],
  status: 'active' as EmployeeStatus,
  hourlyRate: 0,
};

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ isOpen, onClose, employee }) => {
  const { addEmployee, updateEmployee } = useEmployees();
  const { showToast } = useToast();
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (employee) {
      setFormState({
        ...employee,
        startDate: new Date(employee.startDate).toISOString().split('T')[0], // Format for date input
      });
    } else {
      setFormState(initialFormState);
    }
  }, [employee, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employeeData = {
      ...formState,
      hourlyRate: parseFloat(String(formState.hourlyRate)),
      startDate: new Date(formState.startDate).toISOString(), // Convert back to ISO string for storage
    };

    if (employee) {
      updateEmployee({ ...employee, ...employeeData });
      showToast('Employee updated successfully!', 'success');
    } else {
      addEmployee(employeeData);
      showToast('Employee added successfully!', 'success');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-10" role="dialog" aria-modal="true">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-2xl font-serif font-bold mb-4">{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                    <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input type="email" name="email" id="email" value={formState.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required />
                </div>
                <div>
                    <label htmlFor="position" className="block text-sm font-medium">Position / Role</label>
                    <input type="text" name="position" id="position" value={formState.position} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required />
                </div>
                <div>
                    <label htmlFor="hourlyRate" className="block text-sm font-medium">Hourly Rate ($)</label>
                    <input type="number" name="hourlyRate" id="hourlyRate" step="0.01" value={formState.hourlyRate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium">Start Date</label>
                        <input type="date" name="startDate" id="startDate" value={formState.startDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium">Status</label>
                        <select name="status" id="status" value={formState.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                            <option value="active">Active</option>
                            <option value="on-leave">On Leave</option>
                            <option value="terminated">Terminated</option>
                        </select>
                    </div>
                </div>
            </div>

          </div>
          
          <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark">
              {employee ? 'Save Changes' : 'Create Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;