import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import userData from "../data/userData.json";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "640386546445-fh7iv04kbgq9me7m7m7pcmm2locg5b8e.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    webClientId:
      "640386546445-mjvktu2jhbtnfcjmpfhej3hcl1rf4nls.apps.googleusercontent.com",
  });

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [animating, setAnimating] = useState(false);

  const [error, setError] = useState(false);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    if (response?.type === "success") {
      const {
        authentication: { accessToken },
      } = response;
      async function getUserData() {
        let response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
            accessToken
        );
        setApiData(await response.json());
      }
      getUserData();
      console.log({ apiData });
    }
  }, [response]);

  const submitForm = () => {
    setError(false);
    setAnimating(true);
    setTimeout(() => {
      userData.forEach((user) => {
        if (user.email === email && user.password === password) {
          //navigate and return
        } else {
          setError(true);
        }
        setAnimating(false);
      });
    }, 2000);
  };

  return (
    <View style={animating ? styles.opaqueContainer : styles.container}>
      {/* {animating?<ActivityIndicator
          size="large"
          style={styles.activityIndicator}
        />:null} */}
      {apiData ? (
        <View>
          <Text>Welcome {apiData.name}</Text>
          <Image style={styles.userImage} source={{ uri: apiData.picture }} />
        </View>
      ) : null}
      <Text style={styles.header}>SWAP ME</Text>
      <View style={styles.subContainer}>
        <Text>Email</Text>
        <TextInput
          placeholder="abc@example.com"
          style={styles.emailField}
          value={email}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
        <Text style={styles.passwordText}>Password</Text>
        <TextInput
          style={styles.passwordField}
          value={password}
          secureTextEntry={true}
          onChangeText={(value) => {
            setPassword(value);
          }}
        />
        {error ? (
          <Text style={styles.errorText}>Invalid credentials</Text>
        ) : null}
        <Text></Text>
        <Button title="Login" onPress={submitForm}></Button>
      </View>
      <Text>Or</Text>
      <Button
        title=" Sign In with Google"
        disabled={!request}
        onPress={promptAsync}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#0698b1",
  },
  opaqueContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#0698b1",
    opacity: 0.8,
  },
  header: {
    fontSize: 40,
    color: "white",
  },
  subContainer: {
    width: 350,
    backgroundColor: "white",
    padding: 20,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "skyblue",
  },
  emailField: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  passwordText: {
    marginTop: 10,
  },
  passwordField: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    alignSelf: "center",
  },
  activityIndicator: {
    // position: 'absolute',
    // backgroundColor: 'red'
  },
  userImage: {
    height: 100,
    width: 100,
  },
});

export default Login;
