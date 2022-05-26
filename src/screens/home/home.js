import * as React from "react";
import { View, Text } from "react-native";

function Home(googleData) {
  console.log(googleData);
  const { email, given_name, name } = googleData.route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>{email}</Text>
      <Text>{given_name}</Text>
      <Text>{name}</Text>
    </View>
  );
}

export default Home;
