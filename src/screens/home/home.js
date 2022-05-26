import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
} from "react-native";

//importing image
import cats from "../../data/cats";

//env variable
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

function Home(googleData) {
  const { email, given_name, name } = googleData.route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 60 }} />
      <View style={{ flex: 1 }}>
        <Profile />
      </View>
      <View style={{ height: 60 }} />
    </View>
  );
}

//animated cat render
const Profile = () => {
  return cats.map((cat, i) => {
    return (
      <Animated.View
        key={i}
        style={{
          height: SCREEN_HEIGHT - 120,
          width: SCREEN_WIDTH,
          padding: 10,
          position: "absolute",
        }}
      >
        <Image
          style={{
            flex: 1,
            height: null,
            width: null,
            resizeMode: "cover",
            borderRadius: 20,
          }}
          source={cat.uri}
        />
      </Animated.View>
    );
  });
};

export default Home;
