import { useContext } from 'react';
import { BackendServiceContext } from '../../../services/BackedServiceProvider';
import { AppContext } from '../../../utils/AppProvider/AppProvider'
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import CustomButton from '../../../components/Main/CustomButton';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import padding from '../../../styles/padding';
import colors from '../../../styles/colors';
import DropShadow from 'react-native-drop-shadow';

interface LandingProps {
  navigation: any
}

function Landing(props: LandingProps) {
  const appContext = useContext(AppContext)
  //const navigation = useNavigation()
  const { t } = useTranslation()

  const testLoader = (button: string) => {
    appContext?.app.handleLoader(true)
    setTimeout(() => {
      props.navigation.navigate(button)
      appContext?.app.handleLoader(false)
    }, 500)
  }

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <DropShadow style={styles.landingContainerShadow}>
        <View style={styles.landingContainer}>
          <Text>{t("landing_screen.landing_title")}</Text>
          <CustomButton onPress={() => testLoader("GenericListTest")} text={t("landing_screen.landing_data")} />
          <CustomButton onPress={() => testLoader("ProfileWindow")} text={t("landing_screen.landing_profile")} />
          <CustomButton onPress={() => testLoader("APIList")} text={t("landing_screen.landing_books")} />
          <CustomButton onPress={() => testLoader("ActivityList")} text={t("landing_screen.landing_activities")} />
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

    backgroundColor: colors.primaryBackground
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
})

export default Landing