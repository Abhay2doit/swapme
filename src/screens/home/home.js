import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
} from "react-native";

//

//env variable
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

function Home(googleData) {
  console.log(googleData);
  const { email, given_name, name } = googleData.route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 60 }} />
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[
            {
              height: SCREEN_HEIGHT - 120,
              width: SCREEN_WIDTH,
              padding: 10,
            },
          ]}
        >
          <Image
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: "cover",
              borderRadius: 20,
            }}
            source={Users[0].uri}
          />
        </Animated.View>
      </View>
      <View style={{ height: 60 }} />
    </View>
  );
}

export default Home;
