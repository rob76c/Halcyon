import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function ExerciseListItem({ item }) {
    return (
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseMuscleandEquipment}>
          <Text style={styles.subValue}>{item.muscle}</Text> | {' '}
          <Text style={styles.subValue}>{item.equipment}</Text>
        </Text> 
      </View>
    );
  }

  const styles = StyleSheet.create({
    exerciseContainer: {
      backgroundColor: "#fff",
      padding: 10,
      borderRadius: 10,
      gap: 5,

      //shadow
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
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
  });
  