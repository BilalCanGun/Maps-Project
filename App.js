import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Settings from './screens/Settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {firebase} from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const navigation = useNavigation();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        navigation.navigate('Login');
      }
    });
    const isLoggedIn = false;
    if (!isLoggedIn) {
      navigation.navigate('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Home} options={{tabBarBadge: 1}} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={TabsNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{presentation: 'fullScreenModal'}}
        />

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{presentation: 'fullScreenModal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
