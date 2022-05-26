import * as React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";

//env variable
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

function Home(googleData) {
  console.log(googleData);
  const { email, given_name, name } = googleData.route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 60 }}></View>
      <View style={{ flex: 1 }}>{renderUsers()}</View>
      <View style={{ height: 60 }}></View>
    </View>
  );
}

export default Home;
