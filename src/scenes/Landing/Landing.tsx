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
  const navigation = useNavigation()
  const { t } = useTranslation()

  const testLoader = () => {
    appContext?.app.handleLoader(true)
    setTimeout(() => {
      navigation.navigate('GenericListTest' as never)
      appContext?.app.handleLoader(false)
    }, 5000)
  }

  return (
    <ScrollView contentContainerStyle={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>{t("landing_screen.landing_title")}</Text>
      <CustomButton onPress={() => testLoader()} text={"Start loader"} />
    </ScrollView>
  )
}

export default Landing