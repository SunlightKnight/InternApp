import { useContext, useEffect, useState } from 'react';
import { BackendServiceContext } from '../../services/BackedServiceProvider.tsx';
import { AppContext } from '../../utils/AppProvider/AppProvider.tsx'
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/Main/CustomButton.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors.ts';
import padding from '../../styles/padding.ts';
import fontSize from '../../styles/fontSize.ts';
import DropShadow from 'react-native-drop-shadow';
import LabeledField from '../../components/Main/LabeledField.tsx'
import { PetUser, User } from '../../assets/SharedTypes.tsx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ReactNativeBiometrics, { BiometryType, BiometryTypes } from 'react-native-biometrics';
import { getUseOfValueInStyleWarning } from 'react-native-reanimated';

interface LoginProps {
    navigation: any,
}

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: false });

function Login(props: LoginProps) {
    const appContext = useContext(AppContext)
    const backendContext = useContext(BackendServiceContext)
    const { t } = useTranslation()
    const [warning, setWarning] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [signIn, setSignIn] = useState(false)

    const retryTimeout = 10
    var currLoginRetries = 0

    const prevUserHandle = async () => {
        const jsonValue = await AsyncStorage.getItem('petLogin');
        const user: PetUser = JSON.parse(jsonValue as string)
        jsonValue != null ? appContext?.app.setPetUser(user) : null

        setUsername(user.username)
        setPassword(user.password)

        appContext?.app.handleLoader(true)
        setTimeout(() => {
            appContext?.app.handleLoader(false)
        }, 100)
    }

    const login = () => {
        appContext?.app.handleLoader(true)
        var petUser: PetUser | undefined
        backendContext?.beService.checkUser(username)
            ?.then((result) => {
                petUser = result

                backendContext?.beService.loginPetUser(username, password)
                    .then((result) => {
                        console.log(result)
                        appContext?.app.setPetUser(petUser)
                        const jsonUser = JSON.stringify(petUser)
                        AsyncStorage.setItem('petLogin', jsonUser)
                        setTimeout(() => {
                            appContext?.app.handleLoader(false)
                            loginMove()
                        }, 100)
                    })
                    .catch((result) => {
                        login()
                    })
            })
            ?.catch((result) => {
                if (currLoginRetries >= retryTimeout) {
                    currLoginRetries = 0
                    appContext?.app.handleLoader(false)
                    return
                }

                currLoginRetries++
                console.log(currLoginRetries)
                login()
            })
    }

    const registerUser = async () => {
        console.log(username, password)
        appContext?.app.handleLoader(true)
        if (username == '' || password == '') {
            appContext?.app.handleLoader(false)
            return;
        }

        const user: PetUser = {
            id: 3030,
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone,
            userStatus: 1
        }

        backendContext?.beService.createUser(user)
            .then((result) => {
                console.log(result)
                const jsonUser = JSON.stringify(user)
                AsyncStorage.setItem('petLogin', jsonUser)

                login()
                appContext?.app.handleLoader(false)
            })
            .catch((result) => {
                if (currLoginRetries >= retryTimeout) {
                    currLoginRetries = 0
                    appContext?.app.handleLoader(false)
                    return
                }

                currLoginRetries++
                registerUser()
            })
    }

    const loginMove = () => {
        props.navigation.navigate('MainPets', { screen: 'Inventory' })
    }

    useEffect(() => {
        console.log("render")
        prevUserHandle()
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <DropShadow style={styles.loginContainerShadow}>
                {signIn ? (
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}>{t("login_screen.signin_title")}</Text>
                        <LabeledField warningText={warning ? t('login_screen.signin_existing_username') : undefined} placeholder={t('login_screen.login_insert_username')} onChangeText={setUsername} value={username} />
                        <LabeledField placeholder={t('login_screen.login_insert_password')} onChangeText={setPassword} value={password} newPassword={true} secureTextEntry={true} />
                        <LabeledField placeholder={t('login_screen.login_insert_first_name')} onChangeText={setFirstName} value={firstName} />
                        <LabeledField placeholder={t('login_screen.login_insert_last_name')} onChangeText={setLastName} value={lastName} />
                        <LabeledField placeholder={t('login_screen.login_insert_email')} onChangeText={setEmail} value={email} />
                        <LabeledField placeholder={t('login_screen.login_insert_phone')} onChangeText={setPhone} value={phone} />
                        <CustomButton text={t('login_screen.signin')} onPress={registerUser} style={{ backgroundColor: colors.petsPrimary }} />
                        <TouchableOpacity onPress={() => (setSignIn(false), setWarning(false))}>
                            <Text style={styles.signLogInPrompt}>{t('login_screen.login_prompt')}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}>{t("login_screen.login_title")}</Text>
                        <LabeledField warningText={warning ? t('login_screen.login_incorrect_username') : undefined} placeholder={t('login_screen.login_insert_username')} onChangeText={setUsername} value={username} />
                        <LabeledField warningText={warning ? t('login_screen.login_incorrect_password') : undefined} placeholder={t('login_screen.login_insert_password')} onChangeText={setPassword} value={password} secureTextEntry={true} />
                        <CustomButton text={t('login_screen.login')} onPress={login} style={{ backgroundColor: colors.petsPrimary }} />
                        <TouchableOpacity onPress={() => (setSignIn(true), setWarning(false))}>
                            <Text style={styles.signLogInPrompt}>{t('login_screen.signin_prompt')}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </DropShadow>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: colors.petsPrimaryBackground
    },
    loginContainerShadow: {
        flex: 0,
        flexGrow: 0,

        width: "80%",

        margin: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    loginContainer: {
        justifyContent: "center",
        alignItems: "center",

        padding: padding.half,

        gap: 10,

        backgroundColor: colors.white,
        borderRadius: 5,
    },

    title: {
        color: colors.petsPrimary,

        margin: 10,

        fontSize: fontSize.veryBig,
        fontWeight: "bold",
    },
    signLogInPrompt: {
        color: colors.petsPrimary,

        fontWeight: 'bold'
    }
})

export default Login