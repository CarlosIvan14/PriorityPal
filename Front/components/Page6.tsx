import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Icon } from 'react-native-paper';

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
        <Image source={require('../public/teams.jpg')} style={styles.Icon} />
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
      <View style={styles.teamDetails2}>
      <View style={styles.teamDetails}>
        <Text style={styles.tasksTitle}>Tareas:</Text>
        <View style={styles.tasksList}>
          {team.tasks.map((task, index) => (
            <TouchableOpacity testID="go-to-page7" key={index} onPress={() => navigation.navigate('Page7')}>
              <Text style={styles.taskItem}>
                ○ {task}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
    padding: 20,
  },
  teamsContainer: {
    flexGrow: 1, 
  },
  teamButton: {
    backgroundColor: '#93d4d6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedTeamButton: {
    backgroundColor: '#30AFAF',
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
    backgroundColor: '#30AFAF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
   
  },
  taskButtonText: {
    color: 'white',
    fontSize: 18,
  },
  teamDetails: {
    backgroundColor: '#93d4d6',
    padding: 20,
    borderRadius: 10,
  },
  teamDetails2: {
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
  Icon: {
    width: 55,
    height: 55,
    marginHorizontal: 20,
  },
});

export default Page6;
