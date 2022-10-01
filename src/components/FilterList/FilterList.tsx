import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionList, View, Pressable, Text } from "react-native";

const FILTER_DATA = [
  {
    title: "Country",
    data: ["United States", "Republic of the Marshall Islands", "UK", "Russia"],
  },
  {
    title: "Company",
    data: ["SpaceX", "SpaceY", "SpaceZ"],
  },
];

const FilterList = (props) => {
  const { selectedFilters, setSelectedFilters } = props;

  const renderItem = (title, item) => {
    return (
      <View>
        <Pressable
          onPress={(x) => {
            const filters = selectedFilters.map((selectedFilter) =>
              selectedFilter.title !== title
                ? selectedFilter
                : {
                    ...selectedFilter,
                    data: selectedFilter.data.includes(item)
                      ? [...selectedFilter.data].filter((data) => data !== item)
                      : [...selectedFilter.data, item],
                  }
            );

            setSelectedFilters(filters);
          }}
        >
          <Text>{item}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <SectionList
        sections={FILTER_DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ section: { title }, item }) => renderItem(title, item)}
        renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
      />
    </SafeAreaView>
  );
};

export default FilterList;
