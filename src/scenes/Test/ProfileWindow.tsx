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
      name: 'Francesco De Bernardi',
      email: 'francescodeb07@gmail.com',
      imageURL: 'https://i.pinimg.com/736x/fd/5a/c8/fd5ac829988c1faaacf9adfd30cd0f18.jpg',
      title: 'Tirocinante ValorPlus',
      quote: '[...] Carpe diem; quam minimum credula postero.',
      quoteAuthor: 'Orazio',
      biography: 'Lorem ipsum dolor sit ametLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      cellNumber: 3913721861,
    },
    {
      name: 'Yuri Guglielmana',
      email: 'yuri.guglielmana@gmail.com',
      imageURL: 'https://st.depositphotos.com/1740193/1228/i/450/depositphotos_12283100-stock-photo-caterpillar-excavator.jpg',
      title: 'Direttore Creativo Quaerit',
      biography: 'Lorem ipsum dolor sit ametLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      cellNumber: 1230493520,
    },
    {
      name: 'Alessandro Pakula',
      email: 'alessandropakula@gmail.com',
      imageURL: 'https://i.pinimg.com/originals/14/82/9f/14829f92588e457270bcc99a264b6265.gif',
      title: 'Tirocinante Autotorino',
      biography: 'Amico di molti, nemico di molti più',
      quote: '[Esplicito]',
      quoteAuthor: 'Alessandro Pakula',
      cellNumber: 1230493520,
    },
    {
      name: 'Mario Rossi',
      email:'mario.rossi@gmail.com',
      title: 'Placeholder',
      cellNumber: 1234567890,
    }
  ]

  const profileInstance = () => {
    var profileWidgets = []
    for(let i = 0; i < profiles.length; i++) {
      var item = profiles[i];
      profileWidgets[i] = <ProfileWidget key={i} data={item}/>
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