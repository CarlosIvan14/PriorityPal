import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import axios from 'axios';

type Page6NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Page6: React.FC = () => {
  const [areas, setAreas] = useState<any[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [showTasks, setShowTasks] = useState<boolean>(false);
  const [newAreaName,setNewAreaName] = useState('');
  const [newAreaDescription, setNewAreaDescription] = useState('');
  const navigation = useNavigation<Page6NavigationProp>();

  useEffect(() => {
    // Obtener las áreas al cargar el componente
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/areas/');
      setAreas(response.data);
      setFilteredAreas(response.data);
    } catch (error) {
      console.error('Error al obtener áreas:', error);
    }
  };

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredAreas(areas); // Restablecer la lista completa si no hay búsqueda
    } else {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/areas/search?q=${text}`);
        setFilteredAreas(response.data);
      } catch (error) {
        console.error('Error en la búsqueda de áreas:', error);
      }
    }
  };

  const handleTeamPress = async (teamId: number) => {
    if (selectedTeam === teamId) {
      setShowTasks(!showTasks);
    } else {
      setSelectedTeam(teamId);
      setShowTasks(false); // Resetear la visualización de tareas cuando se selecciona un nuevo equipo

      try{
        const team = filteredAreas.find((t) => t._id === teamId);
        if(team){
          const response = await axios.get(`http://10.0.2.2:3000/tasks/getByAreaName/${team.name}`)
          team.tasks = response.data.map((task: any) => task.name);
          setFilteredAreas([...filteredAreas]);
        }
      }catch(error){
        console.error('Error al obtener tareas del área:',error);
      }
    }
  };

  const handleAddArea = async () => {
    if(!newAreaName || !newAreaDescription){
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    try{
      const response = await axios.post('http://10.0.2.2:3000/areas/',{
        name: newAreaName,
        description: newAreaDescription,
      });
      setAreas([...areas, response.data]);
      setNewAreaName('');
      setNewAreaDescription('');
      Alert.alert('Éxito', 'Área agregada con éxito');
    }catch (error){
      console.error('Error al agregar el nuevo área', error);
      Alert.alert('Error', 'No se pudo agregar el área');
    }
  };

  const handleDeleteArea = async (name: string) =>{
    try{
      const response = await axios.delete(`http://10.0.2.2:3000/areas/deleteByName/${name}`);
      setAreas(areas.filter(area => area.name !== name));
      setFilteredAreas(filteredAreas.filter(area => area.name !== name));
      Alert.alert('Éxito','Area eliminada exitosamente');
    }catch(error){
      console.error('Error al eliminar área:', error);
      Alert.alert('Error', 'No se pudo eliminar el área');
    }
  };

  const renderTeamList = () => {
    return filteredAreas.map((team) => (
      <TouchableOpacity
        key={team._id}
        style={[
          styles.teamButton,
          selectedTeam === team._id && styles.selectedTeamButton,
        ]}
        onPress={() => handleTeamPress(team._id)}
      >
        <View style={styles.teamInfo}>
          <Image source={require('../public/teams.jpg')} style={styles.Icon} />
          <Text style={styles.teamName}>{team.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteArea(team.name)}
        >
          <Text style = {styles.deleteButtonText}> Eliminar</Text>

        </TouchableOpacity>
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
    const team = filteredAreas.find((t) => t._id === selectedTeam);
    if (!team || !showTasks) return null;

    return (
      <View style={styles.teamDetails2}>
      <View style={styles.teamDetails}>
        <Text style={styles.tasksTitle}>Tareas:</Text>
        <View style={styles.tasksList}>
          {team.tasks.map((task, index) => (
            <TouchableOpacity testID="go-to-page8" key={index} onPress={() => navigation.navigate('Page8',{taskId:task.id})}>
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
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar equipo"
        value={searchQuery}
        onChangeText={handleSearch}
      />
       <View style={styles.addAreaContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del área"
          value={newAreaName}
          onChangeText={setNewAreaName}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción del área"
          value={newAreaDescription}
          onChangeText={setNewAreaDescription}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddArea}>
          <Text style={styles.addButtonText}>Agregar Área</Text>
        </TouchableOpacity>
      </View>

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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
},
scrollContainer: {
  flex: 1,
},
addAreaContainer: {
  marginBottom: 20,
},
input: {
  height: 40,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  marginBottom: 10,
  backgroundColor: '#fff',
},
addButton: {
  backgroundColor: '#30AFAF',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
},
addButtonText: {
  color: 'white',
  fontSize: 16,
},
deleteButton: {
  backgroundColor: '#FF5733',
  padding: 8,
  borderRadius: 5,
},
deleteButtonText: {
  color: 'white',
  fontSize: 14,
},

});

export default Page6;
