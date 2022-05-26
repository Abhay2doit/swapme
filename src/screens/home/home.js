//react import
import React, { useState, useEffect, useRef, useMemo } from "react";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder,
} from "react-native";

//importing image
import cats from "../../data/cats";

//env variable
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

function Home({ googleData }) {
  //useState
  const [currentIndex, setCurrentIndex] = useState(0);
  // const { email, given_name, name } = googleData.route.params;

  //seting up PanResponder
  //it may need to be added in the useEffect
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  // animated cat render
  const Profile = () => {
    return cats.map((cat, i) => {
      if (i < currentIndex) {
        return null;
      } else if (i == currentIndex) {
        return (
          <Animated.View
            key={i}
            {...panResponder.panHandlers}
            style={[
              { transform: pan.getTranslateTransform() },
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: "absolute",
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
              source={cat.uri}
            />
          </Animated.View>
        );
      } else {
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
      }
    });
  };

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

export default Home;
