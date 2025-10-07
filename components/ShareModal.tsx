import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
);
const TwitterIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
);
const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  title: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareUrl, title }) => {
    const [copyButtonText, setCopyButtonText] = useState('Copy');
    const { showToast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopyButtonText('Copied!');
            showToast('Link copied to clipboard!', 'success');
            setTimeout(() => setCopyButtonText('Copy'), 3000);
        }).catch(() => {
            showToast('Failed to copy link.', 'error');
        });
    };
    
    const encodedUrl = encodeURIComponent(shareUrl);
    const shareText = encodeURIComponent("Check out my wishlist from Western Wear Co.!");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out bg-black bg-opacity-60" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="share-modal-title">
            <div className="relative bg-surface rounded-lg shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 id="share-modal-title" className="text-xl font-serif font-bold">{title}</h2>
                    <button onClick={onClose} className="text-text-secondary hover:text-text-primary" aria-label="Close modal">
                        <CloseIcon />
                    </button>
                </header>
                <div className="p-6 space-y-4">
                    <p className="text-sm text-text-secondary">Share this link with friends and family so they can see what's on your mind.</p>
                    <div className="flex">
                        <input type="text" value={shareUrl} readOnly className="w-full p-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm" aria-label="Shareable link" />
                        <button onClick={handleCopy} className="bg-primary text-white font-semibold px-4 rounded-r-md hover:bg-primary-dark whitespace-nowrap">
                            {copyButtonText}
                        </button>
                    </div>
                    <div className="flex items-center justify-center space-x-4 pt-2">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600" aria-label="Share on Facebook">
                            <FacebookIcon />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400" aria-label="Share on Twitter">
                            <TwitterIcon />
                        </a>
                         <a href={`mailto:?subject=${shareText}&body=Here is my wishlist: ${encodedUrl}`} className="text-gray-500 hover:text-gray-800" aria-label="Share via Email">
                            <EmailIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;