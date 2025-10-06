import React, { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';

const Toggle: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void; label: string }> = ({ enabled, onChange, label }) => (
    <button
        type="button"
        className={`${
        enabled ? 'bg-primary' : 'bg-gray-200'
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
        onClick={() => onChange(!enabled)}
        role="switch"
        aria-checked={enabled}
        aria-label={label}
    >
        <span className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
    </button>
);


const AdminSettingsPage: React.FC = () => {
    const { showToast } = useToast();
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
    const [notifications, setNotifications] = useState({ sales: true, inventory: false, reviews: true });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.new.length < 8) {
            showToast("New password must be at least 8 characters.", "error");
            return;
        }
        if (password.new !== password.confirm) {
            showToast("New passwords do not match.", "error");
            return;
        }
        // In a real app, you would validate the current password and update it.
        showToast("Password updated successfully!", "success");
        setPassword({ current: '', new: '', confirm: '' });
    };

    const handleNotificationToggle = (key: keyof typeof notifications) => {
        setNotifications(prev => {
            const newState = { ...prev, [key]: !prev[key] };
            // Simulate saving the setting
            showToast("Notification settings saved.", "info");
            return newState;
        });
    };

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold text-text-primary mb-6">Admin Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Account Settings */}
                <div className="bg-surface rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Account</h2>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <p className="font-medium">Change Password</p>
                        <div>
                            <label className="block text-sm text-text-secondary">Current Password</label>
                            <input type="password" name="current" value={password.current} onChange={handlePasswordChange} className="mt-1 w-full p-2 border rounded-md" required />
                        </div>
                         <div>
                            <label className="block text-sm text-text-secondary">New Password</label>
                            <input type="password" name="new" value={password.new} onChange={handlePasswordChange} className="mt-1 w-full p-2 border rounded-md" required />
                        </div>
                         <div>
                            <label className="block text-sm text-text-secondary">Confirm New Password</label>
                            <input type="password" name="confirm" value={password.confirm} onChange={handlePasswordChange} className="mt-1 w-full p-2 border rounded-md" required />
                        </div>
                        <div className="text-right">
                             <button type="submit" className="bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Update Password</button>
                        </div>
                    </form>
                </div>

                {/* Notification Settings */}
                <div className="bg-surface rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Notifications</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">New Sales</p>
                                <p className="text-sm text-text-secondary">Get notified for every new order placed.</p>
                            </div>
                            <Toggle enabled={notifications.sales} onChange={() => handleNotificationToggle('sales')} label="New sales notifications" />
                        </div>
                         <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Low Inventory Alerts</p>
                                <p className="text-sm text-text-secondary">Get an alert when a product's stock is low.</p>
                            </div>
                             <Toggle enabled={notifications.inventory} onChange={() => handleNotificationToggle('inventory')} label="Low inventory alerts" />
                        </div>
                         <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">New Customer Reviews</p>
                                <p className="text-sm text-text-secondary">Get notified when a customer leaves a review.</p>
                            </div>
                            <Toggle enabled={notifications.reviews} onChange={() => handleNotificationToggle('reviews')} label="New customer review notifications" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsPage;