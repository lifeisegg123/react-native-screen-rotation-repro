/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useLayoutEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {ScreenOrientationTypes} from 'react-native-screens';

type RootStackParamList = {
  Home: undefined;
  RePro: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RePro" component={RePro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

function Home() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Hi</Text>
      <Button
        onPress={() => navigation.navigate('RePro')}
        title="go to next"></Button>
    </View>
  );
}

function RePro() {
  const navigation = useNavigation();
  const [orientation, setOrientation] =
    useState<ScreenOrientationTypes>('default');

  useLayoutEffect(() => {
    navigation.setOptions({orientation});
    return () => {
      navigation.setOptions({orientation: 'default'});
    };
  }, [navigation, orientation]);
  return (
    <View>
      <Text>current orientation: {orientation}</Text>
      <Button
        onPress={() =>
          setOrientation(prev => (prev === 'default' ? 'landscape' : 'default'))
        }
        title={'landscape toggle'}></Button>
    </View>
  );
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
