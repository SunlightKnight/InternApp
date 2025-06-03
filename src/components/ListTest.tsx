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
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: padding.full,
    padding: padding.full,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: colors.grey,
  },
  listItem: {
    color: colors.white,
    width: 200,
    height: 100,
    fontSize: fontSize.normal,
    fontWeight: "600"
  }
});
