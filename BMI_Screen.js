import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState } from "react";

export default function BMI_Screen() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(0.0);

  const computeBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;
    if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum > 0) {
      const result = weightNum / (heightNum * heightNum);
      setBmi(result);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
        />

        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={height}
          onChangeText={setHeight}
        />

        <View style={styles.group}>
          <Text style={styles.label} alignSelf="center">
            BMI: {bmi.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={computeBMI}>
          <Text style={styles.buttonText}>Compute</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
  },

  group: {
    marginTop: 20,
  },

  form: {
    width: "80%",
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#999999",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  button: {
    width: "50%",
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "#6ba6f3",
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
});
