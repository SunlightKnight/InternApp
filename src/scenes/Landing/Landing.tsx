import { useContext } from 'react';
import { BackendServiceContext } from '../../services/BackedServiceProvider';
import { AppContext } from '../../utils/AppProvider/AppProvider'
import { Text, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

interface LandingProps {
  navigation: any
}

function Landing(props: LandingProps) {
  const appContext = useContext(AppContext)
  //const navigation = useNavigation()
  const { t } = useTranslation()

  const testLoader = (button : string) => {
    appContext?.app.handleLoader(true)
    setTimeout(() => {
      button == "data" ? props.navigation.navigate('GenericListTest') : props.navigation.navigate('ProfileWindow') 
      appContext?.app.handleLoader(false)
    }, 500)
  }

  return (
    <ScrollView contentContainerStyle={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>{t("landing_screen.landing_title")}</Text>
      <CustomButton onPress={() => testLoader("data")} text={t("landing_screen.landing_data")} />
      <CustomButton onPress={() => testLoader("profile")} text={t("landing_screen.landing_profile")} />
    </ScrollView>
  )
}

export default Landing