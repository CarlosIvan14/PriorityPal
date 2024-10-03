import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from '../navigation/MainStack'; // Asegúrate de usar la ruta correcta a tu MainStack

describe('Navigation Test', () => {
  test('Navigates between Page1, Page3 and Page6', () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    );

    // Verificar que Page1 está renderizada por defecto (LOGIN)
    expect(getByText('Remember Me')).toBeTruthy(); // Asegúrate que este texto existe en Page1 para comprobar que estamos ahí

    // Simular la navegación a Page3 (Primer boton de nuestra navbar que nos lleva Homeg)
    fireEvent.press(getByTestId('go-to-page3')); // Simula un botón o evento que te lleva a Page3
    expect(getByText('Admin Home')).toBeTruthy(); // Asegúrate de que este texto exista en Page3 (Comprobamos que estamos ahí)

    // Simular la navegación a Page6 (Segundo Boton de la Navbar que nos lleva a Tareas y equipos)
    fireEvent.press(getByTestId('go-to-page6')); // Simula un botón o evento que te lleva a Page6
    expect(getByText('Equipo 1')).toBeTruthy(); // Asegúrate de que este texto exista en Page6 (Comprobamos que estamos ahí)

  });
});