import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="test" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="test@mail.com" />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="******" secureTextEntry />

        <Text style={styles.label}>Confirm password</Text>
        <TextInput style={styles.input} placeholder="******" secureTextEntry />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create</Text>
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

  form: {
    width: "80%",
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  forgot: {
    fontSize: 12,
    color: "gray",
    marginBottom: 20,
  },

  button: {
    width: "50%",
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "#53b85a",
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
