import { useContext, useState } from 'react';
import { BackendServiceContext } from '../../../services/BackedServiceProvider.tsx';
import { AppContext } from '../../../utils/AppProvider/AppProvider.tsx'
import { Text, View, StyleSheet, Modal } from 'react-native';
import CustomButton from '../../../components/Main/CustomButton.tsx';
import { useTranslation } from 'react-i18next';
import ListTest, { dataEntry } from '../../../components/Main/ListTest.tsx';

import colors from '../../../styles/colors.ts';
import padding from '../../../styles/padding.ts';
import fontSize from '../../../styles/fontSize.ts';
import generalStyles from '../../../styles/styles.ts'
import { ScrollView } from 'react-native-gesture-handler';
import ProfileWidget from '../../../components/Main/Profile/ProfileWidget.tsx';
import { Profile } from '../../../assets/SharedTypes.tsx'
import ProfileList from '../../../components/Main/Profile/ProfileList.tsx';

interface ProfileProps {
  navigation: any
}

function ProfileWindow(props: ProfileProps) {
  const appContext = useContext(AppContext)
  const { t } = useTranslation()
  const [profiles, setProfiles] = useState<Array<Profile>>()

  return (
    <ProfileList/>
  )
}

const styles = StyleSheet.create({
  defaultContainer: {
    backgroundColor: colors.primaryBackground,

    flexGrow: 1, 
    alignItems: "center",
    justifyContent: "flex-start",
  },
})

export default ProfileWindow