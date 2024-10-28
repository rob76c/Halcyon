import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphqlClient";
import { useAuth } from "../providers/AuthContext";

const setsQuery = gql`
  query MyQuery($exercise: String, $username: String) {
    sets(exercise: $exercise, username: $username) {
      _id
      exercise
      reps
      weight
    }
  }
`;

const SetsList = ({ ListHeaderComponent, exerciseName }) => {
  const {username} = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sets", exerciseName],
    queryFn: () =>
      graphqlClient.request(setsQuery, { exercise: exerciseName, username }),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <FlatList
      data={data.sets}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <Text
          style={{
            backgroundColor: "white",
            marginVertical: 5,
            padding: 10,
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          {item.reps} x {item.weight}
        </Text>
      )}
    />
  );
};

export default SetsList;
