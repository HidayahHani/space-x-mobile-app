import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  Alert,
  TextInput,
  SectionList,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useQuery } from "@apollo/client";
import { GET_ROCKETS } from "../../gql/Query";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const FILTER_DATA = [
    {
      title: "Country",
      data: ["United States", "Republic of the Marshall Islands", "UK", "Rusa"],
    },
    {
      title: "Company",
      data: ["spaceX", "spaceY", "spaceZ"],
    },
  ];

  const Item = ({ title, item }) => (
    <View>
      <Pressable
        onPress={(x) => {
          const filters = selectedFilters.map((selectedFilter) =>
            selectedFilter.title !== title
              ? selectedFilter
              : { ...selectedFilter, data: [...selectedFilter.data, item] }
          );
          setSelectedFilters(filters);
        }}
      >
        <Text>{item}</Text>
      </Pressable>
    </View>
  );

  const renderFilters = () => (
    <SafeAreaView>
      <SectionList
        sections={FILTER_DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ section: { title }, item }) => (
          <Item item={item} title={title} />
        )}
        renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
      />
    </SafeAreaView>
  );

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
      {isRenderFilters && renderFilters()}

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
