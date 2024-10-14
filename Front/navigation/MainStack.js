import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Page1 from '../components/Page1';
import Page2 from '../components/Page2';
import Page4 from '../components/Page4';
import Page5 from '../components/Page5';
import Page9_1 from '../components/Page9_1';
import Page11 from '../components/Page11';
import Page12 from '../components/Page12';
import Page3 from '../components/Page3';
import Page6 from '../components/Page6';
import Page7 from '../components/Page7';
import Page8 from '../components/Page8';
import Page9 from '../components/Page9';
import Page10 from '../components/page10';
import PeopleScreen from '../components/People'
import ChatRoom from '../components/ChatRoom';
const Stack = createNativeStackNavigator()

const MainStack = () => {
  return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false,
            }}
        >

            <Stack.Screen
                name='Page1'
                component={Page1}
            />

            <Stack.Screen
                name='Page2'
                component={Page2}
            />

            <Stack.Screen
                name='Page3'
                component={Page3}
            />

            <Stack.Screen
                name='Page4'
                component={Page4}
            />

            <Stack.Screen
                name='Page5'
                component={Page5}
            />

            <Stack.Screen
                name='Page6'
                component={Page6}
            />
 
            <Stack.Screen
                name='Page7'
                component={Page7}
            />

            <Stack.Screen
                name='Page8'
                component={Page8}
            />


            <Stack.Screen
                name='Page9'
                component={Page9}
            />

            <Stack.Screen
                name='Page9_1'
                component={Page9_1}
            />

            <Stack.Screen
                name='Page10'
                component={Page10}
            />

            <Stack.Screen
                name='Page11'
                component={Page11}
            />

            <Stack.Screen
                name='Page12'
                component={Page12}
            />

            <Stack.Screen
                name='Footer'
                component={Page1}
            />
            
            <Stack.Screen
                name='People'
                component={PeopleScreen}
            />

            <Stack.Screen
                name='ChatRoom'
                component={ChatRoom}
            />
            </Stack.Navigator>
  );
};


export default MainStack;
