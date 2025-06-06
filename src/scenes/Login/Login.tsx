import { useContext, useEffect, useState } from 'react';
import { BackendServiceContext } from '../../services/BackedServiceProvider';
import { AppContext } from '../../utils/AppProvider/AppProvider'
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import padding from '../../styles/padding.ts';
import fontSize from '../../styles/fontSize.ts';
import DropShadow from 'react-native-drop-shadow';
import LabeledField from '../../components/LabeledField'
import { User } from '../../assets/SharedTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface LoginProps {
    navigation: any,
}

function Login(props: LoginProps) {
    const appContext = useContext(AppContext)
    const { t } = useTranslation()
    const [warning, setWarning] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signIn, setSignIn] = useState(false)
    const [registeredUsers, setRegisteredUsers] = useState(Array<User>)

    const knownUsers: User[] = [
        {
            username: 'MarioRossi',
            password: 'Placeholder23'
        },
        {
            username: 'PippiCalzelunghe',
            password: 'Placeholder25'
        },
        {
            username: 'TheOnlineItalian213',
            password: 'SoltantoFosseLaMiaVeraPassword'
        },
        {
            username: 'Admin',
            password: '1234'
        },
    ]

    const prevUserHandle = async () => {
        const jsonValue = await AsyncStorage.getItem('login');
        console.log(jsonValue != null ? JSON.parse(jsonValue) : '')
        jsonValue != null ? appContext?.app.setUsername(JSON.parse(jsonValue).username) : null
        return jsonValue != null ? props.navigation.navigate('Landing') : null;
    }

    const getRegisteredUsers = async () => {
        const jsonValue = await AsyncStorage.getItem('registeredUsers');
        setRegisteredUsers(jsonValue ? JSON.parse(jsonValue) : [])
    }

    const registerUser = async () => {
        if (username == '' || password == '') {
            return;
        }

        var entry = knownUsers.find(item => item.username == username)
        appContext?.app.handleLoader(false)
        if (entry) {
            setWarning(true)
            return
        }

        registeredUsers != null ? entry = registeredUsers.find(item => item.username == username) : null
        if (entry) {
            setWarning(true)
            return
        }

        const newUser: User = {
            username: username,
            password: password,
        }

        var tempArray: User[] = registeredUsers.slice()
        tempArray.push(newUser)
        setRegisteredUsers(tempArray)

        console.log(JSON.stringify(registeredUsers) + "\n" + JSON.stringify(newUser))

        try {
            const jsonUser = JSON.stringify(newUser)
            const jsonRegisteredUsers = JSON.stringify(tempArray)
            await AsyncStorage.setItem('login', jsonUser)
            await AsyncStorage.setItem('registeredUsers', jsonRegisteredUsers)
        } catch (e) { }
    }

    const savePrevUser = async (value: any) => {
        try {
            appContext?.app.setUsername(username)
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('login', jsonValue)
        } catch (e) {

        }
    }

    useEffect(() => {
        console.log("render")
        prevUserHandle()
        getRegisteredUsers()
    }, [])

    const login = (button: string) => {
        appContext?.app.handleLoader(true)
        var entry = knownUsers.find(item => item.username == username)
        appContext?.app.handleLoader(false)

        console.log(registeredUsers)

        if (entry == undefined) {
            registeredUsers != null ? entry = registeredUsers.find(item => item.username == username) : null
            if (entry == undefined) {
                setWarning(true)
                setPassword('')
                return
            }
        }
        if (entry.password != password) {
            setWarning(true)
            setPassword('')
            return
        }

        const User: User = {
            username: username,
            password: password
        }
        savePrevUser(User)

        setWarning(false)
        setUsername('')
        setPassword('')

        appContext?.app.handleLoader(true)
        setTimeout(() => {
            props.navigation.navigate('Landing')
            appContext?.app.handleLoader(false)
        }, 100)
    }

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <DropShadow style={styles.loginContainerShadow}>
                {signIn ? (
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}>{t("login_screen.signin_title")}</Text>
                        <LabeledField warningText={warning ? t('login_screen.signin_existingUsername') : undefined} placeholder={t('login_screen.login_insert_username')} onChangeText={setUsername} value={username} />
                        <LabeledField placeholder={t('login_screen.login_insert_password')} onChangeText={setPassword} value={password} />
                        <CustomButton text={t('login_screen.signin')} onPress={registerUser} />
                        <TouchableOpacity onPress={() => (setSignIn(false), setWarning(false))}>
                            <Text style={styles.signLogInPrompt}>{t('login_screen.signin_prompt')}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}>{t("login_screen.login_title")}</Text>
                        <LabeledField warningText={warning ? t('login_screen.login_incorrectUsername') : undefined} placeholder={t('login_screen.login_insert_username')} onChangeText={setUsername} value={username} />
                        <LabeledField warningText={warning ? t('login_screen.login_incorrectPassword') : undefined} placeholder={t('login_screen.login_insert_password')} onChangeText={setPassword} value={password} secureTextEntry={true} />
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