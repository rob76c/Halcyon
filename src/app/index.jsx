import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ExerciseListItem from "../components/ExerciseListItem";
import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ActivityIndicator, Button } from "react-native";
import { gql } from "graphql-request";
import client from "../graphqlClient";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "../providers/AuthContext";
import { useDebounce } from "@uidotdev/usehooks";

const exercisesQuery = gql`
  query myQuery($muscle: String, $name: String) {
    exercises(muscle: $muscle, name: $name) {
      name
      muscle
      equipment
    }
  }
`;

export default function ExercisesScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 1000);

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["exercises", debouncedSearchTerm],
      queryFn: () =>
        client.request(exercisesQuery, { name: debouncedSearchTerm }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => pages.length * 10, //fix to use offset(only in premium subscription to apininjas) by using passing pageParam to queryFn and setting the offset to pageParam
    });

  const { username } = useAuth();

  const loadMore = () => {
    if (isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch exercises</Text>;
  }

  if (!username) {
    return <Redirect href={"/auth"} />;
  }

  const exercises = data?.pages.flatMap((page) => page.exercises);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search...",
            onChangeText: (event) => setSearch(event.nativeEvent.text),
            hideWhenScrolling:false,
          },
        }}
      />
      <FlatList
        data={exercises}
        contentContainerStyle={{ gap: 5 }}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
        onEndReachedThreshold={1} // 1 screen size of items left
        onEndReached={loadMore}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "ghostwhite",
    justifyContent: "center",
    padding: 10,
    paddingTop: 150,// change to dynamic solution for the top part cut off
  },
});
