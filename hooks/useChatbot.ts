
import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, FunctionDeclaration, Type } from '@google/genai';
import type { ChatMessage, Product } from '../types';
import { useProducts } from '../contexts/ProductContext';
import { useAPIKey } from '../contexts/APIKeyContext';

const productSearchTool: FunctionDeclaration = {
  name: 'productSearch',
  parameters: {
    type: Type.OBJECT,
    description: 'Searches for products in the store catalog based on a user query.',
    properties: {
      query: {
        type: Type.STRING,
        description: 'The user\'s search term, like "denim jacket" or "summer dress".',
      },
    },
    required: ['query'],
  },
};

export const useChatbot = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'bot', text: "Hello! I'm your AI shopping assistant. How can I help you find the perfect western wear today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const chat = useRef<Chat | null>(null);
    const { products: allProducts } = useProducts();
    const { apiKey } = useAPIKey();

    useEffect(() => {
        if (!apiKey) {
            chat.current = null;
            return;
        }

        const ai = new GoogleGenAI({ apiKey });
        const productContext = JSON.stringify(allProducts.map(p => ({
            id: p.id, name: p.name, price: p.price, description: p.description, category: p.category,
        })));

        const SYSTEM_INSTRUCTION = `You are a friendly and helpful shopping assistant for 'Western Wear Co.', an e-commerce store specializing in western-style clothing. Your goal is to help users find products, answer their questions, compare items, and make recommendations.

        You have access to a 'productSearch' tool to find specific items in the catalog. Use this tool whenever a user asks to find, search for, or look for a product. For example, if the user says 'I'm looking for a warm jacket', call the 'productSearch' tool with the query 'warm jacket'.

        You also have access to the store's entire product catalog in JSON format below. Use this information to answer questions when a specific search is not required. Do not invent products or details. If a user asks about something not in the catalog, politely inform them it's not available and suggest alternatives.

        Keep your responses concise, helpful, and formatted for easy readability in a chat window.

        Product Catalog:
        ${productContext}`;

        chat.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                tools: [{ functionDeclarations: [productSearchTool] }],
            },
        });
        
    }, [allProducts, apiKey]);
    
    const performLocalSearch = (query: string): Product[] => {
        const sanitizedQuery = query.trim().toLowerCase();
        if (!sanitizedQuery) return [];
        return allProducts.filter(product => 
            product.name.toLowerCase().includes(sanitizedQuery) ||
            product.description.toLowerCase().includes(sanitizedQuery) ||
            product.category.toLowerCase().includes(sanitizedQuery)
        );
    };

    const sendMessage = async (userInput: string) => {
        if (!userInput.trim()) return;

        const userMessage: ChatMessage = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            if (!chat.current) {
                throw new Error("Chat session not initialized. Please set your API key.");
            }
            const response = await chat.current.sendMessage({ message: userInput });

            if (response.functionCalls && response.functionCalls[0]?.name === 'productSearch') {
                const functionCall = response.functionCalls[0];
                const query = functionCall.args.query as string;
                
                const searchResults = performLocalSearch(query);

                const toolResponse = {
                    functionResponses: {
                        id: functionCall.id,
                        name: functionCall.name,
                        response: { 
                            result: JSON.stringify(searchResults.map(p => ({ name: p.name, price: p.price, category: p.category })))
                        }
                    }
                };
                
                const finalResponse = await chat.current.sendMessage(toolResponse);

                const finalBotMessage: ChatMessage = { 
                    sender: 'bot', 
                    text: finalResponse.text,
                    products: searchResults.slice(0, 4) // Show up to 4 products
                };
                setMessages(prev => [...prev, finalBotMessage]);

            } else {
                const botMessage: ChatMessage = { sender: 'bot', text: response.text };
                setMessages(prev => [...prev, botMessage]);
            }

        } catch (error) {
            console.error("Gemini API error:", error);
            let errorMessage: ChatMessage;

            if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('Chat session not initialized'))) {
                errorMessage = { 
                    sender: 'bot', 
                    text: "It looks like there's an issue with your API key. Please update it to continue the conversation.",
                    isApiKeyError: true 
                };
            } else {
                errorMessage = { 
                    sender: 'bot', 
                    text: "Sorry, I'm having a little trouble right now. Please try again in a moment." 
                };
            }
    
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, isLoading, sendMessage };
};