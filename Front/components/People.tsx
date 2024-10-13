import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from './UserContext'; // Importa el hook
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
// Define una interfaz para representar la estructura del usuario
interface User {
    _id: string;
    name: string;
}
type PeopleNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PeopleScreen = () => {
    const [users, setUsers] = useState<User[]>([]); // Aplica el tipo User[] al estado
    const { user } = useUser();
    const currentUserId = user._id;
    const navigation = useNavigation<PeopleNavigationProp>();
    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/users`);
            const data: User[] = await response.json(); // Especifica que la respuesta será un arreglo de User

            // Filtrar los usuarios para excluir al usuario con la sesión iniciada
            const filteredUsers = data.filter(user => user._id !== currentUserId);
            setUsers(filteredUsers);
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Contactos disponibles
                </Text>
            </View>
            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.messageContainer}>
                        <View style={styles.messageContainer2}>
                            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Page9_1', {name: item?.name, receiverId: item?._id})}>
                            <Text style={styles.buttonText}>Crear Chat</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No hay contactos disponibles</Text>}
            />
        </SafeAreaView>
    );
};

export default PeopleScreen;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1E2F57',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
      },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A4A4A',
        textAlign: 'center', 
        marginTop: 12
      },
    messageContainer: {
        padding: 10, 
        flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    messageContainer2: {
        padding: 10, 
        flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'space-between',
        borderBottomColor: '#E0E0E0',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
});
