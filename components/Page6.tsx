import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Page6NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const teams = [
  { id: 1, name: 'Equipo 1', tasks: ['Tarea 1', 'Tarea 2', 'Tarea 3'] },
  { id: 2, name: 'Equipo 2', tasks: ['Tarea 4', 'Tarea 5', 'Tarea 6'] },
  { id: 3, name: 'Equipo 3', tasks: ['Tarea 7', 'Tarea 8', 'Tarea 9'] },
  { id: 4, name: 'Equipo 4', tasks: ['Tarea 10', 'Tarea 11', 'Tarea 12'] },
];

const Page6: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [showTasks, setShowTasks] = useState<boolean>(false);
  const navigation = useNavigation<Page6NavigationProp>();

  const handleTeamPress = (teamId: number) => {
    if (selectedTeam === teamId) {
      setShowTasks(!showTasks);
    } else {
      setSelectedTeam(teamId);
      setShowTasks(false); // Resetear la visualización de tareas cuando se selecciona un nuevo equipo
    }
  };

  const renderTeamList = () => {
    return teams.map((team) => (
      <TouchableOpacity
        key={team.id}
        style={[
          styles.teamButton,
          selectedTeam === team.id && styles.selectedTeamButton,
        ]}
        onPress={() => handleTeamPress(team.id)}
      >
        <View style={styles.teamInfo}>
          <Ionicons name="people-outline" size={24} color="black" />
          <Text style={styles.teamName}>{team.name}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const renderTaskButton = () => {
    if (selectedTeam === null) return null;

    return (
      <TouchableOpacity
        style={styles.taskButton}
        onPress={() => setShowTasks(!showTasks)}
      >
        <Text style={styles.taskButtonText}>Ver Tareas</Text>
      </TouchableOpacity>
    );
  };

  const renderTeamDetails = () => {
    const team = teams.find((t) => t.id === selectedTeam);
    if (!team || !showTasks) return null;

    return (
      <View style={styles.teamDetails}>
        <Text style={styles.tasksTitle}>Tareas:</Text>
        <View style={styles.tasksList}>
          {team.tasks.map((task, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Page8')}>
              <Text style={styles.taskItem}>
                ○ {task}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.teamsContainer}>
        {renderTeamList()}
      </ScrollView>
      {renderTaskButton()}
      {renderTeamDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#e0e6fc',
    padding: 20,
  },
  teamsContainer: {
    flexGrow: 1, 
  },
  teamButton: {
    backgroundColor: '#a3a8f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedTeamButton: {
    backgroundColor: '#5f77ef',
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamName: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
  taskButton: {
    backgroundColor: '#5f77ef',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
   
  },
  taskButtonText: {
    color: 'white',
    fontSize: 18,
  },
  teamDetails: {
    backgroundColor: '#5f77ef',
    padding: 20,
    borderRadius: 10,
  },
  tasksTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  tasksList: {
    marginLeft: 10,
  },
  taskItem: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
});

export default Page6;
