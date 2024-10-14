import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useUser } from "./components/UserContext";

const SocketContext = createContext<any>(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<any>(null);
  const { userId } = useUser();

  useEffect(() => {
    if (userId) {
      const socketInstance = io("http://localhost:6000", {
        query: {
          userId: userId,
        },
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
