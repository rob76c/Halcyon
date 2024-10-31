import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphqlClient";
import { useAuth } from "../providers/AuthContext";
import SetListItem from "./SetListItem";
import ProgressGraph from "./ProgressGraph";

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
  const { username } = useAuth();

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
      ListHeaderComponent={() => (
        <>
          <ListHeaderComponent />
          <ProgressGraph sets={data.sets} />
        </>
      )}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <SetListItem set={item} />}
    />
  );
};

export default SetsList;
