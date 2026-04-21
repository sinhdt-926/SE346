import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Login from "./Login";
import { initDB } from "./database";

export default function App() {
  return <Login />;
}
