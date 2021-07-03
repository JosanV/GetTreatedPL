import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { logoutUser, getUserToken } from '../api/auth-api'
import 'firebase/auth'
import { StyleSheet, Text, View, FlatList, Image, Alert, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { theme } from '../core/theme'
import ActionButton from 'react-native-action-button'
import apiService from '../api/apiService'


export default function Dashboard({ navigation }) {
    const [questions, updateQuestions] = useState([])
    const getQuestionsLocal = async () => {
        try {
            console.log("Local get")
            const res = await apiService.getQuestions();
            updateQuestions(res.data.questions)
        } catch (e) {
            alert(e)
        }
    }

    // useEffect(() => {
    //     getQuestionsLocal();
    // }, [])

    

    // const [people] = useState([
    //     { name: 'Mark', id: '1', title: 'I need to see an eye doctor', description: 'I am US national coming to Lodz this February, I have lost my glasses and my prescription is at home. Where could I get a new one here? I dont speak Polish.' },
    //     { name: 'Cedric', id: '2', title: 'Do I need to undergo quarantine at home here', description: 'Arriving tomorrow from Spain, I have read that I need to undergo a quarantine here. Are there any exceptions? I am coming for a business critical trip for my company if this can help.' },
    //     { name: 'John', id: '3', title: 'Do you know a reliable family doctor that speaks French', description: 'I will be moving to Lodz in September 2021 with my family. We would want to find a good doctor as soon as possible. We will be located in Srodmiescie, do you have any recommendations?.' },
    //     { name: 'Angela', id: '4', title: 'Need doctor after testing positive for COVID', description: 'Hello guys, I am Antonino from Italy, I recently had a covid test and gave positive. I have tried to contact a doctor who speaks my language or english, but I cant find one. I know there are more students in Lodz so if someone had the same problem and resolved it, I would like to talk to him!' },
    //     { name: 'Bryan', id: '5', title: 'Where do I get my cast removed?', description: 'My arm is in a cast right now. I need to have it removed here because I cannot go back to my country just yet. Is it better to go to a clinic or a hospital?' },
    //     { name: 'Marcel', id: '6', title: 'What should I do if my pet gets sick and I think it’s COVID-19?', description: 'My pet has symptoms of COVID (sneezes and fever). I am afraid he may be infected... Should I still walk him like I always do on the street or should I keep him at home for some time. Do I need to have a PCR test done?' },
    // ]);


    return (
        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        
        <View style={styles.container}>    
            <FlatList
                contentContainerStyle={{ paddingBottom: 50 }}
                keyExtractor={(item) => item.id}
                data={questions}
                renderItem={({ item }) => (
                    <Text style={styles.item} onPress={() => navigation.navigate('Question', {
                        title: item.title,
                        name: item.name,
                        description: item.description,
                        id: item._id,
                    })}>
                        <Text style={styles.title} >{item.title}</Text>
                        <Text style={styles.description}> {"\n"}{"\n"}{item.description} {"\n"}{"\n"}</Text>
                        <Text style={styles.user}> From {item.name}</Text>
                    </Text>

                )}
                ListHeaderComponent={(
                    <Header>Questions & Answers</Header>
                )}

                
            />
        </View>

        <ActionButton onPress={() => navigation.navigate('QuestionCreate')} buttonColor='black'>
        </ActionButton>
      </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    item: {
        
        backgroundColor: theme.colors.primary,
        marginHorizontal: 10,
        marginTop: 14,
        padding: 30,

        fontSize: 14,
        textAlign: 'justify',
        borderRadius: 10,

    },
    title: {
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    description: {
        color: '#fff',
        fontSize: 14,

    },
    user: {
        color: 'red',
        fontSize: 14,
    },
    image: {
        
        
    }

});
