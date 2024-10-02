import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserList from './UserList';
import TaskList from './TaskList';

const exampleData = {
  names: [
    { id: '1', name: 'Miguel Angel' },
    { id: '2', name: 'Jorge Javier' },
    { id: '3', name: 'Fernanda Diaz' },
    { id: '4', name: 'Carlos Armenta' },
  ],
  tasks: [
    { id: '1', title: 'Tarea #1', progress: 0.7 },
    { id: '2', title: 'Tarea #2', progress: 0.4 },
  ],
};

export default function Page5() {
  return (
    <View style={styles.container}>
      <UserList names={exampleData.names} />
      <TaskList tasks={exampleData.tasks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
