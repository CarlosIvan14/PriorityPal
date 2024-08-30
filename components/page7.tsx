import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Modal} from 'react-native';

const data = [
  { key: '1', text: 'Tarea 1' },
  { key: '2', text: 'Tarea 2' },
  { key: '3', text: 'Tarea 3' },
  { key: '4', text: 'Tarea 4' },
  { key: '5', text: 'Tarea 5' },
  { key: '6', text: 'Tarea 6' },
  
];

export default function Page7() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas</Text>
      <View style={styles.container2}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
      
    <View>
      <Modal
        animationType="slide" // Puedes usar "slide", "fade", o "none"
        transparent={true}    // Hace que el fondo sea transparente
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Este es un pop-up!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
      



      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Ver todas</Text>
      </TouchableOpacity>
      
      <View style={styles.descriptionCard}>
        <Text style={styles.descriptionTitle}>Descripción</Text>
        {/* Aquí puedes agregar un ícono o imagen representando la lista de tareas */}
        <View style={styles.iconPlaceholder}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Fondo claro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  descriptionCard: {
    backgroundColor: '#6f78fd', //Color de la App #6f78fd
    padding: 20,
    borderRadius: 10,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconPlaceholder: {
    height: 100,
    backgroundColor: '#000', // Aquí puedes reemplazar con el ícono
    borderRadius: 10,
    marginTop: 10,
  },
//Styles de la lista - ul ___________________________________________________________________________
  container2: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 20,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 20,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
//Styles del Popup___________________________________________________________________________

modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
closeButton: {
  backgroundColor: '#6f78fd',
  borderRadius: 10,
  padding: 10,
  elevation: 2,
  marginTop: 15,
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
},
});