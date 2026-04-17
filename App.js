import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Login from "./Login";
import { initDB } from "./database";

export default function App() {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      await initDB();
      setIsDbReady(true);
    };
    setupDatabase();
  }, []);

  if (!isDbReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Data...</Text>
      </View>
    );
  }

  return <Login />;
}
