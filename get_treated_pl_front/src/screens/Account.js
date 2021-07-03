import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Title } from 'react-native-paper'
import apiService from '../api/apiService'
import { logoutUser } from '../api/auth-api'
import { Avatar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../components/Header'
import Background from '../components/Background'
const Account = (props) => {

    const [user, setUser] = useState(null)
    const logout = () => {
        logoutUser()
    }


    const getCurrentUser = async () => {
        try {
            const res = await apiService.getUser();
            setUser(res.data.user)
        } catch (e) {
            alert(e)
        }
    }

    // when the component is loaded, getting the current user
    useEffect(() => {
        getCurrentUser();
    }, [])


    return (
        <Background>
        <View style={{ flex: 1, paddingTop: 20 }}>
            <ScrollView>
                <Header>Account</Header>
                {user && <View style={{ alignItems: "center" }}>
                    <Avatar.Image size={200} source={require('../assets/profile.png')} />
                    <Title>Name : {user.name}</Title>
                    <Title>Email : {user.email}</Title>
                    <Title>Languages : {user.spokenLanguages[0]}, {user.spokenLanguages[1]}</Title>
                </View>}
                <Button Press={logout}>Log out</Button>
            </ScrollView>

        </View>
        </Background>
    )

}

const styles = StyleSheet.create({
    logout: {
        marginTop: 200,
        
    }

});




export default Account
