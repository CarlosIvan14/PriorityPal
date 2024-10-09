import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useUser } from './UserContext'; // Importa el hook

type Page3NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Page3 = () => {
    const navigation = useNavigation<Page3NavigationProp>();
    const { user } = useUser(); // Obtén los datos del usuario del contexto

    return (
        <View style={styles.container}>
            <Text style={styles.pagetitle}></Text>
                    {user?.role === 'Admin' && (
                        <View style={styles.graybox}>
                            <View style={styles.bluebox}>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Page12')}>
                                    <Text style={styles.title}>
                                        Añadir{'\n'} 
                                        Persona
                                    </Text>
                                    <Image source={require('../public/addPerson.jpg')} style={styles.buttonImage} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
            <View style={styles.graybox}>
                <View style={styles.bluebox}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Page11')}>
                        <Text style={styles.title}>
                            Añadir{'\n'} 
                            Tarea
                        </Text>
                        <Image source={require('../public/addTask.jpg')} style={styles.buttonImage} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.graybox}>
                <View style={styles.bluebox}>
                    {user?.role === 'Lider' && (
                        <TouchableOpacity testID="go-to-page5" style={styles.button} onPress={() => navigation.navigate('Page5')}>
                            <Text style={styles.title}>
                                Ver
                                {'\n'}Equipo
                            </Text>
                            <Image source={require('../public/addTeam.jpg')} style={styles.buttonImage} />
                        </TouchableOpacity>
                    )}
                    {user?.role !== 'Lider' && (
                        <TouchableOpacity testID="go-to-page65" style={styles.button} onPress={() => navigation.navigate('Page6')}>
                            <Text style={styles.title}>
                                Equipos
                                {'\n'}y Areas
                            </Text>
                            <Image source={require('../public/addTeam.jpg')} style={styles.buttonImage} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },
    graybox: {
        backgroundColor: '#9D9D9E',
        width: '85%',
        height: 150,
        alignItems: 'center',
        marginTop: 40,
    },
    bluebox: {
        backgroundColor: '#30AFAF',
        width: '95%',
        height: 135,
        marginTop: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'left',
        lineHeight: 30,
    },
    pagetitle: {
        backgroundColor: '#30AFAF',
        color: 'white',
        width: '100%',
        height: 30,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        paddingHorizontal: 20,
    },
    buttonImage: {
        height: 100,
        width: 100,
    },
});

export default Page3;
