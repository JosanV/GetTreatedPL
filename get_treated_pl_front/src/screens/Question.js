import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { logoutUser, getUserToken } from '../api/auth-api'
import 'firebase/auth'
import {StyleSheet, Text, View, FlatList, Image, Alert, TextInput, Button } from 'react-native'
import { useState, useEffect } from 'react'
import { theme } from '../core/theme'
import BackButton from '../components/BackButton'
import { ScrollView } from 'react-native-gesture-handler'
import apiService from '../api/apiService'

export default function Question({ route }) {
  const [answers, updateAnswers] = useState([])
  const getAnswersLocal = async (id) => {
      try {
          console.log("Local get")
          const res = await apiService.getAnswers(id);
          updateAnswers(res.data.answers)
      } catch (e) {
          alert(e)
      }
  }

  useEffect(() => {
      getAnswersLocal(route.params.id);
      console.log("testsetsetsetestest");
      console.log(route.params.id);
  }, [])


  // const [answers] = useState([
  //   { name: 'Cedric', id: '1', answer: 'Hello, I went to an ophthalmologist who speaks english and it was a very good experience. It was located in the Street Whatever No: 20' },
  //   { name: 'Mark', id: '2', answer: 'Thanks for the help Cedric' },
  //   { name: 'Cedric', id: '3', answer: 'No problem, if you need more help, just let me know' },
  //   { name: 'John', id: '4', answer: 'My friend had the same problem and he found a very good one on the Street NameOfStreet No:14, I recommend it too' },
  //   { name: 'Mark', id: '5', answer: 'Thanks too John, I will go to one of those 2 for sure!' },
  // ]); 

  const [response, setResponse] = React.useState('');
  // const res = await apiService.sendAnswer( { content : response }, route.params.id )
  

  return (
      <FlatList style={styles.container}
          contentContainerStyle={{ paddingBottom: 105}}
          keyExtractor={(item) => item.id}
          data={answers}
          removeClippedSubviews={false}
          ListHeaderComponent={(
            <View>
                <Text style={styles.title}>{route.params.title}</Text>
                <View style={styles.labelContainerFirst}>
                  <Text style={styles.text}>{route.params.description}</Text>
                  <Text style={styles.username}>{route.params.name}</Text>
                </View>
              </View>
          )}

          renderItem={({ item }) => (
            <View style={styles.labelContainer}>
              <Text style={styles.text}>{item.content}</Text>
              {/* <Text style={styles.username}>{item.name}</Text> */}
            </View>
            
          )}

          ListFooterComponent={(
           <View>
              <Text style={styles.title}>Write an answer</Text>
              <TextInput multiline
                label="Response"
                style={styles.textinput}
                onChangeText={(text) => setResponse({ value: text})}
                value={response}
                
              />
              <Button
                style={styles.button}
                color={theme.colors.primary}
                title="Submit"
                onPress={async () => await apiService.sendAnswer( { content : response.value }, route.params.id )}
                // onPress={() => console.log(response.value)}
                
              />
           </View>
          )}
      />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    maxWidth: 360,
    alignSelf: 'center',
    paddingTop: 40,
    width: '100%',
  },
  title: {
    fontSize: 30,
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'justify',
    padding: 20,
    backgroundColor: theme.colors.surface,
  },
  username: {
    fontSize: 16,
    textAlign: 'right',
    paddingRight: 15,
    color: 'white',
    
  },
  labelContainerFirst: {
    backgroundColor: '#30336b',
    padding: 5,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 10,
  },
  labelContainer: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  textinput: { 
    maxHeight: 180, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 6,
  },
});
