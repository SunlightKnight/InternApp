import React, { Ref, useContext, useEffect } from 'react';
import { StyleSheet, View, Platform, Image, TouchableOpacity, BackHandler } from 'react-native';
import IconTextReversed from '../components/IconTextReversed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as images from '../assets/index'

import colors from '../styles/colors';
import padding from '../styles/padding';
import fontSize from '../styles/fontSize';
import { HEADER_HEIGHT } from '../styles/styles';
import { DrawerActions, StackActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppContext } from '../utils/AppProvider/AppProvider';
import { StackNavigationProp } from '@react-navigation/stack';

type CustomHeaderProps = {
    navigatorRef: any,
    showBack: boolean,
    showLogout: boolean,
}

export default function CustomHeader(props: CustomHeaderProps) {
    const navigation = useNavigation()
    const appContext = useContext(AppContext)

    const backPress = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }

    const logout = () => {
        clearAsyncStorage()
        appContext?.app.setUser({ userName: '', password: '' })
        navigation.navigate('Onboarding', {screen: 'Login'}) // Ignore
    }

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.removeItem('login');
            console.log('AsyncStorage cleared successfully!');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };

    const getPrevUser = async () => {
        const jsonValue = await AsyncStorage.getItem('login');
        console.log(jsonValue != null ? JSON.parse(jsonValue) : '')

        jsonValue != null ? appContext?.app.setUser(JSON.parse(jsonValue)) : appContext?.app.setUser({userName: '', password: ''});
    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                return !props.showBack
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => subscription.remove();
        }, [props.showBack])
    );

    useEffect(() => {
        getPrevUser()
    }, [])

    return (
        <View style={styles.headerContainer}>
            {props.showBack ? (
                <TouchableOpacity onPress={backPress} style={styles.backButtonContainer}>
                    <Image source={images.burgerIcon} resizeMode="contain" style={styles.backButtonImage} />
                </TouchableOpacity>
            ) : null}

            {props.showLogout ? (
                <View>
                    <IconTextReversed onPress={logout} imageSrc={images.logout} text={appContext?.app.user.userName as string} textSize={fontSize.big} color={colors.white} style={styles.logoutContainer} />
                    <TouchableOpacity onPress={backPress} style={styles.optionsContainer}>
                        <Image source={images.settings} resizeMode="contain" style={styles.backButtonImage} />
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.primary,

        flexDirection: "column",

        width: "100%",
        height: HEADER_HEIGHT,
    },
    logoutContainer: {
        alignSelf: "flex-end",
        position: "absolute",

        marginHorizontal: padding.half + 30,
        marginTop: Platform.OS === "ios" ? padding.full : HEADER_HEIGHT - 33
    },
    backButtonContainer: {
        position: "absolute",

        width: 30,
        height: 30,

        marginHorizontal: padding.half,
        marginTop: Platform.OS === "ios" ? padding.full : HEADER_HEIGHT - 35
    },
    optionsContainer: {
        alignSelf: "flex-end",
        position: "absolute",

        width: 30,
        height: 30,

        marginHorizontal: padding.half,
        marginTop: Platform.OS === "ios" ? padding.full : HEADER_HEIGHT - 35
    },
    backButtonImage: {
        width: 30,
        height: 30,
        tintColor: colors.white,
    }
});
