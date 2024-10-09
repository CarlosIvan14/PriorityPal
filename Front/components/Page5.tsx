import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useUser } from './UserContext'; // Importa el hook
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type UserListNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Page5 = () => {
  const { user } = useUser(); // Obtén los datos del usuario del contexto
  const [names, setNames] = useState<any[]>([]); // Estado para almacenar los nombres de los usuarios
  const navigation = useNavigation<UserListNavigationProp>();

  useEffect(() => {
    const fetchUsersInArea = async () => {
      if (user && user.area) { // Verifica que el usuario y el área existan
        try {
          const response = await fetch(`http://10.0.2.2:3000/users/area/${user.area}`); // Llama al endpoint
          const data = await response.json();
          console.log(data);
          setNames(data); // Establece los nombres de los usuarios en el estado
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchUsersInArea(); // Llama a la función para obtener los usuarios
  }, [user]); // Dependencia en el usuario

  return (
    <View style={styles.container}>
      <View style={styles.userListContainer}>
      {names.length > 0 ? (
        names.map((user, index) => (
          <TouchableOpacity 
          key={user._id}
          style={styles.userItem}
          onPress={() => navigation.navigate('Page4')}
          >
          <View key={index} style={styles.userItem}>
            <View style={styles.avatar} />
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noUsersText}>No hay usuarios disponibles</Text>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userListContainer: {
    width: '100%',
    backgroundColor: '#9D9D9E',
    padding: 10,
    borderRadius: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#30AFAF',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
  },
  noUsersText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Page5;
