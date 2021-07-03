import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../screens/Home'
import QuestionAnswer from '../screens/QuestionAnswer'
import Map from '../screens/Map'
import Account from '../screens/Account'


const Tab = createBottomTabNavigator();


export default function BottomTabNav(props) {


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home'
                    } else if (route.name === 'QuestionAnswer') {
                        iconName = 'message'
                    } else if (route.name === 'Map') {
                        iconName = 'map-marker'
                    } else if (route.name === 'Account') {
                        iconName = 'account'
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
            })}


            tabBarOptions={{
                activeTintColor: "#2541B2",
                inactiveTintColor: 'gray',
                showLabel: false
            }}
        >


            <Tab.Screen name="Home" component={Home} options={{
                title: "Home",
            }} />
            <Tab.Screen name="QuestionAnswer" component={QuestionAnswer} options={{
                title: "Questions & Answers",
            }} />
            
            <Tab.Screen name="Map" component={Map} options={{
                title: "Map",
            }} />
            <Tab.Screen name="Account" component={Account} options={{
                title: "Account",
            }} />

        </Tab.Navigator>
    )
}


