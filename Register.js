import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { registerAPI } from "./api"; // Đổi import

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!email.trim() || !password || !confirmPwd || !name.trim()) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (password !== confirmPwd) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      await registerAPI(email.trim(), password, name.trim(), "");
      setError("");
      Alert.alert("Thành công", "Đăng ký thành công!", [
        { text: "OK", onPress: () => navigation.navigate("LoginScreen") },
      ]);
    } catch (err) {
      setError("Đăng ký thất bại. Có thể email đã tồn tại hoặc sai định dạng.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="test"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="test@mail.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          secureTextEntry
          value={confirmPwd}
          onChangeText={setConfirmPwd}
        />

        {error ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleCreate}>
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
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 40 },
  form: { width: "80%" },
  label: { fontSize: 14, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: "50%",
    backgroundColor: "#53b85a",
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
