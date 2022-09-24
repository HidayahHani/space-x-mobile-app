import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_ROCKET } from "../../gql/Query";

const Detail = (props) => {
  const route = useRoute();
  const { id } = route.params;

  const { data, error, loading } = useQuery(GET_ROCKET, { variables: { id } });

  if (loading) {
    return <Text>Loading....</Text>;
  }

  if (error || !data) {
    console.log(error);
    return <Text>Error!!!</Text>;
  }

  return (
    <View>
      <Text>Name: {data.rocket.name}</Text>
      <Text>Description: {data.rocket.description}</Text>
      <Text>Company: {data.rocket.company}</Text>
      <Text>Country: {data.rocket.country}</Text>
      <Text>Type: {data.rocket.type}</Text>
      <Text>Active: {data.rocket.active ? "Yes" : "No"}</Text>
    </View>
  );
};

export default Detail;
