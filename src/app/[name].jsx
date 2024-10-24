import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import exercises from "../../assets/data/exercises.json";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import client from "../graphqlClient";
import { ActivityIndicator } from "react-native";
import NewSetInput from "../components/NewSetInput";
import SetsList from "../components/SetsList";

const exerciseQuery = gql`
  query exercises($name: String) {
    exercises(name: $name) {
      name
      muscle
      instructions
      equipment
    }
  }
`;

export default function ExerciseDetailsScreen() {
  const { name } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises", name],
    queryFn: () => client.request(exerciseQuery, { name }),
  });

  const [isInstructionsExpanded, setInstructionsExpanded] = useState(false);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  const exercise = data.exercises[0];

  if (!exercise) {
    return <Text>Exercise not found!</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />

      <SetsList
        ListHeaderComponent={() => (
          <View style= {{gap: 5}}>
            <View style={styles.panel}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>

              <Text style={styles.exerciseMuscleandEquipment}>
                <Text style={styles.subValue}>{exercise.muscle}</Text> |{" "}
                <Text style={styles.subValue}>{exercise.equipment}</Text>
              </Text>
            </View>

            <View style={styles.panel}>
              <Text
                style={styles.instructions}
                numberOfLines={isInstructionsExpanded ? 0 : 3}
              >
                {exercise.instructions}
              </Text>
              <Text
                onPress={() => setInstructionsExpanded(!isInstructionsExpanded)}
                style={styles.seeMore}
              >
                {isInstructionsExpanded ? "See less" : "See more"}
              </Text>
            </View>

            <NewSetInput exerciseName={exercise.name} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  panel: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseMuscleandEquipment: {
    color: "dimgray",
  },
  subValue: {
    textTransform: "capitalize",
  },
  instructions: {
    fontSize: 16,
    lineHeight: 22,
  },
  seeMore: {
    alignSelf: "center",
    padding: 5,
    fontWeight: "600",
    color: "gray",
  },
});
