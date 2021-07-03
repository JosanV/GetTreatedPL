import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Background from '../components/Background'
import Button from '../components/Button'
import Logo from '../components/Logo'
import Header from '../components/Header'
import { theme } from '../core/theme'


const Home = ({navigation}, props) => {

    return (
        <Background>
            <Logo />
            <View >
                <Header >Welcome to Get Treated PL</Header>

                <Text style={styles.text1}>What diagnosis do you want to have?</Text>

                <TouchableOpacity style={styles.button} onPress = {()=>navigation.navigate('CovidDiag')} >
                
                    <Text style={styles.text2}>COVID-19</Text>
                    
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('GeneralDiag')}>
                
                <Text style={styles.text2}>Other Diagnosis</Text>
            </TouchableOpacity>

            </View>
        </Background>
    )

    

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    text1: {
      marginTop: 30,
      marginBottom: 15,
      fontSize: 18,
      textAlign: 'center',
    },
    text2: {
      color: 'white',
    },
    button: {
      margin: 5,
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 4,
    },
  });

export default Home
