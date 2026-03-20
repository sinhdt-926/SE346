import { StatusBar } from "expo-status-bar";
import Login from "./Login";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

export default function Info({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: 20,
        }}
      >
        <Text style={[styles.title, { alignSelf: "left", margin: 20 }]}>
          Oguri
        </Text>

        <Image
          style={[styles.avatar, { alignSelf: "right", marginRight: 20 }]}
          source={require("./assets/images.png")}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="test" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="test@mail.com" />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="XXXXXXXXX"
          secureTextEntry
        />

        <Text style={styles.label}>Avatar URL</Text>
        <TextInput
          style={styles.input}
          placeholder="https://example.com/avatar.jpg"
          secureTextEntry
        />

        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity
          style={[
            styles.button,
            { marginRight: 10 },
            { backgroundColor: "#007bff" },
          ]}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { marginLeft: 10 },
            { backgroundColor: "#dc3545" },
          ]}
          onPress={() => navigation.goBack()}
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

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },

  button: {
    width: "40%",
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
