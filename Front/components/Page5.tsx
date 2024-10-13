import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useUser } from './UserContext'; // Importa el hook
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type UserListNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Page5 = () => {
  const { user } = useUser(); // Obtén los datos del usuario del contexto
  const [names, setNames] = useState<any[]>([]); // Estado para almacenar los nombres de los usuarios
  const [tasks, setTasks] = useState<any[]>([]); // Estado para almacenar las tareas del usuario
  const navigation = useNavigation<UserListNavigationProp>();

  // Fetch de usuarios
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

  // Fetch de tareas
  useEffect(() => {
    const fetchUserTasks = async () => {
      if (user && user._id) { // Verifica que el usuario y su ID existan
        try {
          const response = await fetch(`http://10.0.2.2:3000/tasks/user/${user._id}`); // Llama al endpoint para obtener tareas
          const data = await response.json();
          console.log(data);
          setTasks(data); // Establece las tareas del usuario en el estado
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }
    };

    fetchUserTasks(); // Llama a la función para obtener las tareas
  }, [user]); // Dependencia en el usuario

  return (
    <View style={styles.container}>
      <View style={styles.userListContainer}>
      <Text  style={styles.title}>Equipo:</Text>
        {names.length > 0 ? (
          <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
            {names.map((user, index) => (
              <TouchableOpacity 
                key={user._id}
                style={styles.userItem}
                onPress={() => navigation.navigate('Page4', { userId: user._id })} // Pasar el ID del usuario aquí
              >
                <View key={index} style={styles.userItem}>
                  <View style={styles.avatar} />
                  <Text style={styles.userName}>{user.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noUsersText}>No hay usuarios disponibles</Text>
        )}
      </View>

      {/* Sección para mostrar las tareas */}
      <View style={styles.taskListContainer}>
      <Text  style={styles.title}>Tareas:</Text>
        {tasks.length > 0 ? (
          <ScrollView style={styles.scrollTasks} contentContainerStyle={styles.scrollContent}>
            {tasks.map((task, index) => (
              <View key={task._id} style={styles.taskItem}>
                <TouchableOpacity testID="go-to-page8" key={index} onPress={() => navigation.navigate('Page8', { taskId: task._id })}>
                  <Text style={styles.taskName}>{task.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noTasksText}>No hay tareas disponibles</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 10
  },
  userListContainer: {
    width: '100%',
    backgroundColor: '#9D9D9E',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20, // Añadir un margen inferior para separar las dos secciones
  },
  scrollArea: {
    maxHeight: 400, // Altura máxima de 400 px para la lista de usuarios
  },
  scrollContent: {
    paddingBottom: 10, // Añadir algo de padding inferior para evitar cortar el último elemento
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
  taskListContainer: {
    width: '100%',
    backgroundColor: '#9D9D9E',
    padding: 10,
    borderRadius: 10,
  },
  scrollTasks: {
    maxHeight: 200, // Altura máxima de 200 px para la lista de tareas
  },
  taskItem: {
    backgroundColor: '#1E2F57',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  taskName: {
    color: '#fff',
    fontSize: 16,
  },
  noTasksText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Page5;
