import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToDoScreen from "./pages/ToDoScreen";
import BuscaCepScreen from "./pages/BuscaCepScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={ToDoScreen}
      />
      <Stack.Screen
        name="cep"
        component={BuscaCepScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
}