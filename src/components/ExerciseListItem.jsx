import { Text, View, StyleSheet } from "react-native";

export default function ExerciseListItem({ item }) {
    return (
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseMuscleandEquipment}>
          {item.muscle.toUpperCase()} | {item.equipment.toLocaleUpperCase()}
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
    },
    exerciseName: {
      fontSize: 20,
      fontWeight: "500",
    },
    exerciseMuscleandEquipment: {
      color: "dimgray",
    },
  });
  