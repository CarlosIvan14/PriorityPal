import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Area {
  _id: string;
  name: string;
}

const Page12 = () => {
  const [mode, setMode] = useState('add');
  const [username, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const [role, setRole]= useState('');
  const [area, setArea] = useState(''); 
  const [name,setName ]= useState('');
  const [areas, setAreas] = useState<Area[]>([]);  

  useEffect(() =>{
    const obtenerAreas = async () =>{
      try {
        const response = await fetch('http://10.0.2.2:3000/areas');  
        const areas = await response.json();
        setAreas(areas);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron obtener las áreas');
        console.error('Error fetching areas:', error);
      }
    };
    obtenerAreas();
  },[]);

  // Función para crear un usuario
  const handleCreateUser = async() =>{
    if (!username || !password || !role || !area || !name) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:3000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role,
          area,
          name
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Usuario creado exitosamente');
        setUsername('');
        setPassword('');
        setRole('');
        setArea('');
        setName('');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Error en el servidor, por favor intenta más tarde.');
      console.error('Error creating user:', error);
    }
  }

  return (

    <View style={styles.container}>
      {/* Botones de Añadir y Eliminar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, mode === 'add' && styles.activeButton]}
          onPress={() => setMode('add')}
        >
          <Text style={styles.buttonText}>Añadir persona</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, mode === 'delete' && styles.activeButton]}
          onPress={() => setMode('delete')}
        >
          <Text style={styles.buttonText}>Eliminar persona</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido dinámico según el modo seleccionado */}
      <ScrollView style={styles.scrollContainer}>
      {mode === 'add' ? (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre y apellidos:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Introduce el nombre y apellido del usuario"
            value={name}
            onChangeText={setName}
          />
          
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

          <Text style={styles.label}>Role del usuario:</Text>
          <Picker
          selectedValue={role}
          style={styles.input}
          onValueChange={(itemValue)=> setRole(itemValue)}
          >
            <Picker.Item label='Empleado' value={'Empleado'}/>
            <Picker.Item label='Lider' value={'Lider'}/>
            <Picker.Item label='Admin' value={'Admin'}/>
          </Picker>

          <Text style={styles.label}>Usuario:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Introduce el usuario del empleado" 
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Contraseña:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Introduce la contraseña" 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
          />

          <Button title="Añadir" onPress={handleCreateUser}/>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Buscar Usuario:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Buscar usuario..." 
            onChangeText={(text) => {/* Lógica para buscar usuarios */}} 
          />
          <Button title="Eliminar" onPress={() => {/* Lógica para eliminar usuario */}} />
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
  scrollContainer: {
    flex: 1,
  },

});

export default Page12;
