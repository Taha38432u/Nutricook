// /contexts/SocketContext.js
import { createContext, useContext, useEffect } from "react";
import { socket } from "../services/socket"; // Import your socket.io client instance

// Create context
const SocketContext = createContext();

// Provide socket connection to the rest of your app
export const SocketProvider = ({ children }) => {
  useEffect(() => {
    console.log("Socket connected!");

    return () => {
      socket.off(); // Clean up the listener on unmount
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = () => {
  return useContext(SocketContext);
};
