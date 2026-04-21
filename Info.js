import { StatusBar } from "expo-status-bar";
import { CommonActions } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { currentUser, setCurrentUser } from "./api";

export default function Info({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    avatarUrl: "",
    description: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUserInfo({
        name: currentUser.name || "User",
        email: currentUser.email || "",
        address: "",
        avatarUrl: "",
        description: "",
      });
    }
  }, []);

  const handleSave = async () => {
    Alert.alert("");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{userInfo.name}</Text>
        <Image
          style={styles.avatar}
          source={
            userInfo.avatarUrl
              ? { uri: userInfo.avatarUrl }
              : require("./assets/images.png")
          }
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={userInfo.name}
          onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#e9ecef" }]}
          value={userInfo.email}
          editable={false}
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={userInfo.address}
          onChangeText={(text) => setUserInfo({ ...userInfo, address: text })}
        />
        <Text style={styles.label}>Avatar URL</Text>
        <TextInput
          style={styles.input}
          value={userInfo.avatarUrl}
          onChangeText={(text) => setUserInfo({ ...userInfo, avatarUrl: text })}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={userInfo.description}
          onChangeText={(text) =>
            setUserInfo({ ...userInfo, description: text })
          }
        />
      </View>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity
          style={[
            styles.button,
            { marginRight: 10, backgroundColor: "#007bff" },
          ]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { marginLeft: 10, backgroundColor: "#dc3545" },
          ]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  title: { fontSize: 32, fontWeight: "bold" },
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
  avatar: { width: 100, height: 100, borderRadius: 15 },
  button: {
    width: "40%",
    borderWidth: 1,
    borderColor: "transparent",
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
