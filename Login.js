import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email/Username</Text>
        <TextInput style={styles.input} placeholder="test@mail.com" />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="••••••" secureTextEntry />

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
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
    borderColor: "#999999",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  forgot: {
    fontSize: 12,
    color: "#66b9f0",
    marginBottom: 20,
  },

  button: {
    width: "50%",
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "#6b6ef3",
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
