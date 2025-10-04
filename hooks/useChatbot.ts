import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { products as allProducts } from '../data/products';
import type { ChatMessage } from '../types';

// Create a simplified version of the product data for the AI context
const productContext = JSON.stringify(allProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    description: p.description,
    category: p.category,
})));

// System instruction to prime the Gemini model
const SYSTEM_INSTRUCTION = `You are a friendly and helpful shopping assistant for 'Western Wear Co.', an e-commerce store specializing in western-style clothing. Your goal is to help users find products, answer their questions, compare items, and make recommendations based on their needs.

You have access to the store's entire product catalog in JSON format below. Use this information EXCLUSIVELY to answer user questions. Do not invent products or details. If a user asks about something not in the catalog, politely inform them it's not available and suggest alternatives from the catalog.

Keep your responses concise, helpful, and formatted for easy readability in a chat window. When you recommend a product, mention its name and price.

Product Catalog:
${productContext}`;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const useChatbot = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'bot', text: "Hello! I'm your AI shopping assistant. How can I help you find the perfect western wear today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    // FIX: Use a ref to store the chat session object to maintain conversation history.
    const chat = useRef<Chat | null>(null);

    // FIX: Initialize the chat session once when the component mounts.
    // This ensures the conversation context is preserved across messages.
    useEffect(() => {
        chat.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
        });
    }, []);

    const sendMessage = async (userInput: string) => {
        if (!userInput.trim()) return;

        const userMessage: ChatMessage = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // FIX: Check if chat session is initialized before sending a message.
            if (!chat.current) {
                throw new Error("Chat session not initialized.");
            }
            // FIX: Use the chat.sendMessage method to leverage the model's conversational memory.
            const response = await chat.current.sendMessage({ message: userInput });

            const botMessage: ChatMessage = { sender: 'bot', text: response.text };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage: ChatMessage = { sender: 'bot', text: "Sorry, I'm having a little trouble right now. Please try again in a moment." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, isLoading, sendMessage };
};
