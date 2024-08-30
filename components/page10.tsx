import React, { useState } from 'react'
import { View, Text, Image, Pressable, StyleSheet,  FlatList } from 'react-native'


export default function Page10() {
  
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 8' },
    { id: '3', title: 'Task 3' },

  ]);
  
  
  return (
    <View style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://your-image-url.com/profile.jpg' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.name}>Jorge Blasquez</Text>
        <Text style={styles.title}>Engineer</Text>
      </View>
      
      {/* Information Boxes */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Equipo</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Miembro desde</Text>
        </View>
      </View>

      {/* Tasks Section */}
      <View style={styles.tasksContainer}>
        <Text style={styles.tasksTitle}>Task's</Text>
        
        {/* Dynamic Task List */}
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item.title}</Text>
            </View>
          )}
        />
      </View>

      {/* Download Button with Pressable */}
      <Pressable 
        style={({ pressed }) => [
          styles.downloadButton,
          pressed && styles.downloadButtonPressed,
        ]}
        onPress={() => console.log('Download button pressed')}
      >
        {({ pressed }) => (
          <Text 
            style={[
              styles.downloadButtonText, 
              pressed && styles.downloadButtonTextPressed
            ]}
          >
            Download CV
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#8E72FF', 
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: '#8E72FF',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 20,
  },
  infoBox: {
    backgroundColor: '#F3F4F6',
    width: '40%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
  },
  taskText: {
    fontSize: 16,
    borderWidth: 2,
    padding: 5,
    borderColor: '#D3D3D3', 
    borderRadius: 5, 
  },
  tasksContainer: {
    width: '80%',
    padding: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginBottom: 30,
  },
  tasksTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    
  },
  taskItem: {
    // Define the style for individual task items
  },
  downloadButton: {
    backgroundColor: '#8E72FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  downloadButtonPressed: {
    backgroundColor: '#715AFF',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  downloadButtonTextHovered: {
    textDecorationLine: 'underline',
  },
  downloadButtonTextPressed: {
    color: '#D0D0FF',
  },
  
});
