import { createContext, useContext, useState } from "react";

// 1. Create the context
const ReactivateContext = createContext();

// 2. Create the provider component
export function ReactivateProvider({ children }) {
  const [reactivate, setReactivate] = useState(false);

  return (
    <ReactivateContext.Provider value={{ reactivate, setReactivate }}>
      {children}
    </ReactivateContext.Provider>
  );
}

// 3. Custom hook to use the context
export function useGlobalContext() {
  const context = useContext(ReactivateContext);
  if (context === undefined) {
    throw new Error("useReactivate must be used within a ReactivateProvider");
  }
  return context;
}
