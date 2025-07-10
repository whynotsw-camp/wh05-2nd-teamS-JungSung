import { createContext, useRef, ReactNode, RefObject } from 'react';

interface PrintRefContextType {
  printRef: RefObject<HTMLDivElement | null>;
}

export const PrintRefContext = createContext<PrintRefContextType | undefined>(undefined);

export const PrintRefProvider = ({ children }: { children: ReactNode }) => {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <PrintRefContext.Provider value={{ printRef }}>
      {children}
    </PrintRefContext.Provider>
  );
};
