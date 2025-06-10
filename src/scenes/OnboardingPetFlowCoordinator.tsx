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
import Landing from './Main/Landing/Landing';
import GenericListTest from './Main/Test/GenericListTest'
import ProfileWindow from './Main/Test/ProfileWindow'
import Login from './Main/Login/Login'
import CustomHeader from '../components/Main/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUsername } from '../utils/GlobalVariables';
import APIList from './Main/Test/APIList';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginPets from './Pet/LoginPets';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
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

    const [backVisible, setBackVisible] = useState(true)
    const [logoutVisible, setLogoutVisible] = useState(true)

    const screenOptions = {
        header: () => (<View></View>),
    };

    // useEffect hook: no dependencies between the [] are defined, hence it's called only once.
    // For more info: https://react.dev/reference/react/useEffect
    useEffect(() => {
        loadData()
    }, [])

    const getPrevUser = async () => {
        const jsonValue = await AsyncStorage.getItem('login');
        console.log(jsonValue != null ? JSON.parse(jsonValue) : '')

        jsonValue != null ? appContext?.app.setUser(JSON.parse(jsonValue)) : appContext?.app.setUser({ userName: '', password: '' });
    }

    // Retrieves user's username and saved token.
    const loadData = async () => {
        getPrevUser()
        console.log("*** AppFlowCoordinator - LOADED")
    }

    const onboardingPages: { [key: string]: any } = {
        Login: {
            component: LoginPets,
            parentProps: {},
        },
    };

    return (
    <View style={{ width: "100%", height: "100%" }}>
        <Stack.Navigator
            initialRouteName={'Login'}
            screenOptions={screenOptions}>
            {Object.keys(onboardingPages).map((key: string) => {
                const page = onboardingPages[key];
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
    </View>
  )
}
