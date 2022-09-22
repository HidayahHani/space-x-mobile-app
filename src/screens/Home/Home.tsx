import React from "react";
import { View, Text, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};

type HomeProps = StackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {
  return (
    <View>
      <Text>Home Screen!</Text>
      <Button
        title="Go to Detail Screen"
        onPress={() => navigation.navigate("Detail")}
      />
    </View>
  );
};

export default Home;
