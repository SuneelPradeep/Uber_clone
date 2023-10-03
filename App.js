
import { KeyboardAvoidingView,Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import MapScreen from './Screens/MapScreen';

export default function App() {
 
 const Stack = createNativeStackNavigator()

 NativeWindStyleSheet.setOutput({
  default : "native",
 })

  return (
  <NavigationContainer>
    <Provider store={store}>
      <KeyboardAvoidingView style={{flex :1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS==='ios' ? -64: 0}>
     <Stack.Navigator>
    <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
    <Stack.Screen name='Map' component={MapScreen} options={{headerShown: false}}  />
    </Stack.Navigator>
    </KeyboardAvoidingView>
    </Provider>
    </NavigationContainer>
  );
}


