import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
enableScreens();
const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Subjects'}
        component={require('../screens/index').default}
      />
      <Stack.Screen
        name={'Quiz'}
        component={require('../screens/SubjectQuiz').default}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
