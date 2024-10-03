import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ProgressBar } from 'react-native-paper'; // Add this import

const Page4 = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.greeting}>Tareas de</Text>
        <Text style={styles.name}>Miguel Angel</Text>
        <Text style={styles.description}>Miguel tiene 3 tareas pendientes</Text>
      </View>
      
      <View style={styles.taskTarget}>
        <Text style={styles.sectionTitle}>Tareas: </Text>
        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>Realizar el chat en tiempo real.</Text>
          <Text style={styles.taskDescription}>Esta tarea está a un 40 %</Text>
          <ProgressBar progress={0.5} color="#2196F3" />
        </View>
      </View>
      
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Tarea Urgente</Text>
        <Text style={styles.categoryDescription}>Revisar los avances de Jorge el conserje.</Text>
      </View>
      
      <View style={styles.taskPriority}>
        <Text style={styles.taskPriorityTitle}>Tareas completadas</Text>
        <Text style={styles.taskDescription}>Hasta ahora Miguel ha hecho 2/3 tareas</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox value={true} />
          <CheckBox value={true} />
          <CheckBox value={false} />
        </View>
      </View>
      
      <View style={styles.questionSection}>
        <TextInput style={styles.input} placeholder="Enviále mensaje " />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  taskTarget: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    color: '#6b6b6b',
    marginVertical: 10,
  },
  category: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8e4e4',
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryDescription: {
    fontSize: 16,
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
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  questionSection: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Page4;