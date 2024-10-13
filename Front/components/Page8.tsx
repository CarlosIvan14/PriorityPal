import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useUser } from './UserContext'; // Importa el hook
import { Alert } from 'react-native';

type Page8NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Page8'>;
type Page8RouteProp = RouteProp<RootStackParamList, 'Page8'>;

const Page8 = () => {
  const navigation = useNavigation<Page8NavigationProp>();
  const route = useRoute<Page8RouteProp>();
  const { taskId } = route.params;
  const { user } = useUser();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('Pendiente');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3000/tasks/${taskId}`);
        const data = await response.json();
        setTask(data);

        const userPromises = data.id_users.map(async (userId: string) => {
          const userResponse = await fetch(`http://10.0.2.2:3000/users/${userId}`);
          return userResponse.json();
        });

        const usersData = await Promise.all(userPromises);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching task or users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdateTask = async () => {
    // Validar que los campos sean correctos antes de proceder
    if ((progress === 0 && status !== 'Pendiente') || (progress === 100 && status !== 'Finalizada')) {
      Alert.alert('Error', 'La combinación de progreso y estado no es válida.'); // Cambia alert por Alert.alert
      return;
    }

    try {
      const response = await fetch(`http://10.0.2.2:3000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, progress }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTask(updatedTask);
        setModalVisible(false); // Cerrar el modal
      } else {
        console.error('Error updating task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
        <Text style={styles.taskUsersTitle}>Usuarios asignados:</Text>
        <ScrollView style={styles.scrollTasks} contentContainerStyle={{ flexGrow: 1 }}>
          {users.length > 0 ? (
            users.map((user) => (
              <View key={user._id} style={styles.userItem}>
                <View style={styles.avatar} />
                <Text style={styles.userName}>{user.name}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.userName}>No se encontraron usuarios.</Text>
          )}
        </ScrollView>
      </View>
      {user?.role !== 'Empleado' && (
        <TouchableOpacity
          testID="go-to-page7"
          style={styles.button1}
          onPress={() => navigation.navigate('Page7', { areaId: user.area })}
        >
          <Text style={styles.buttonText1}>Ver todas las tareas del equipo</Text>
        </TouchableOpacity>
      )}
      {user?.role !== 'Admin' && (
        <TouchableOpacity
          testID="Actualizarstatus"
          style={styles.button1}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText1}>Actualizar estatus de la tarea</Text>
        </TouchableOpacity>
      )}

      {/* Modal para actualizar la tarea */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Actualizar Estado de la Tarea</Text>
            <Picker
              selectedValue={status}
              onValueChange={(value) => setStatus(value)}
              style={styles.picker}
            >
              <Picker.Item label="Pendiente" value="Pendiente" />
              <Picker.Item label="En Progreso" value="En Progreso" />
              <Picker.Item label="Finalizada" value="Finalizada" />
            </Picker>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Progreso (0-100)"
              maxLength={3}
              value={progress.toString()}
              onChangeText={(value) => {
                const numericValue = Math.max(0, Math.min(100, parseInt(value, 10) || 0));
                setProgress(numericValue);
              }}
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateTask}>
              <Text style={styles.buttonText}>Guardar Cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#1E2F57',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
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
    marginTop: 20,
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
  button1: {
    marginVertical: 10,
    backgroundColor: '#1E2F57',
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
  buttonText1: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2F57',
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
