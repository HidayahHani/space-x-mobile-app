import React, { useState, useEffect } from "react";
import { View, Text, Button, Pressable } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useQuery } from "@apollo/client";
import { GET_ROCKETS } from "../../gql/Query";

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};

type HomeProps = StackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {
  const { data, error, loading } = useQuery(GET_ROCKETS);

  useEffect(() => {
    console.log("home screen reloads");
  }, []);

  if (loading) {
    return <Text>Loading....</Text>;
  }
  if (error || !data) {
    console.log(error);
    return <Text>Error!!!</Text>;
  }

  return (
    <View>
      {data.rockets.map((rocket) => (
        <View key={rocket.id}>
          <Pressable
            onPress={() => navigation.navigate("Detail", { id: rocket.id })}
          >
            <Text>Name: {rocket.name}</Text>
          </Pressable>

          <Text>Company: {rocket.company}</Text>
          <Text>{"\n"}</Text>
        </View>
      ))}
    </View>
  );
};

export default Home;
