import React, { createContext, useRef, ReactNode, RefObject } from 'react';

interface PrintRefContextType {
  printRef: RefObject<HTMLDivElement | null>;
}

export const PrintRefContext = createContext<PrintRefContextType | undefined>(undefined);

interface PrintRefProviderProps {
  children: ReactNode;
}

export const PrintRefProvider: React.FC<PrintRefProviderProps> = ({ children }) => {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <PrintRefContext.Provider value={{ printRef }}>
      {children}
    </PrintRefContext.Provider>
  );
};
