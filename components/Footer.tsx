import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity,Image } from 'react-native';

interface FooterProps {
  style?: ViewStyle; 
}

const Footer: React.FC<FooterProps> = ({ style }) => {
  return (
    <View style={styles.footer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity>
              <Image source={require('../public/chat.png')} style={styles.buttomImage}/>
          </TouchableOpacity>
          <TouchableOpacity>
              <Image source={require('../public/lista.png')} style={styles.buttomImage}/>
          </TouchableOpacity>
          <TouchableOpacity>
              <Image source={require('../public/home.png')} style={styles.buttomImage}/>
          </TouchableOpacity>
          <TouchableOpacity>
              <Image source={require('../public/user.png')} style={styles.buttomImage}/>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex:1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#6f78fd',
    padding: 10,
    alignItems: 'center',
    height:'9%',
  },
  footerText: {
    fontFamily:'Montserrat',
    color: 'white',
    fontSize: 16,
  },
  rowContainer:{
    flexDirection:'row',
  },
  buttomImage:{
    width:55,
    height:55,
    marginHorizontal:20,
  }
});

export default Footer;
