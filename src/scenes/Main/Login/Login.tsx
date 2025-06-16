import { useContext, useEffect, useState } from 'react';
import { BackendServiceContext } from '../../../services/BackedServiceProvider.tsx';
import { AppContext } from '../../../utils/AppProvider/AppProvider.tsx'
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import CustomButton from '../../../components/Main/CustomButton.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../styles/colors.ts';
import padding from '../../../styles/padding.ts';
import fontSize from '../../../styles/fontSize.ts';
import DropShadow from 'react-native-drop-shadow';
import LabeledField from '../../../components/Main/LabeledField.tsx'
import { User } from '../../../assets/SharedTypes.tsx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ReactNativeBiometrics, { BiometryType, BiometryTypes } from 'react-native-biometrics';

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
    const [signIn, setSignIn] = useState(false)
    const [biometricSetUpFlag, setBiometricSetUpFlag] = useState(false)
    const [biometricType, setBiometricType] = useState<any>(undefined)
    const [registeredUsers, setRegisteredUsers] = useState(Array<User>)
    const [registeringUser, setRegisteringUser] = useState<User>()
    const [APIUsers, setAPIUsers] = useState(Array<User>)

    const knownUsers: User[] = [
        {
            userName: 'MarioRossi',
            password: 'Placeholder23'
        },
        {
            userName: 'PippiCalzelunghe',
            password: 'Placeholder25'
        },
        {
            userName: 'TheOnlineItalian213',
            password: 'SoltantoFosseLaMiaVeraPassword'
        },
        {
            userName: 'Admin',
            password: '1234',
            biometricEnabled: true
        },
    ]

    const prevUserHandle = async () => {
        const jsonValue = await AsyncStorage.getItem('login');
        const user: User = JSON.parse(jsonValue as string)
        jsonValue != null ? appContext?.app.setUser(user) : null

        if (user.biometricEnabled) {
            setUsername(user.userName)
            setPassword(user.password)
            biometricLoginVerify()
        } else {
            appContext?.app.handleLoader(true)
            setTimeout(() => {
                appContext?.app.handleLoader(false)
            }, 100)
        }
    }

    const getAPIUsers = () => {
        backendContext?.beService.getUsers()
            .then((result) => {
                console.log(result)
                setAPIUsers(result)
            })
            .catch((result) => {

            })
    }

    const getRegisteredUsers = async () => {
        const jsonValue = await AsyncStorage.getItem('registeredUsers');
        setRegisteredUsers(jsonValue ? JSON.parse(jsonValue) : [])
    }

    const registerUser = async () => {
        if (username == '' || password == '') {
            return;
        }

        var entry = knownUsers.find(item => item.userName == username)
        appContext?.app.handleLoader(false)
        if (entry) {
            setWarning(true)
            return
        }

        registeredUsers != null ? entry = registeredUsers.find(item => item.userName == username) : null
        if (entry) {
            setWarning(true)
            return
        }

        APIUsers != null ? entry = APIUsers.find(item => item.userName == username) : null
        if (entry) {
            setWarning(true)
            return
        }

        const newUser: User = {
            userName: username,
            password: password,
        }

        const userBiometricsEnabled = biometricType == BiometryTypes.Biometrics || biometricType == BiometryTypes.TouchID

        if (userBiometricsEnabled) {
            setRegisteringUser(newUser)
            setBiometricSetUpFlag(true)
        } else {
            finishUserRegistration(newUser)
        }
    }

    const finishUserRegistration = (user?: User) => {
        if (!user) {
            return
        }

        backendContext?.beService.registerUser(user)
            .then((result) => {
                console.log(result)
                backendContext?.beService.getUsers()
                    .then((result) => {
                        console.log(result)
                        setAPIUsers(result)
                    })
                    .catch((result) => {

                    })
            })
            .catch((result) => {
                finishUserRegistration(user)
            })
    }

    const savePrevUser = async (value: any) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('login', jsonValue)
        } catch (e) {

        }
    }

    const loginMove = () => {
        props.navigation.navigate('Main', { screen: 'Landing' })
    }

    const findBiometricType = async () => {
        const { biometryType } = await rnBiometrics.isSensorAvailable();
        setBiometricType(biometryType as BiometryType)
    }

    const biometricSetUp = async () => {
        await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
            .then((resultObject) => {
                const { success } = resultObject

                if (success) {
                    console.log('successful biometrics provided')

                    const shallowUser = Object.assign({}, registeringUser)
                    shallowUser.biometricEnabled = true

                    finishUserRegistration(shallowUser)
                    setRegisteringUser(undefined)

                    setBiometricSetUpFlag(false)
                    
                    setSignIn(false)
                } else {
                    console.log('user cancelled biometric prompt')
                }
            })
            .catch(() => {
                console.log('biometrics failed')
            })
    }

    const biometricLoginVerify = async () => {
        await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
            .then((resultObject) => {
                const { success } = resultObject

                if (success) {
                    console.log('successful biometrics provided')

                    appContext?.app.handleLoader(true)
                    setTimeout(() => {
                        appContext?.app.handleLoader(false)
                        loginMove()
                    }, 100)
                } else {
                    console.log('user cancelled biometric prompt')
                }
            })
            .catch(() => {
                console.log('biometrics failed')
            })
    }

    useEffect(() => {
        console.log("render")
        prevUserHandle()
        getRegisteredUsers()
        findBiometricType()
        getAPIUsers()
    }, [])

    const login = () => {
        appContext?.app.handleLoader(true)
        var entry = knownUsers.find(item => item.userName == username)
        appContext?.app.handleLoader(false)

        console.log(registeredUsers)

        if (entry == undefined) {
            registeredUsers != null ? entry = registeredUsers.find(item => item.userName == username) : null
            if (entry == undefined) {
                APIUsers != null ? entry = APIUsers.find(item => item.userName == username) : null
                if (entry == undefined) {
                    setWarning(true)
                    setPassword('')
                    return
                }
            }
        }
        if (entry.password != password) {
            setWarning(true)
            setPassword('')
            return
        }

        appContext?.app.setUser(entry)
        savePrevUser(entry)

        setSignIn(false)
        setBiometricSetUpFlag(false)
        setWarning(false)
        setUsername('')
        setPassword('')

        if (entry.biometricEnabled) {
            biometricLoginVerify()
        } else {
            appContext?.app.handleLoader(true)
            setTimeout(() => {
                appContext?.app.handleLoader(false)
                loginMove()
            }, 100)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <DropShadow style={styles.loginContainerShadow}>
                {signIn ? biometricSetUpFlag ? (
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}>{t("login_screen.biometric_setup_title")}</Text>
                        <CustomButton text={t('login_screen.biometric_setup')} onPress={() => biometricSetUp()} />
                        <TouchableOpacity onPress={() => (finishUserRegistration(registeringUser), setRegisteringUser(undefined), setSignIn(false), setWarning(false), setBiometricSetUpFlag(false), login())}>
                            <Text style={styles.signLogInPrompt}>{t('login_screen.biometric_setup_cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}>{t("login_screen.signin_title")}</Text>
                        <LabeledField warningText={warning ? t('login_screen.signin_existing_username') : undefined} placeholder={t('login_screen.login_insert_username')} onChangeText={setUsername} value={username} />
                        <LabeledField placeholder={t('login_screen.login_insert_password')} onChangeText={setPassword} value={password} newPassword={true} />
                        <CustomButton text={t('login_screen.signin')} onPress={() => (registerUser())} />
                        <TouchableOpacity onPress={() => (setSignIn(false), setWarning(false))}>
                            <Text style={styles.signLogInPrompt}>{t('login_screen.login_prompt')}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}>{t("login_screen.login_title")}</Text>
                        <LabeledField warningText={warning ? t('login_screen.login_incorrect_username') : undefined} placeholder={t('login_screen.login_insert_username')} onChangeText={setUsername} value={username} />
                        <LabeledField warningText={warning ? t('login_screen.login_incorrect_password') : undefined} placeholder={t('login_screen.login_insert_password')} onChangeText={setPassword} value={password} secureTextEntry={true} />
                        <CustomButton text={t('login_screen.login')} onPress={login} />
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

        backgroundColor: colors.primaryBackground
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
        color: colors.primary,

        margin: 10,

        fontSize: fontSize.veryBig,
        fontWeight: "bold",
    },
    signLogInPrompt: {
        color: colors.primary,

        fontWeight: 'bold'
    }
})

export default Login