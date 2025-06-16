import { useContext, useState } from 'react';
import { BackendServiceContext } from '../../../services/BackedServiceProvider';
import { AppContext } from '../../../utils/AppProvider/AppProvider'
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import CustomButton from '../../../components/Main/CustomButton';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import padding from '../../../styles/padding';
import colors from '../../../styles/colors';
import DropShadow from 'react-native-drop-shadow';
import fontSize from '../../../styles/fontSize';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LandingProps {
    navigation: any
}

function Settings(props: LandingProps) {
    const appContext = useContext(AppContext)
    const backendContext = useContext(BackendServiceContext)
    //const navigation = useNavigation()
    const { t } = useTranslation()
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const deleteAccount = () => {
        backendContext?.beService.deleteUser(appContext?.app.petUser?.username)
        appContext?.app.setPetUser(undefined)
        clearAsyncStorage()
        appContext?.app.setPetUser(undefined)
        backendContext?.beService.logoutPetUser()
        props.navigation.navigate('OnboardingPets', {screen: 'Login'})
    }

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.removeItem('petLogin');
            console.log('AsyncStorage cleared successfully!');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <Modal avoidKeyboard={false} propagateSwipe={true} animationIn='slideOutUp' animationOut={'slideOutDown'} swipeDirection='down' onSwipeComplete={() => { setShowDeleteConfirm(false) }} isVisible={showDeleteConfirm}>
                <View style={styles.confirmContainer}>
                    <Text style={styles.confirmTitle}>{t('user_settings.confirm_text')}</Text>
                    <CustomButton onPress={() => {deleteAccount(); setShowDeleteConfirm(false)}} text={t("user_settings_screen.confirm_delete")} style={{ backgroundColor: colors.red }} />
                </View>
            </Modal>
            <DropShadow style={styles.landingContainerShadow}>
                <View style={styles.landingContainer}>
                    <Text style={styles.title}>{t("user_settings_screen.title")}</Text>
                    <CustomButton onPress={setShowDeleteConfirm} text={t("user_settings_screen.delete_account")} style={{ backgroundColor: colors.red }} />
                </View>
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
    landingContainerShadow: {
        flex: 0,
        flexGrow: 0,

        width: "80%",

        margin: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    landingContainer: {
        justifyContent: "center",
        alignItems: "center",

        padding: padding.half,

        gap: 10,

        backgroundColor: colors.white,
        borderRadius: 5,
    },
    confirmContainer: {
        position: 'absolute',
        backgroundColor: colors.white,

        width: '100%',
        marginTop: '450%',
        padding: padding.full,
        paddingTop: 0,

        alignContent: 'center',

        borderRadius: 10,
        gap: padding.full,
    },

    title: {
        color: colors.petsPrimary,

        fontSize: fontSize.veryBig,
        fontWeight: 'bold'
    },
    confirmTitle: {
        color: colors.red,

        textAlign: 'center',
        margin: padding.full,
        marginBottom: 0,

        fontSize: fontSize.veryBig,
        fontWeight: 'bold'
    }
})

export default Settings