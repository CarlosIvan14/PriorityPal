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
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [newAreaName, setNewAreaName] = useState('');
  const [newAreaDescription, setNewAreaDescription] = useState('');
  const [mode, setMode] = useState<'search' | 'add'>('search'); // Modo por defecto: "Buscar área"
  const [users, setUsers] = useState<any[]>([]); // Estado para almacenar los usuarios
  const [showUsers, setShowUsers] = useState<boolean>(false); // Estado para controlar la visualización de los usuarios
  const navigation = useNavigation<Page6NavigationProp>();

  useEffect(() => {
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
      setFilteredAreas(areas);
    } else {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/areas/search?q=${text}`);
        setFilteredAreas(response.data);
      } catch (error) {
        console.error('Error en la búsqueda de áreas:', error);
      }
    }
  };

  const handleTeamPress = (teamId: string) => {
    if (selectedTeam === teamId) {
      setSelectedTeam(null);  // Deseleccionar si ya estaba seleccionado
      setShowUsers(!showUsers);
    } else {
      setSelectedTeam(teamId);  // Seleccionar el nuevo equipo
      handleShowUsers(teamId);
    }
  };

  const renderTaskButton = () => {
    if (!selectedTeam) return null;
  
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.taskButton}
          onPress={() => navigation.navigate('Page7', { areaId: selectedTeam })}
        >
          <Text style={styles.taskButtonText}>Ver Tareas</Text>
        </TouchableOpacity>
      </View>
    );
  };


  const handleShowUsers = async (teamId: string) => {
    console.log(`Mostrando usuarios para el equipo con ID: ${teamId}`);
    try {
      const response = await axios.get(`http://10.0.2.2:3000/users/area/${teamId}`);
      setUsers(response.data);
      setShowUsers(true);
    } catch (error) {
      console.error('Error al obtener usuarios del área:', error);
    }
  };
  
  
  const handleAddArea = async () => {
    if (!newAreaName || !newAreaDescription) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:3000/areas/', {
        name: newAreaName,
        description: newAreaDescription,
      });
      setAreas([...areas, response.data]);
      setNewAreaName('');
      setNewAreaDescription('');
      Alert.alert('Éxito', 'Área agregada con éxito');
    } catch (error) {
      console.error('Error al agregar el nuevo área', error);
      Alert.alert('Error', 'No se pudo agregar el área');
    }
  };

  const handleDeleteArea = async (name: string) => {
    try {
      const response = await axios.delete(`http://10.0.2.2:3000/areas/deleteByName/${name}`);
      setAreas(areas.filter(area => area.name !== name));
      setFilteredAreas(filteredAreas.filter(area => area.name !== name));
      Alert.alert('Éxito', 'Área eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar área:', error);
      Alert.alert('Error', 'No se pudo eliminar el área');
    }
  };

  const confirmDeleteArea = (areaName: string) => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Seguro que quiere eliminar el área "${areaName}"?`,
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Eliminación cancelada'),
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: () => handleDeleteArea(areaName),
        },
      ],
      { cancelable: false }
    );
  };

  const renderTeamList = () => {
    return filteredAreas.map((team) => (
      <TouchableOpacity
        key={team._id}
        style={[
          styles.teamButton,
          selectedTeam === team._id && styles.selectedTeamButton,
        ]}
        onPress={() => handleTeamPress(team._id)}  // Solo selecciona el equipo
      >
        <View style={styles.teamInfo}>
          <Image source={require('../public/teams.jpg')} style={styles.Icon} />
          <Text style={styles.teamName}>{team.name}</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.userButton}
            onPress={() => handleShowUsers(team._id)}  // Mostrar usuarios
          >
            <Text style={styles.userButtonText}>Ver Usuarios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmDeleteArea(team.name)}  // Confirmar eliminación del equipo
          >
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ));
  };
  
  const renderUserList = () => {
    if (!showUsers) return null; // Si no se deben mostrar usuarios, retorna null
  
    return (
      <View style={styles.userListFullContainer}>
        <Text style={styles.usersTitle}>Usuarios en esta área:</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {users.map((user) => (
            <View key={user._id} style={styles.userBox}>
              <Text style={styles.userName}>{user.username}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.modeButton}
        onPress={() => setMode(mode === 'search' ? 'add' : 'search')}
      >
        <Text style={styles.modeButtonText}>
          {mode === 'search' ? 'Agregar área' : 'Buscar área'}
        </Text>
      </TouchableOpacity>

      {mode === 'search' ? (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar equipo"
            value={searchQuery}
            onChangeText={handleSearch}
          />

          <ScrollView contentContainerStyle={styles.teamsContainer}>
            {renderTeamList()}
          </ScrollView>
          {renderUserList()}
          {renderTaskButton()}
        </>
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Los estilos permanecen iguales
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
    fontWeight: 'bold',
  },
  tasksList: {
    marginTop: 10,
  },
  taskItem: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addAreaContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  modeButton: {
    backgroundColor: '#30AFAF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  modeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#1E2F57',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
  },
  Icon: {
    width: 55,
    height: 55,
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  userButton: {
    backgroundColor: '#1E2F57',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  userButtonText: {
    color: 'white',
    fontSize: 16,
  },
  userListFullContainer: {
    flex: 1,  // Ocupa toda la pantalla
    backgroundColor: '#30afaf', // Fondo para toda la lista de usuarios
    padding: 20, 
    height:'80%',
  },
  usersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  userBox: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
},
userName: {
    fontWeight: 'bold',
    fontSize: 16,
}, 
scrollViewContent: {
  paddingBottom: 30, 
},
  
});

export default Page6;
