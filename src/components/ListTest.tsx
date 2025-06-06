import React from 'react';
import { StyleSheet, FlatList, Text} from 'react-native';

import colors from '../styles/colors';
import padding from '../styles/padding';
import fontSize from '../styles/fontSize';

type ListTestProps = {
  data : dataEntry[]
}

export default function ListTest(props: ListTestProps) {
  return (
    <FlatList style={styles.listContainer} data={props.data} keyExtractor={(item) => String(item.id)} renderItem={({item}) => (
        <Text style={styles.listItem}>{item.value}</Text>
    )} numColumns={2}/>
  );
}

export type dataEntry = {
  id: number,
  value : string
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.grey,
    width: "80%",
    borderRadius: 2,
    borderWidth: 2,
    borderColor: colors.grey,
  },
  listItem: {
    backgroundColor: colors.white,
    width: "50%",
    height: fontSize.normal * 2,
    paddingVertical: padding.quarter,
    paddingHorizontal: padding.sixth,
    fontSize: fontSize.small,
    fontWeight: "600",

    borderRadius: 2,
    borderWidth: 2,
    borderColor: colors.grey,
  }
});
