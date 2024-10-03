import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Page11 = () => {
  const [mode, setMode] = useState('add'); 
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
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
      {mode === 'add' ? (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre de la tarea:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Introduce el nombre de la tarea"
            value={taskName}
            onChangeText={setTaskName}
          />
          <Text style={styles.label}>Descripción:</Text>
          <TextInput 
            style={[styles.input, { height: 100 }]} 
            placeholder="Introduce la descripción"
            multiline
            value={description}
            onChangeText={setDescription}
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
          <Button title="Añadir Tarea" onPress={() => {/* Lógica para añadir tarea */}} />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Buscar Tarea:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Buscar tarea..." 
            onChangeText={(text) => {/* Lógica para buscar tareas */}} 
          />
          <Button title="Eliminar Tarea" onPress={() => {/* Lógica para eliminar tarea */}} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
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

});

export default Page11;
