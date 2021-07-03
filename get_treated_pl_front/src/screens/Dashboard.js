import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { logoutUser, getUserToken } from '../api/auth-api'
import 'firebase/auth'
import {StyleSheet, Text, View, FlatList, Image, Alert } from 'react-native'
import { useState } from 'react'
import { theme } from '../core/theme'


export default function Dashboard({ navigation }) {
  const [people] = useState([
    { name: 'Ex1', id: '1', title: 'Example1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan iaculis urna, nec vulputate lorem pretium vitae. Praesent sed libero a dui ornare laoreet. Praesent lobortis feugiat risus. ' },
    { name: 'ex2', id: '2', title: 'Example2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan iaculis urna, nec vulputate lorem pretium vitae. Praesent sed libero a dui ornare laoreet. Praesent lobortis feugiat risus. ' },
    { name: 'ex3', id: '3', title: 'Example3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan iaculis urna, nec vulputate lorem pretium vitae. Praesent sed libero a dui ornare laoreet. Praesent lobortis feugiat risus. ' },
    { name: 'ex4', id: '4', title: 'Example4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan iaculis urna, nec vulputate lorem pretium vitae. Praesent sed libero a dui ornare laoreet. Praesent lobortis feugiat risus. ' },
    { name: 'ex5', id: '5', title: 'Example5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan iaculis urna, nec vulputate lorem pretium vitae. Praesent sed libero a dui ornare laoreet. Praesent lobortis feugiat risus. ' },
    { name: 'ex6', id: '6', title: 'Example6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan iaculis urna, nec vulputate lorem pretium vitae. Praesent sed libero a dui ornare laoreet. Praesent lobortis feugiat risus. ' },
  ]);

  // buttonAlert=()=>{
  //   Alert.alert(
  //     'You are being redirected', 'Do you want to continue?',
  //     [
  //       {text: 'Yes', onPress: () => navigation.navigate('Question')},
  //       {text: 'Cancel', onPress: () => console.log('Cancel button clicked')},
  //     ],
  //     { 
  //       cancelable: false 
  //     }
  //   );
  // }

  return (
    <View style={styles.container}>
      
      <Header>Questions & Answers</Header>
      
      <FlatList 
        contentContainerStyle={{ paddingBottom: 170 }}
        keyExtractor={(item) => item.id} 
        data={people} 
        renderItem={({ item }) => ( 
          <Text style={styles.item} onPress={() => navigation.navigate('Question', {
            title: item.title,
            name: item.name,
            description: item.description,})}>
            <Text style={styles.title} >{item.title}</Text>
            {/* <Image source={require('../assets/arrow-right-circle.png')} /> */}
            <Text style={styles.description}> {"\n"}{"\n"}{item.description} {"\n"}{"\n"}</Text>
            <Text style={styles.user}> From {item.name}</Text>
          </Text>
          
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 10,
    marginTop: 14,
    padding: 30,

    fontSize: 14,
    textAlign: 'justify',
    borderRadius:10,
    
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
});

// function Item({ item }) {
//   return (
//     <View style={styles.listItem}>
//       <Text style={styles.title}>{item.name}</Text>
//     </View>
//   );
// }


// // export default Dashboard