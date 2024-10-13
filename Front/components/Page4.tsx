import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Linking } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ProgressBar } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';
import Share from 'react-native-share'; // Solo si decides usar react-native-share


type Page4NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Page4'>;
type Page4RouteProp = RouteProp<RootStackParamList, 'Page4'>;

const Page4 = () => {
  const navigation = useNavigation<Page4NavigationProp>();
  const route = useRoute<Page4RouteProp>();
  const { userId } = route.params;

  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]); // Estado para almacenar las tareas del usuario
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState<string | null>(null)

  // Fetch para obtener los datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3000/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3000/tasks/user/${userId}`);
        const data = await response.json();
        setTasks(data); // Guardar las tareas en el estado
      } catch (error) {
        console.error('Error al obtener las tareas del usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchTasks();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando información del usuario y sus tareas...</Text>
      </View>
    );
  }

  // Filtrar las tareas según su estado
  const pendingTasks = tasks.filter(task => task.status === 'Pendiente' || task.status === 'En Progreso');
  const completedTasks = tasks.filter(task => task.status === 'Finalizada');
  const generateReportHTML = () => {
    if (!user) return '';

    // Crear el contenido HTML para mostrar en WebView
    const pendingTasks = tasks.filter(task => task.status === 'Pendiente' || task.status === 'En Progreso');
    const completedTasks = tasks.filter(task => task.status === 'Finalizada');

    return `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Reporte de Tareas</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #30AFAF; }
            h2 { color: #2196F3; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Reporte de Tareas</h1>
          <h2>Información del Usuario</h2>
          <table>
            <tr>
              <th>ID</th>
              <td>${user._id}</td>
            </tr>
            <tr>
              <th>Nombre</th>
              <td>${user.name}</td>
            </tr>
            <tr>
              <th>Username</th>
              <td>${user.username}</td>
            </tr>
            <tr>
              <th>Rol</th>
              <td>${user.role}</td>
            </tr>
          </table>
          
          <h2>Tareas Pendientes y en Progreso</h2>
          <table>
            <tr>
              <th>Nombre de la Tarea</th>
              <th>Progreso (%)</th>
              <th>Status</th>
            </tr>
            ${pendingTasks.map(task => `
              <tr>
                <td>${task.name}</td>
                <td>${task.progress}</td>
                <td>${task.status}</td>
              </tr>
            `).join('')}
          </table>

          <h2>Tareas Completadas</h2>
          <table>
            <tr>
              <th>Nombre de la Tarea</th>
              <th>Status</th>
            </tr>
            ${completedTasks.map(task => `
              <tr>
                <td>${task.name}</td>
                <td>${task.status}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;
  };

  const viewReport = () => {
    const html = generateReportHTML();
    setHtmlContent(html);
  };

  
    
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Tareas de</Text>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.description}>
          {user ? `${user.name} tiene ${pendingTasks.length + completedTasks.length} tareas` : 'No se encontraron datos del usuario.'}
        </Text>
      </View>

      {/* Sección de Tareas en Progreso o Pendientes */}
      <View style={styles.taskTarget}>
        <Text style={styles.sectionTitle}>Tareas:</Text>
        <ScrollView style={styles.scrollArea} >
        {pendingTasks.length > 0 ? (
          pendingTasks.map((task) => (
            <TouchableOpacity testID="go-to-page8" key={task._id} onPress={() => navigation.navigate('Page8', { taskId: task._id })}>
            <View key={task._id} style={styles.taskCard}>
              <Text style={styles.taskTitle}>{task.name}</Text>
              <Text style={styles.taskDescription}>Progreso: {task.progress}%</Text>
              <ProgressBar progress={task.progress / 100} color="#2196F3" />
            </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No hay tareas pendientes o en progreso.</Text>
        )}
        </ScrollView>
      </View>

      {/* Sección de Tareas Completadas */}
      <View style={styles.category}>
        <Text style={styles.taskPriorityTitle}>Tareas Completadas</Text>
        <ScrollView style={styles.scrollArea} >
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <TouchableOpacity testID="go-to-page8" key={task._id} onPress={() => navigation.navigate('Page8', { taskId: task._id })}>
            <View key={task._id} style={styles.category2}>
              <Text style={styles.taskTitle2}>{task.name}</Text>
            </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No hay tareas Finalizadas.</Text>
        )}
        </ScrollView>
        <View style={styles.checkboxContainer}>
          {tasks.map((task) => (
              <CheckBox
                value={task.status === 'Finalizada'}
                onValueChange={() => {}} // No permitimos que cambie su estado
              />
          ))}
        </View>
      </View>
      {/* Botón para generar reporte */}
      {htmlContent ? (
        <WebView originWhitelist={['*']} source={{ html: htmlContent }} style={{ height: 600 }} />
      ) : (
        <>
          {/* Botón para ver el reporte */}
          <TouchableOpacity style={styles.reportButton} onPress={viewReport}>
            <Text style={styles.reportButtonText}>Ver Reporte</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  reportButton: {
    backgroundColor: '#1E2F57',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#30AFAF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    color: '#d0d0d0',
    marginTop: 5,
  },
  scrollArea: {
    maxHeight: 400, // Altura máxima de 400 px para la lista de usuarios
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskTarget: {
    marginBottom: 20,
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  taskTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskTitle2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  category: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f6cdcd',
    borderRadius: 10,
  },
  category2: {
    padding: 15,
    backgroundColor: "#f8e4e4",
    borderRadius: 8,
  },
  taskPriority: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  taskPriorityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"#000"
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  questionSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default Page4;
