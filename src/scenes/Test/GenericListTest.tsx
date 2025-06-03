import { useContext } from 'react';
import { BackendServiceContext } from '../../services/BackedServiceProvider';
import { AppContext } from '../../utils/AppProvider/AppProvider'
import { Text, ScrollView, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useTranslation } from 'react-i18next';
import ListTest, { dataEntry } from '../../components/ListTest';

import colors from '../../styles/colors.ts';
import padding from '../../styles/padding';
import fontSize from '../../styles/fontSize';

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
    <ScrollView contentContainerStyle={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text style={styles.title}/>
      <ListTest data={defaultData}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary,
    fontSize: fontSize.big
  }
})

export default GenericListTest