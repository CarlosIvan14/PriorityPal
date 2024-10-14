import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

type UserContextType = {
  user: any;
  setUser: (user: any) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
  authUser: string | null;
  setAuthUser: (authUser: string | null) => void;
};

interface DecodedToken {
  userId: string;
  // Agrega otros campos si tu token los tiene
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<string | null>(null);

  // Cargar el token desde AsyncStorage al montar el componente
  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          setAuthUser(storedToken);
        }
      } catch (e) {
        console.error('Error al obtener el token de AsyncStorage', e);
      }
    };
    fetchAuthToken();
  }, []);

  // Decodificar el token cuando authUser cambia
  useEffect(() => {
    if (authUser) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(authUser);
        setToken(authUser);
        setUserId(decodedToken.userId);
        // Opcional: Puedes realizar una petición para obtener los datos completos del usuario aquí
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
  }, [authUser]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, userId, setUserId, authUser, setAuthUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser utilizado dentro de un UserProvider');
  }
  return context;
};
