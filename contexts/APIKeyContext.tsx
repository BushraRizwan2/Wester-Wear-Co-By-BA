import React, { createContext, useContext, useState, ReactNode } from 'react';

interface APIKeyContextType {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
}

const APIKeyContext = createContext<APIKeyContextType | undefined>(undefined);

const API_KEY_STORAGE_KEY = 'gemini_api_key';

export const APIKeyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState<string | null>(() => {
    try {
      return localStorage.getItem(API_KEY_STORAGE_KEY);
    } catch (e) {
      console.error("Could not access localStorage", e);
      return null;
    }
  });

  const setApiKey = (key: string | null) => {
    setApiKeyState(key);
    try {
        if (key) {
            localStorage.setItem(API_KEY_STORAGE_KEY, key);
        } else {
            localStorage.removeItem(API_KEY_STORAGE_KEY);
        }
    } catch (e) {
        console.error("Could not access localStorage", e);
    }
  };

  return (
    <APIKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </APIKeyContext.Provider>
  );
};

export const useAPIKey = (): APIKeyContextType => {
  const context = useContext(APIKeyContext);
  if (context === undefined) {
    throw new Error('useAPIKey must be used within an APIKeyProvider');
  }
  return context;
};
