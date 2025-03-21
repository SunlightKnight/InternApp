import { useEffect, useRef } from 'react';
import {
  Image,
  Platform,
  View,
} from 'react-native';

import AppProvider from '../utils/AppProvider/AppProvider';
import styles, { HEADER_HEIGHT, slideAnimation } from '../styles/styles';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer, NavigationState } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import colors from '../styles/colors';
// import { useTranslation } from 'react-i18next';
import padding from '../styles/padding';
import { icon_back } from '../assets';
import Landing from './Landing/Landing';

const Stack = createStackNavigator()
const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white
  },
};

export default function AppFlowCoordinator() {
  // const backendService = useContext(BackendServiceContext)
  // const { t } = useTranslation()
  const navRef = useRef<any>(null)

  const screenOptions = {
    title: '',
    backgroundColor: colors.white,
    headerStyle: {
      backgroundColor: colors.primary,
      shadowColor: 'transparent',
      elevation: 0, // https://github.com/react-navigation/react-navigation/issues/865
      height: 0,
    },
    headerTintColor: colors.white,
    headerBackTitleVisible: false,
    cardStyleInterpolator: slideAnimation,
    gestureEnabled: false,
    headerBackground: () => (
      <View
        style={{
          width: '100%',
          height: HEADER_HEIGHT,
          backgroundColor: colors.primary
        }}
      />
    ),
    headerBackImage: () => (
      <Image
        source={icon_back}
        resizeMode="contain"
        style={{
          width: 30, 
          height: 30, 
          tintColor: colors.white, 
          marginHorizontal: padding.half,
          marginTop: Platform.OS === "ios" ? padding.full : HEADER_HEIGHT-30
        }} />
    ),
    // headerRight: () => {},
  };

  // useEffect hook: no dependencies between the [] are defined, hence it's called only once.
  // For more info: https://react.dev/reference/react/useEffect
  useEffect(() => {
    loadData()
  }, [])

  // Retrieves user's username and saved token.
  const loadData = async () => {
    console.log("*** AppFlowCoordinator - LOADED")
  }

  const pages: {[key: string]: any} = {
    Landing: {
      component: Landing,
      parentProps: { },
    },
  };

  return (
    <AppProvider>
      <View style={{width: "100%", height: "100%"}}>
        <NavigationContainer
          ref={navRef}
          theme={Theme}
          onStateChange={(navigationState: NavigationState | undefined) => {
            console.log(`*** AppFlowCoordinator:onStateChange: navigationState=${JSON.stringify(navigationState)}`)
          }}>
          
          <Stack.Navigator
            initialRouteName={'Landing'}
            screenOptions={screenOptions}>
              {Object.keys(pages).map((key: string) => {
                const page = pages[key];
                const PageComponent = page.component;
                return (
                  <Stack.Screen
                    key={key}
                    name={key}>
                    {(props: any) => {
                      return (
                        <SafeAreaProvider style={{paddingTop: HEADER_HEIGHT}}>
                          <PageComponent
                            {...props}
                            parentProps={page.parentProps}
                          />
                        </SafeAreaProvider>
                      );
                    }}
                  </Stack.Screen>
                );
            })}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AppProvider>
  )
}
