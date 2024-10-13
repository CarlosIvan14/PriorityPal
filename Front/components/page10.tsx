import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native';
import { useUser } from './UserContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type UserListNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export default function Page10() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<any[]>([]); // Estado para almacenar las tareas del usuario
  const [area, setArea] = useState<any>(null); 
  const navigation = useNavigation<UserListNavigationProp>();
  const areauser = user.area
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
  }, [user]); 
   // Fetch del área del usuario
    // Fetch del área del usuario
    useEffect(() => {
      const fetchUserArea = async () => {
        console.log(areauser)
        if (areauser) { // Verifica que el usuario y su ID existan
          try {
            const response = await fetch(`http://10.0.2.2:3000/areas/${areauser}`); // Llama al endpoint para obtener el área
            if (!response.ok) {
              throw new Error('Área no encontrada');
            }
            const areaData = await response.json();
            console.log('Área del usuario:', areaData);
            setArea(areaData); // Establece el área del usuario en el estado
          } catch (error) {
            console.error('Error fetching area:', error);
          }
        }
      };
  
      fetchUserArea(); // Llama a la función para obtener el área
    }, [user]); 
  
  return (
    <View style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://your-image-url.com/profile.jpg' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.name}>{user?.name || 'Nombre no disponible'}</Text>
        <Text style={styles.title}>{user?.role || 'Rol no disponible'}</Text>
      </View>
      
      {/* Information Boxes */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Equipo:</Text>
          <Text style={styles.infoText}>{area?.name}</Text>
        </View>
        <View style={styles.infoBox}>
        <Text style={styles.infoText}>Username:</Text>
          <Text style={styles.infoText}>{user?.username}</Text>
        </View>
      </View>

      {/* Tasks Section */}
      <View style={styles.tasksContainer}>
        <Text style={styles.tasksTitle}>Tareas</Text>
        
       {/* Sección para mostrar las tareas */}
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

      {/* Download Button with Pressable */}
      <Pressable 
        style={({ pressed }) => [
          styles.downloadButton,
          pressed && styles.downloadButtonPressed,
        ]}
        onPress={() => console.log('Download button pressed')}
      >
        {({ pressed }) => (
          <Text 
            style={[
              styles.downloadButtonText, 
              pressed && styles.downloadButtonTextPressed
            ]}
          >
            Descargar CV
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
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
  scrollContent: {
    paddingBottom: 10, // Añadir algo de padding inferior para evitar cortar el último elemento
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#8E72FF', 
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: '#30AFAF',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 20,
  },
  infoBox: {
    backgroundColor: '#F3F4F6',
    width: '40%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
  },
  taskText: {
    fontSize: 16,
    borderWidth: 2,
    padding: 5,
    borderColor: '#D3D3D3', 
    borderRadius: 5, 
  },
  tasksContainer: {
    width: '80%',
    padding: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginBottom: 30,
  },
  tasksTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    
  },
  downloadButton: {
    backgroundColor: '#30AFAF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  downloadButtonPressed: {
    backgroundColor: '#715AFF',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  downloadButtonTextHovered: {
    textDecorationLine: 'underline',
  },
  downloadButtonTextPressed: {
    color: '#D0D0FF',
  },
  
});
