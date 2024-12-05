import { createContext, useContext, useState, ReactNode } from 'react';
import { useSocket } from '../hooks/useSocket';

interface AppContextType {
  isConnected: boolean;
  lastMessage: any;
  darkMode: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { isConnected, lastMessage } = useSocket();
  const [darkMode] = useState(false);

  return (
    <AppContext.Provider value={{ isConnected, lastMessage, darkMode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}