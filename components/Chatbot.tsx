import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '../hooks/useChatbot';

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

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, isLoading, sendMessage } = useChatbot();
    const [userInput, setUserInput] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(userInput);
        setUserInput('');
    };

    return (
        <>
            {/* Chat Window */}
            <div className={`fixed bottom-24 right-4 sm:right-6 md:right-8 w-[90vw] max-w-sm h-[70vh] max-h-[600px] bg-surface rounded-lg shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`} role="dialog" aria-hidden={!isOpen}>
                {/* Header */}
                <header className="flex items-center justify-between p-4 bg-text-primary text-white rounded-t-lg">
                    <h3 className="text-lg font-semibold font-serif">AI Assistant</h3>
                    <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/20" aria-label="Close chat">
                        <CloseIcon />
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-background">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-accent text-white' : 'bg-white text-text-primary shadow-sm'}`}>
                                    {msg.text}
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

                {/* Input Form */}
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
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-4 sm:right-6 md:right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-transform hover:scale-110"
                aria-label="Toggle chat"
                aria-expanded={isOpen}
            >
                <ChatIcon />
            </button>
        </>
    );
};

export default Chatbot;
