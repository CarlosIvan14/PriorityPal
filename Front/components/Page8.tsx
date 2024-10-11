import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useUser } from './UserContext'; // Importa el hook
type Page8NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Page8'>;
type Page8RouteProp = RouteProp<RootStackParamList, 'Page8'>;

const Page8 = () => {
  const navigation = useNavigation<Page8NavigationProp>();
  const route = useRoute<Page8RouteProp>();
  const { taskId } = route.params;
  const { user } = useUser();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]); // Estado para almacenar los usuarios

  // Hacer fetch de la tarea usando taskId
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3000/tasks/${taskId}`);
        const data = await response.json();
        setTask(data);

        // Hacer fetch de los usuarios usando sus IDs
        const userPromises = data.id_users.map(async (userId: string) => {
          const userResponse = await fetch(`http://10.0.2.2:3000/users/${userId}`);
          return userResponse.json();
        });

        const usersData = await Promise.all(userPromises); // Esperar a que todas las llamadas terminen
        setUsers(usersData); // Guardar los detalles de los usuarios
      } catch (error) {
        console.error('Error fetching task or users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando tarea...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Tarea:</Text>
      {task ? (
        <View style={styles.iconPlaceholder}>
            <Text style={styles.taskDescription1}>Nombre:</Text>
            <Text style={styles.taskName}>{task.name}</Text>
            <Text style={styles.taskDescription1}>Descripción:</Text>
            <ScrollView style={styles.scrollTasks} contentContainerStyle={{ flexGrow: 1 }}>
              <Text style={styles.taskDescription}>{task.description}</Text>
            </ScrollView>
        </View>
      ) : (
        <Text style={styles.noTaskText}>No se encontró la tarea.</Text>
      )}
       <View style={styles.userListContainer}>
        <ScrollView style={styles.scrollTasks}>
        <Text style={styles.taskUsersTitle}>Usuarios asignados:</Text>
            {users.length > 0 ? (
              users.map((user) => (
                <View key={user._id} style={styles.userItem}>
                  <View style={styles.avatar} />
                  <Text  style={styles.userName}>  {/* Agregar key aquí */}
                    {user.name}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.userName}>No se encontraron usuarios.</Text>
            )}
        </ScrollView>
      </View>
      {user?.role == 'Lider' && (
      <TouchableOpacity
        testID="go-to-page7"
        style={styles.button}
        onPress={() => navigation.navigate('Page7')}
      >
        <Text style={styles.buttonText}>Ver todas las tareas del equipo</Text>
      </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 40,
    borderWidth: 20,
    borderColor: '#FFF',
    backgroundColor: '#30AFAF',
  },
  userListContainer: {
    width: '100%',
    marginTop: 40,
    backgroundColor: '#9D9D9E',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20, // Añadir un margen inferior para separar las dos secciones
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#9D9D9E',
    padding: 10,
    borderRadius: 8,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
  },
  scrollTasks: {
    maxHeight: 200, // Altura máxima de 200 px para la lista de tareas
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
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
  taskName: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#30AFAF',
    borderRadius: 8,
  },
  taskDescription1: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: '#fff',
  },
  taskDescription: {
    padding:10,
    textAlign: "center",
    backgroundColor: '#30AFAF',
    marginTop: 5,
    fontSize: 16,
    color: '#fff',
    borderRadius: 8,
  },
  taskUsersTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  noTaskText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FF0000',
  },
  iconPlaceholder: {
    height: 300,
    backgroundColor: '#9D9D9E',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
});

export default Page8;
