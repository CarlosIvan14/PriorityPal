import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

interface Task {
  id: string;
  title: string;
  progress: number;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => (
  <View style={styles.taskListContainer}>
    {tasks.map(task => (
      <View key={task.id} style={styles.taskItem}>
        <View style={styles.checkbox} />
        <Text style={styles.taskTitle}>{task.title}</Text>
        <ProgressBar
          progress={task.progress}
          color="#BD0B35"
          style={styles.progressBar}
        />
        <Text style={styles.progressText}>
          {Math.round(task.progress * 100)}%
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  taskListContainer: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#1E2F57',
    padding: 10,
    borderRadius: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2,
    marginRight: 10,
  },
  taskTitle: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  progressBar: {
    height: 10,
    width: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default TaskList;
