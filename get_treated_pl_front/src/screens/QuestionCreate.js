import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { logoutUser, getUserToken } from '../api/auth-api'
import 'firebase/auth'
import {StyleSheet, Text, View, FlatList, Image, Alert, TextInput, Button, LogBox } from 'react-native'
import { useState } from 'react'
import { theme } from '../core/theme'
import BackButton from '../components/BackButton'
import { ScrollView } from 'react-native-gesture-handler'
import apiService from '../api/apiService'

export default function QuestionCreate({ route}) {
 const [title, setTitle] = React.useState('');
 const [description, setDescription] = React.useState('');

  return (
    <Background>
    <View style={styles.container}>
      <Header>Create a new question</Header>
      <View>
        <Text style={styles.title}>Title</Text>
        <TextInput
          label="Title"
          style={styles.textinputTitle}
          onChangeText={(text) => setTitle({ value: text})}
          value={title}
          
        />
        <Text style={styles.title}>Question</Text>
        <TextInput multiline
          label="Answer"
          style={styles.textinputQuestion}
          onChangeText={(text) => setDescription({ value: text})}
          value={description}
          
        />
        <Button
          style={styles.button}
          color={theme.colors.primary}
          title="Submit"
          onPress={async () => await apiService.newQuestion( { title : title.value , description : description.value, language: "English"})}
        />
      </View>
    </View>
    </Background>
     

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    maxWidth: 360,
    paddingTop: 80,
    width: '100%',
  },
  title: {
    fontSize: 30,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  button: {
    width: '100%',
    marginVertical: 10,
  },
  textinputTitle: { 
    maxHeight: 180, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 6,
  },
  textinputQuestion: {  
    height: 200,
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 6,
    lineHeight: 0,
  },
});
