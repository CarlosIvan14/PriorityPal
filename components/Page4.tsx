import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ProgressBar } from 'react-native-paper'; // Add this import

const Page4 = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi,</Text>
        <Text style={styles.name}>Jorge Blasquez</Text>
        <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      </View>
      
      <View style={styles.taskTarget}>
        <Text style={styles.sectionTitle}>Your Target</Text>
        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>One step at a time. You'll get there.</Text>
          <Text style={styles.taskDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          <ProgressBar progress={0.5} color="#2196F3" />
        </View>
      </View>
      
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Category</Text>
        <Text style={styles.categoryDescription}>Bartholomew Henderson</Text>
      </View>
      
      <View style={styles.taskPriority}>
        <Text style={styles.taskPriorityTitle}>Be gentle with yourself.</Text>
        <Text style={styles.taskDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox value={true} />
          <CheckBox value={true} />
          <CheckBox value={false} />
        </View>
      </View>
      
      <View style={styles.questionSection}>
        <TextInput style={styles.input} placeholder="Send your Question" />
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
    backgroundColor: '#6A7CF8',
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