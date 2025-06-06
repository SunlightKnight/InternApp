import { useContext, useEffect, useRef, useState } from 'react';
import {
  Image,
  Platform,
  View,
  Text
} from 'react-native';

import AppProvider, { AppContext } from '../utils/AppProvider/AppProvider';
import { HEADER_HEIGHT, slideAnimation } from '../styles/styles';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer, NavigationState } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import colors from '../styles/colors';
// import { useTranslation } from 'react-i18next';
import padding from '../styles/padding';
import * as images from '../assets';
import Landing from './Landing/Landing';
import GenericListTest from './Test/GenericListTest'
import ProfileWindow from './Test/ProfileWindow'
import Login from './Login/Login'
import CustomHeader from '../components/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUsername } from '../utils/GlobalVariables';

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
  const appContext = useContext(AppContext)

  const [backVisible, setBackVisible] = useState(false)
  const [logoutVisible, setLogoutVisible] = useState(false)

  const screenOptions = {
    title: '',
    backgroundColor: colors.white,
    headerBackTitleVisible: false,
    cardStyleInterpolator: slideAnimation,
    gestureEnabled: false,
    /*headerBackImage: () => (
      <Image
        source={images.icon_back}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
          tintColor: colors.white,
          marginHorizontal: padding.half,
          marginTop: Platform.OS === "ios" ? padding.full : HEADER_HEIGHT - 30
        }} />
    ),*/
    header: () => (<CustomHeader navigation={navRef} showLogout={logoutVisible} showBack={backVisible}></CustomHeader>),
  };

  // useEffect hook: no dependencies between the [] are defined, hence it's called only once.
  // For more info: https://react.dev/reference/react/useEffect
  useEffect(() => {
    loadData()
  }, [])

  const getPrevUser = async () => {
    const jsonValue = await AsyncStorage.getItem('login');
    console.log(jsonValue != null ? JSON.parse(jsonValue) : '')
    jsonValue != null ? appContext?.app.setUsername(JSON.parse(jsonValue).username) : null;
  }

  // Retrieves user's username and saved token.
  const loadData = async () => {
    getPrevUser()
    console.log("*** AppFlowCoordinator - LOADED")
  }

  const pages: { [key: string]: any } = {
    Login: {
      component: Login,
      parentProps: {},
    },
    Landing: {
      component: Landing,
      parentProps: {},
    },
    GenericListTest: {
      component: GenericListTest,
      parentProps: {},
    },
    ProfileWindow: {
      component: ProfileWindow,
      parentProps: {}
    }
  };

  return (
    <AppProvider>
      <View style={{ width: "100%", height: "100%" }}>
        <NavigationContainer
          ref={navRef}
          theme={Theme}
          onStateChange={(navigationState: NavigationState | undefined) => {
            { navigationState?.routes.length ? navigationState?.routes.length >= 3 ? setBackVisible(true) : setBackVisible(false) : null }
            { navigationState?.routes.length ? navigationState?.routes.length >= 2 ? setLogoutVisible(true) : setLogoutVisible(false) : null }
            console.log(backVisible + " " + logoutVisible)
            console.log(`*** AppFlowCoordinator:onStateChange: navigationState=${JSON.stringify(navigationState)}`)
          }}>

          <Stack.Navigator
            initialRouteName={'Login'}
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
                      <SafeAreaProvider>
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
