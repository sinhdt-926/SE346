import { registerRootComponent } from "expo";

import LoginScreen from "./Login";
import Register from "./Register";
import Info from "./Info";
import HomeScreen from "./HomeScreen";
import App from "./App";
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
