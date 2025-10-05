
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useChatbot } from '../hooks/useChatbot';
import { useAPIKey } from '../contexts/APIKeyContext';

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.08-3.242A8.88 8.88 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.79 14.242a7.025 7.025 0 002.321.938 7.025 7.025 0 004.887 0 7.025 7.025 0 002.321-.938l.002-.001.002-.001a5.002 5.002 0 01-1.22-.888 3 3 0 00-3.79 0 5.002 5.002 0 01-1.22.888zM10 12a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
);
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);
const CogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, isLoading, sendMessage } = useChatbot();
    const [userInput, setUserInput] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const { apiKey, setApiKey } = useAPIKey();
    const [showKeyForm, setShowKeyForm] = useState(false);
    const [tempApiKey, setTempApiKey] = useState(apiKey || '');

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            setShowKeyForm(!apiKey);
        }
    }, [isOpen, apiKey]);
    
    useEffect(() => {
        setTempApiKey(apiKey || '');
    }, [apiKey]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(userInput);
        setUserInput('');
    };
    
    const handleKeySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(tempApiKey.trim()) {
            setApiKey(tempApiKey.trim());
            setShowKeyForm(false);
        }
    }

    const APIKeyForm = (
        <div className="flex-1 p-4 overflow-y-auto bg-background flex flex-col justify-center">
            <h4 className="text-lg font-semibold text-center mb-2">Gemini API Key Required</h4>
            <p className="text-sm text-text-secondary text-center mb-4">
                To use the AI Assistant, please enter your Google Gemini API Key. Your key is stored only in your browser's local storage and is not sent to our servers.
            </p>
            <form onSubmit={handleKeySubmit} className="space-y-3">
                <input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    placeholder="Enter your API Key"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    aria-label="Gemini API Key input"
                />
                <button type="submit" className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark disabled:bg-gray-400" disabled={!tempApiKey.trim()}>
                    Save Key
                </button>
                 {apiKey && (
                    <button type="button" onClick={() => setShowKeyForm(false)} className="w-full text-center text-sm text-text-secondary hover:underline mt-2">
                        Cancel
                    </button>
                 )}
            </form>
        </div>
    );

    const ChatInterface = (
        <>
            <div className="flex-1 p-4 overflow-y-auto bg-background">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-accent text-white' : 'bg-white text-text-primary shadow-sm'}`}>
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                {msg.products && msg.products.length > 0 && (
                                    <div className="mt-3 space-y-2 border-t border-gray-200 pt-3">
                                        {msg.products.map(product => (
                                            <div key={product.id} className="flex items-start gap-3">
                                                <img src={product.imageUrls[0]} alt={product.name} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-sm text-text-primary truncate">{product.name}</p>
                                                    <p className="text-sm text-primary font-bold">${product.price.toFixed(2)}</p>
                                                </div>
                                                <Link
                                                    to={`/product/${product.id}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="self-center bg-gray-100 text-text-secondary text-xs font-bold py-1.5 px-3 rounded-full hover:bg-gray-200 hover:text-text-primary transition-colors flex-shrink-0"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {msg.isApiKeyError && (
                                    <button 
                                        onClick={() => setShowKeyForm(true)} 
                                        className="mt-3 w-full text-left bg-amber-100 text-amber-800 font-semibold py-2 px-3 rounded-md hover:bg-amber-200 transition-colors text-sm"
                                    >
                                        Update API Key
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start">
                            <div className="max-w-[80%] p-3 rounded-xl bg-white text-text-primary shadow-sm flex items-center space-x-2">
                                <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-lg">
                <div className="flex items-center">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask about our products..."
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-primary focus:border-primary"
                        aria-label="Chat input"
                        disabled={isLoading}
                    />
                    <button type="submit" className="bg-primary text-white p-2 rounded-r-md hover:bg-primary-dark disabled:bg-gray-400" disabled={isLoading || !userInput.trim()} aria-label="Send message">
                        <SendIcon />
                    </button>
                </div>
            </form>
        </>
    );

    return (
        <>
            {/* Chat Window */}
            <div className={`fixed bottom-24 right-4 sm:right-6 md:right-8 w-[90vw] max-w-sm h-[70vh] max-h-[600px] bg-surface rounded-lg shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`} role="dialog" aria-hidden={!isOpen}>
                <header className="flex items-center justify-between p-4 bg-text-primary text-white rounded-t-lg">
                    <h3 className="text-lg font-semibold font-serif">AI Assistant</h3>
                     <div className="flex items-center space-x-2">
                         {apiKey && (
                            <button onClick={() => setShowKeyForm(true)} className="p-1 rounded-full hover:bg-white/20" aria-label="Chat settings">
                                <CogIcon />
                            </button>
                         )}
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/20" aria-label="Close chat">
                            <CloseIcon />
                        </button>
                    </div>
                </header>

                {showKeyForm ? APIKeyForm : ChatInterface}
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-4 sm:right-6 md:right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-transform hover:scale-110 z-50"
                aria-label="Toggle chat"
                aria-expanded={isOpen}
            >
                <ChatIcon />
            </button>
        </>
    );
};

export default Chatbot;