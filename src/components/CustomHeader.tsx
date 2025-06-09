import React, { Ref, useContext } from 'react';
import { StyleSheet, View, Platform, Image, TouchableOpacity, BackHandler } from 'react-native';
import IconTextReversed from '../components/IconTextReversed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as images from '../assets/index'

import colors from '../styles/colors';
import padding from '../styles/padding';
import fontSize from '../styles/fontSize';
import { HEADER_HEIGHT } from '../styles/styles';
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppContext } from '../utils/AppProvider/AppProvider';

type CustomHeaderProps = {
    navigation: any,
    showBack: boolean,
    showLogout: boolean,
}

export default function CustomHeader(props: CustomHeaderProps) {
    const appContext = useContext(AppContext)

    const backPress = () => {
        props.navigation.current.canGoBack() ? props.navigation.current.dispatch(StackActions.pop(1)) : null
    }

    const logout = () => {
        clearAsyncStorage()
        props.navigation.current.dispatch(StackActions.popToTop())
    }

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.removeItem('login');
            console.log('AsyncStorage cleared successfully!');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };

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

    return (
        <View style={styles.headerContainer}>
            {props.showBack ? (
                <TouchableOpacity onPress={backPress} style={styles.backButtonContainer}>
                    <Image source={images.icon_back} resizeMode="contain" style={styles.backButtonImage} />
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
