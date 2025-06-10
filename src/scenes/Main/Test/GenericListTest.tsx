import { useContext } from 'react';
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

interface ListProps {
  navigation: any
}

function GenericListTest(props: ListProps) {
  const appContext = useContext(AppContext)
  const { t } = useTranslation()

  const defaultData : dataEntry[] = [
    {
      id: 0,
      value: "Test1",
    },
    {
      id: 3,
      value: "Test2",
    },
    {
      id: 2024,
      value: "Test3",
    },
  ]

  return (
    <View style={styles.defaultContainer}>
      <Text style={styles.title}>{t("listTest_screen.list_title")}</Text>
      <View style={styles.listLimits}>
        <ListTest data={defaultData}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center"
  },
  listLimits: {
    height: "10%",
  },
  title: {
    color: colors.primary,
    fontSize: fontSize.big
  }
})

export default GenericListTest