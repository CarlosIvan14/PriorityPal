import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface User {
  id: string;
  name: string;
}

interface UserListProps {
  names: User[];
}

type UserListNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const UserList: React.FC<UserListProps> = ({ names }) => {
  const navigation = useNavigation<UserListNavigationProp>();

  return (
    <View style={styles.userListContainer}>
      {names.map(user => (
        <TouchableOpacity 
          key={user.id} 
          style={styles.userItem} 
          onPress={() => navigation.navigate('Page4')}
        >
          <View style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  userListContainer: {
    width: '100%',
    backgroundColor: '#2c2c2c',
    padding: 10,
    borderRadius: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5f77ef',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserList;
