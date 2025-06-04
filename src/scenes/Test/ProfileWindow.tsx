import { useContext } from 'react';
import { BackendServiceContext } from '../../services/BackedServiceProvider.tsx';
import { AppContext } from '../../utils/AppProvider/AppProvider.tsx'
import { Text, View, StyleSheet, Modal } from 'react-native';
import CustomButton from '../../components/CustomButton.tsx';
import { useTranslation } from 'react-i18next';
import ListTest, { dataEntry } from '../../components/ListTest.tsx';

import colors from '../../styles/colors.ts';
import padding from '../../styles/padding.ts';
import fontSize from '../../styles/fontSize.ts';
import generalStyles from '../../styles/styles.ts'
import { ScrollView } from 'react-native-gesture-handler';
import ProfileWidget, { ProfileEntry } from '../../components/ProfileWidget.tsx';

interface ProfileProps {
  navigation: any
}

function ProfileWindow(props: ProfileProps) {
  const appContext = useContext(AppContext)
  const { t } = useTranslation()

  const profiles : ProfileEntry[] = [
    {
      id: 0,
      name: 'Francesco De Bernardi',
      email: 'francescodeb07@gmail.com',
      imageURL: 'https://i.pinimg.com/736x/fd/5a/c8/fd5ac829988c1faaacf9adfd30cd0f18.jpg',
      title: 'Tirocinante',
      quote: 'Carpe Diem',
      cellNumber: 3913721861,
    },
    {
      id : 1,
      name: 'Mario Rossi',
      email:'mario.rossi@gmail.com',
      title: 'Placeholder',
      quote: 'Placeholder',
      cellNumber: 1234567890,
    }
  ]

  const profileInstance = () => {
    var profileWidgets = []
    for(let i = 0; i < profiles.length; i++) {
      var item = profiles[i];
      profileWidgets[i] = <ProfileWidget data={item}/>
    }
    return profileWidgets
  }

  return (
    <ScrollView contentContainerStyle={styles.defaultContainer}>
      {profileInstance()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  defaultContainer: {
    flexGrow: 1, 
    alignItems: "center",
    justifyContent: "flex-start",
  },
})

export default ProfileWindow