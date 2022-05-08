import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import userData from '../data/userData.json'

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    const [animating, setAnimating] = useState(false);
  
    const [error, setError] = useState(false);
  
    const submitForm = () => {
      setError(false);
      setAnimating(true);
      setTimeout(() => {
        userData.forEach(user => {
          if(user.email === email && user.password === password) {
            //navigate and return
          }else {
            setError(true);
          }
          setAnimating(false);
        })
      }, 2000)
    }
  
    return (
      <View style={animating?styles.opaqueContainer:styles.container}>
        {/* {animating?<ActivityIndicator
          size="large"
          style={styles.activityIndicator}
        />:null} */}
        <Text style={styles.header}>SWAP ME</Text>
        <View style={styles.subContainer}>
          <Text>Email</Text>
          <TextInput
            placeholder='abc@example.com'
            style={styles.emailField}
            value={email}
            onChangeText={(value) => { setEmail(value) }}
          />
          <Text style={styles.passwordText}>Password</Text>
          <TextInput
            style={styles.passwordField}
            value={password}
            secureTextEntry={true}
            onChangeText={(value) => { setPassword(value) }}
          />
          {error?
            <Text style={styles.errorText}>Invalid credentials</Text>
            :null}
          <Text></Text>
          <Button
            title='Login'
            onPress={submitForm}>
          </Button>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#0698b1'
    },
    opaqueContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#0698b1',
      opacity: 0.8
    },
    header: {
      fontSize: 40,
      color: 'white'
    },
    subContainer: {
      width: 350,
      backgroundColor: 'white',
      padding: 20,
      borderWidth: 2,
      borderRadius: 15,
      borderColor: 'skyblue'
    },
    emailField: {
      borderWidth: 1,
      padding: 5,
      borderRadius: 5
    },
    passwordText: {
      marginTop: 10
    },
    passwordField: {
      borderWidth: 1,
      padding: 5,
      borderRadius: 5
    },
    errorText: {
      color: 'red',
      alignSelf: 'center'
    },
    activityIndicator: {
      // position: 'absolute',
      // backgroundColor: 'red'
    }
  });

  export default Login;