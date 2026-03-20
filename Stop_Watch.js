import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function Stop_Watch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);
  const lastLapTime = useRef(0);

  const startStop = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
    } else {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
      setRunning(true);
    }
  };

  const lap = () => {
    if (!running) return;

    const lapTime = time - lastLapTime.current;
    lastLapTime.current = time;

    setLaps((prev) => [
      { id: prev.length + 1, time: formatTime(lapTime) },
      ...prev,
    ]);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
  };

  const pad = (n) => (n < 10 ? "0" + n : n);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.lapBtn} onPress={lap}>
          <Text style={{ fontWeight: "bold" }}>Lap</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlBtn,
            { borderColor: running ? "red" : "green" },
          ]}
          onPress={startStop}
        >
          <Text
            style={{
              color: running ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            {running ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={laps}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.lapItem}>
            <Text>Lap #{item.id}</Text>
            <Text>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    backgroundColor: "#eee",
  },

  timer: {
    fontSize: 50,
    marginBottom: 40,
  },

  buttons: {
    flexDirection: "row",
    marginBottom: 30,
  },

  lapBtn: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 40,
  },

  controlBtn: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  lapItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    width: 260,
    padding: 15,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
});
