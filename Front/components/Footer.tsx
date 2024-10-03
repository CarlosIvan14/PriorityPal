import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface FooterProps {
  style?: ViewStyle; 
}

type FooterNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Footer: React.FC<FooterProps> = ({ style }) => {
  const navigation = useNavigation<FooterNavigationProp>();

  return (
    <View style={[styles.footer, style]}>
      <View style={styles.rowContainer}>
        <TouchableOpacity testID="go-to-page9" onPress={() => navigation.navigate('Page9')}>
          <Image source={require('../public/mensajes.jpg')} style={styles.buttomImage} />
        </TouchableOpacity>
        <TouchableOpacity testID="go-to-page5" onPress={() => navigation.navigate('Page5')}>
          <Image source={require('../public/tareas.jpg')} style={styles.buttomImage} />
        </TouchableOpacity>
        <TouchableOpacity testID="go-to-page2" onPress={() => navigation.navigate('Page2')}>
          <Image source={require('../public/home.jpg')} style={styles.buttomImage} />
        </TouchableOpacity>
        <TouchableOpacity testID="go-to-page10" onPress={() => navigation.navigate('Page10')}>
          <Image source={require('../public/perfil.jpg')} style={styles.buttomImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#30AFAF',
    padding: 10,
    alignItems: 'center',
    height: '9%',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  buttomImage: {
    width: 55,
    height: 55,
    marginHorizontal: 20,
  },
});

export default Footer;
