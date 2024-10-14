import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'; // Corregir la importación
import {createContext, useState, useEffect} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [authUser, setAuthUser] = useState(null); // Inicializar como null

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          const decodedToken = jwtDecode(storedToken);
          setToken(storedToken);
          const userId = decodedToken.userId;
          setUserId(userId);
          setAuthUser(decodedToken); // Establecer el usuario decodificado
        }
      } catch (error) {
        console.log('Error fetching token:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{token, userId, setToken, setUserId, authUser, setAuthUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
