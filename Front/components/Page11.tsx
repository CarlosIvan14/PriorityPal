import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Alert, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Page12ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Page12'>;

interface Area {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  name: string;
}

interface Task {
  _id: string;
  name: string;

}

const Page11 = () => {
  const [mode, setMode] = useState('add'); 
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [area, setArea] = useState('');
  const [areas, setAreas] = useState<Area[]>([]); 
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); 
  const [users, setUsers] = useState<User[]>([]);
  const [searchResults, setSearchResults] = useState<Task[]>([]);
  const navigation = useNavigation<Page12ScreenNavigationProp>();
  const [areaUsers, setAreaUsers] = useState<User[]>([]);

  


  useEffect(() => {
    const obtenerAreas = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/areas');
        const areas = await response.json();
        setAreas(areas);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron obtener las áreas');
        console.error('Error fetching areas:', error);
      }
    };

    const obtenerUsuarios = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/users');
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron obtener los usuarios');
        console.error('Error fetching users:', error);
      }
    };
    
    obtenerAreas();
    obtenerUsuarios();
  }, []);

  // Función para crear nueva tarea
  const handleCreateTask = async () => {
    if (!taskName || !description || !area || !dueDate || selectedUsers.length === 0) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:3000/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_users: selectedUsers, // Enviar usuarios seleccionados
          name: taskName,
          deadline: dueDate,
          description,
          area_id: area,
          status: "Pendiente",
          progress: 0,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Éxito', 'Tarea creada exitosamente');
        setTaskName('');
        setArea('');
        setDescription('');
        setSelectedUsers([]); // Limpiar usuarios seleccionados
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Error en el servidor, por favor intenta más tarde.');
      console.error('Error creating task:', error);
    }
  };

  //Funcion para la busqueda fuzzy
  const handleSearchTask = async(busqueda: string) =>{
    setTaskName(busqueda);

    if(busqueda.length>0){
      try{

        const response = await fetch(`http://10.0.2.2:3000/tasks/search?q=${busqueda}`);
        const results = await response.json();
        setSearchResults(results); 
        console.log('Resultados de busqueda:', results);
      }catch(error){
        console.error('Error buscando tareas: ', error);
        setSearchResults([]);
      }
    }else{
      setSearchResults([]);
    }

  }

  //Función para eliminar tarea
  const handleEraseUser = async( taskToDelete: string) =>{
    if(!taskToDelete){
      Alert.alert('Error','Es necesario ingresar el nombre de la tarea que se desea eliminar');
      return;
    }

    try{
      const response = await fetch(`http://10.0.2.2:3000/tasks/deleteByName/${taskToDelete}`,{
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Tarea eliminada exitosamente',[
          { 
            text: 'Ok', 
            onPress: () => {
              setTaskName('');  
              navigation.replace('Page12');
            }
          }
        ]);
      } else {
        const data = await response.json();
        Alert.alert('Error', data.message);
      }
    }catch(error){
      Alert.alert('Error', 'Error en el servidor, por favor intenta más tarde.');
      console.error('Error deleting user:', error);
    }
  };

  // Función para cambiar la fecha
  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  // Función para seleccionar o deseleccionar usuarios
  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId)); // Deseleccionar usuario
    } else {
      setSelectedUsers([...selectedUsers, userId]); // Seleccionar usuario
    }
  };

  //Función para asiganar tarea y crear automaticamente
  const handleAutoAssignTask = async () => {
    if (!taskName || !description || !area || !dueDate) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
  
    try {
      const response = await fetch('http://10.0.2.2:3000/openAiRoute/assign-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          areaId: area,
          taskDetails: {
            name: taskName,
            deadline: dueDate,
            description,
          },
        }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        // Buscar el nombre del usuario asignado a partir de su ID
        const assignedUser = users.find(user => user._id === data.assignedUserId);
        const assignedUserName = assignedUser ? assignedUser.name : 'Usuario no encontrado';
  
        Alert.alert('Éxito', `Tarea creada y asignada automáticamente al usuario: ${assignedUserName}`);
        // Limpiar los campos después de la asignación exitosa
        setTaskName('');
        setArea('');
        setDescription('');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Error en el servidor, por favor intenta más tarde.');
      console.error('Error assigning task automatically:', error);
    }
  };
  


  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, mode === 'add' && styles.activeButton]}
          onPress={() => setMode('add')}
        >
          <Text style={styles.buttonText}>Añadir Tarea</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, mode === 'delete' && styles.activeButton]}
          onPress={() => setMode('delete')}
        >
          <Text style={styles.buttonText}>Eliminar Tarea</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
      {mode === 'add' ? (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre de la tarea:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Introduce el nombre de la tarea"
            value={taskName}
            onChangeText={setTaskName}
            autoComplete='off'
            autoCorrect={false}
            autoCapitalize='none'
          />
          <Text style={styles.label}>Descripción:</Text>
          <TextInput 
            style={[styles.input, { height: 100 }]} 
            placeholder="Introduce la descripción"
            multiline
            value={description}
            onChangeText={setDescription}
            autoComplete='off'
            autoCorrect={false}
            autoCapitalize='none'
          />
          <Text style={styles.label}>Fecha de entrega:</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>
              {dueDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          <Text style={styles.label}>Área:</Text>
          <Picker
            selectedValue={area}
            style={styles.input}
            onValueChange={(itemValue) => setArea(itemValue)}
          >
            <Picker.Item label="Selecciona un área" value="" />
            {areas.map((areaItem) => (
              <Picker.Item label={areaItem.name} value={areaItem._id} key={areaItem._id} />
            ))} 
          </Picker>

          <Text style={styles.label}>Asignar a usuarios:</Text>
          {users.map((user) => (
            <TouchableOpacity
              key={user._id}
              onPress={() => toggleUserSelection(user._id)}
              style={[
                styles.userItem,
                selectedUsers.includes(user._id) && styles.selectedUserItem, // Cambiar estilo si está seleccionado
              ]}
            >
              <Text>{user.name}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
            style={[styles.button, styles.activeButton]}
            onPress={handleCreateTask}
            >
              <Text style={styles.buttonText}>Asignar tarea</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button,styles.activeButton]}
              onPress={handleAutoAssignTask}
            >
              <Text style={styles.buttonText}>Asignar tarea automaticamente</Text>
            </TouchableOpacity>
        </View>
        </View>
      ): (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Buscar Tarea:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Buscar tarea..."  
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
            onChangeText={(text) => {
              setTaskName(text);
              handleSearchTask(text);
            }}
          />

          {searchResults.length > 0 && (
            <View style={styles.resultContainer}>
              {searchResults.map((task) => (
              <TouchableOpacity 
              key={task._id} 
              onPress={() => {
                handleEraseUser(task.name);
              }}
              >
                <Text style={styles.resultItem}>{task.name}</Text>
              </TouchableOpacity>
            ))}
            </View>
          )}

          <Button title="Eliminar Tarea" onPress={() => handleEraseUser(taskName)} 
            />
        </View>
      )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#9D9D9E',
    padding: 10,
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: '#30AFAF',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  formContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    textAlign: 'center',
  },
  userItem: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedUserItem: {
    backgroundColor: '#d3f3d3',
  },
  scrollContainer: {
    flex: 1,
  },
  resultContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 150,
    overflow: 'scroll', 
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    color: '#333',
  },
});

export default Page11;
