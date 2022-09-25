import React, { useState, useEffect } from "react";
import { View, Text, Button, Pressable, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useQuery } from "@apollo/client";
import { GET_ROCKETS } from "../../gql/Query";
import { FilterList } from "../../components";

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};

type HomeProps = StackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {
  const [filteredRockets, setFilteredRockets] = useState(null);
  const { data, error, loading } = useQuery(GET_ROCKETS);
  const [isRenderFilters, setIsRenderFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([
    {
      title: "Country",
      data: [],
    },
    {
      title: "Company",
      data: [],
    },
  ]);

  useEffect(() => {
    console.log("home screen reloads");
    AlertMessage();
  }, []);

  const AlertMessage = () =>
    Alert.alert("First Time Alert", "First Time Landing on Home Screen");

  if (loading) {
    return <Text>Loading....</Text>;
  }
  if (error || !data) {
    console.log(error);
    return <Text>Error!!!</Text>;
  }

  //   const handleRocketFilter = (name) => {
  //     const filteredRockets = data.rockets.filter(
  //       (rocket) => rocket.name === name
  //     );
  //     console.log(filteredRockets);
  //   };

  return (
    <View>
      {/* <TextInput
        onChangeText={onChangeText}
        placeholder="Type here to translate!"
      /> */}
      {/* <Button title="Press me" onPress={() => handleRocketFilter("Falcon 1")} /> */}

      <Button
        title="Filter"
        onPress={() => setIsRenderFilters(!isRenderFilters)}
      />
      {isRenderFilters && (
        <FilterList
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      )}

      <Text>{"\n"}</Text>

      {selectedFilters
        .map((selectedFilter) =>
          selectedFilter.data.length !== 0
            ? selectedFilter.data.map(
                (item) => `${selectedFilter.title}: ${item}`
              )
            : null
        )
        .flat()
        .map((label) => (
          <Pressable>
            <Text>{label}</Text>
          </Pressable>
        ))}

      <Text>{"\n"}</Text>
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
