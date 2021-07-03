import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CovidDiagnosis from '../screens/CovidDiagnosis';
import GeneralDiagnosis from '../screens/GeneralDiagnosis';
import BottomTabNav from './BottomTabNav'
import {
    AuthLoadingScreen,
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    Question,
    QuestionCreate,
} from '../screens'

const Stack = createStackNavigator();


function RootNavigator(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="AuthLoadingScreen"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="AuthLoadingScreen"
                    component={AuthLoadingScreen}
                />
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="CovidDiag" component={CovidDiagnosis} />
                <Stack.Screen name="GeneralDiag" component={GeneralDiagnosis} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                {/* <Stack.Screen name="PageExample" component={ExamplePage} /> */}
                <Stack.Screen
                    name="ForgotPasswordScreen"
                    component={ForgotPasswordScreen}
                />
                <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
                <Stack.Screen name="Question" component={Question} />
                <Stack.Screen name="QuestionCreate" component={QuestionCreate} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default RootNavigator
