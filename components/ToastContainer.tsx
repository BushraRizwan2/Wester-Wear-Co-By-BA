import React from 'react';
import { useInternalToast } from '../contexts/ToastContext';
import type { Toast } from '../types';

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const InfoIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const icons = {
    success: <CheckCircleIcon />,
    error: <XCircleIcon />,
    info: <InfoIcon />,
};

const ToastMessage: React.FC<{ toast: Toast & { exiting?: boolean }, onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
    const animationClasses = toast.exiting 
        ? 'opacity-0 translate-y-2' 
        : 'opacity-100 translate-y-0';

    return (
        <div 
            className={`flex items-start p-4 w-full max-w-sm bg-surface rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out transform ${animationClasses}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="flex-shrink-0">
                {icons[toast.type]}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-text-primary">{toast.message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
                <button
                    onClick={() => onRemove(toast.id)}
                    className="inline-flex text-text-secondary rounded-md hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    <span className="sr-only">Close</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};


const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useInternalToast();

    return (
        <div 
            aria-live="polite" 
            className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
        >
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                {toasts.map(toast => (
                    <ToastMessage key={toast.id} toast={toast} onRemove={removeToast} />
                ))}
            </div>
        </div>
    );
};

export default ToastContainer;
