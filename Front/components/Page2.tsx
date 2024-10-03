import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Page2NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Page2 = () => {
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation<Page2NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.pagetitle}></Text>
      <View style={styles.boxcontainer1}>
        <View style={styles.blackbox}>
          <TouchableOpacity onPress={() => navigation.navigate('Page5')}>
            <Text style={styles.boxtitle}>Lista de Tareas</Text>
            <Image source={require('../public/gototareas.jpg')} style={styles.buttomImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.blackbox}>
          <TouchableOpacity onPress={() => navigation.navigate('Page9')}>
            <Text style={styles.boxtitle}>Chat de equipo</Text>
            <Image source={require('../public/gotomesajes.jpg')} style={styles.buttomImage} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.boxcontairne2}>
        <View style={styles.blackbox}>
          <TouchableOpacity onPress={() => navigation.navigate('Page10')}>
            <Text style={styles.boxtitle}>Perfil</Text>
            <Image source={require('../public/gotoperfil.jpg')} style={styles.buttomImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blackbox: {
    backgroundColor: '#9D9D9E',
    width: 150,
    height: 150,
  },
  boxcontainer1: {
    marginRight: 30,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxcontairne2: {
    marginTop: 100,
    margin: 130,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttomImage: {
    width: 70,
    height: 70,
    marginTop: 10,
    marginLeft: 35,
  },
  boxtitle: {
    fontFamily: 'Montserrat',
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 20,
  },
  pagetitle: {
    backgroundColor: '#30AFAF',
    color: 'white',
    marginBottom: 160,
    width: '100%',
    height: 30,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  }
});

export default Page2;
