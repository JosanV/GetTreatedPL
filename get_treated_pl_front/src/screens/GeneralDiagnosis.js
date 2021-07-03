import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Button, Alert} from 'react-native'
import Background from '../components/Background'
import CheckBox from '@react-native-community/checkbox'
import { theme } from '../core/theme'
import Logo from '../components/Logo'
import BackButton from '../components/BackButton'
import Header from '../components/Header'

const GeneralDiagnosis = ({navigation}, props) => {

    const [isSelected, setSelection] = useState({});
    const fields = ['Fever', 'Cough', 'Lack of taste', 'Lack of smell', 'Chills', 'Shortness of breath or difficulty breathing', 'Fatigue', 
                    'Muscle or body aches', 'Sore throat']

    const setSelectionToggle = (key) => {
        const oldIsSelected = {...isSelected}
        oldIsSelected[key] = !oldIsSelected[key]
        setSelection(oldIsSelected)
    }

    const onPressSubmit = () => {
        Alert.alert(
            "Submission Successfull",
            "Thank you for submitting your diagnosis, You will be contacted if your case needs medical attention!",
            [
              { text: "OK", onPress: onOK }
            ],
            { cancelable: false }
          );
    }

    const onOK = () =>{
        navigation.navigate('Home')
    }

    const renderFields = () => {
        const dataToPush = []
        for (let index = 0; index < fields.length; index++) {
            const element = fields[index];
            dataToPush.push(
                <View key={'Symptom_' + element} style = {[styles.row, styles.line]}>
                    <Text key={'Symptom_' + element}>{element}</Text>
                    <CheckBox
                        key={'Symptom_' + element}
                        value={isSelected[element]}
                        onValueChange={() => setSelectionToggle(element)}
                        style={styles.checkbox}
                    />
              </View>
            )
        }
        return dataToPush
    }

    return (
        <Background>
        <BackButton goBack={navigation.goBack} />
      {/* <View style = {styles.container}> */}
        <Logo />
          <Header>Check your symptoms</Header>
          <View style={styles.box}>
            {renderFields()}
          </View>
          <Button
            style={styles.button}
            color={theme.colors.primary}
            title="Submit"
            onPress= {onPressSubmit}
          />
      {/* </View> */}
      </Background>
    )

    

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    button: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
    },
    row:{
        flexDirection: "row",
    },
    line: {
        
    },
    checkbox: {
        alignSelf: "center",
      },
  });

export default GeneralDiagnosis

