import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface User {
  id: string;
  name: string;
}

interface UserListProps {
  names: User[];
}

const UserList: React.FC<UserListProps> = ({ names }) => (
  <View style={styles.userListContainer}>
    {names.map(user => (
      <View key={user.id} style={styles.userItem}>
        <View style={styles.avatar} />
        <Text style={styles.userName}>{user.name}</Text>
      </View>
    ))}
  </View>
);

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
