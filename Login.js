import { StatusBar } from "expo-status-bar";
import Register from "./Register";
import Info from "./Info";
import HomeScreen from "./HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function Login() {
  const [accounts, setAccounts] = useState([
    { email: "test@mail.com", password: "123456" },
    { email: "admin@mail.com", password: "admin123" },
    { email: "user", password: "pass" },
  ]);

  const handleLogin = (email, password) => {
    return accounts.some(
      (acc) => acc.email === email.trim() && acc.password === password,
    );
  };

  const handleRegister = (newAccount) => {
    setAccounts((prev) => [...prev, newAccount]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Register">
          {(props) => <Register {...props} onRegister={handleRegister} />}
        </Stack.Screen>
        <Stack.Screen name="Info" component={Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const doSignIn = () => {
    const ok = onLogin(email, password);
    if (ok) {
      setError("");
      navigation.navigate("HomeScreen");
    } else {
      setError("Email/Username hoặc mật khẩu không đúng.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email/Username</Text>
        <TextInput
          style={styles.input}
          placeholder="test@mail.com"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        ) : null}

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.label}>Register</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={doSignIn}>
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
    backgroundColor: "#8f61d5",
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 25,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
