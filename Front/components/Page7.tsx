import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

interface Task {
  _id: string;
  name: string;
  description: string;
  deadline: string;
  area_id: {
    _id: string;
    name: string;
    description: string;
  };
}

type Page7NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Page7'>;
type Page7RouteProp = RouteProp<RootStackParamList, 'Page7'>;

export default function Page7() {
  const navigation = useNavigation<Page7NavigationProp>();
  const route = useRoute<Page7RouteProp>();
  const { areaId } = route.params;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);  // Guardamos la tarea seleccionada

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3000/tasks/getByAreaId/${areaId}`);
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas del equipo:</Text>
      <ScrollView style={styles.container2}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TouchableOpacity 
              key={task._id} 
              style={styles.listItem}
              onPress={() => setSelectedTask(task)}  // Al hacer clic, selecciona la tarea
            >
              <Text style={styles.bullet}>{'\u2022'}</Text>
              <Text style={styles.itemText}>{task.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No hay tareas disponibles</Text>
        )}
      </ScrollView>

      {selectedTask && (
        <>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Page8', { taskId: selectedTask._id })}  // Navegamos con el ID de la tarea
          >
            <Text style={styles.buttonText}>Ver tarea</Text>
          </TouchableOpacity>

          <View style={styles.descriptionCard}>
          <Text style={styles.descriptionTitle}>Descripción</Text>
          <ScrollView style={styles.container22}>
            <Text style={styles.description}>{selectedTask.description}</Text>
          </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    color: '#fff',
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#1E2F57',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  descriptionCard: {
    backgroundColor: '#9D9D9E',
    padding: 10,
    borderRadius: 10,
    minHeight: 150,
  },
  descriptionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  container2: {
    flex: 1,
    padding: 10,
    paddingLeft: 20,
    backgroundColor:  '#9D9D9E',
    borderRadius: 8,
  },
  container22: {
    flex: 1,
    padding: 10,
    paddingLeft: 20,
    backgroundColor:  '#30AFAF',
    borderRadius: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#30AFAF',
    borderRadius: 8,
    padding: 5, 
  },
  bullet: {
    color: '#fff',
    fontSize: 20,
    marginRight: 10,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
});
