import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

import colors from '../../styles/colors';
import padding from '../../styles/padding';
import fontSize from '../../styles/fontSize';
import { Activity, Author, BookEntry, CoverPhoto } from '../../assets/SharedTypes';
import { TextInput } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import DropShadow from 'react-native-drop-shadow';
import PetsInventoryEntry from './PetsInventoryEntry'

type PetsInventoryProps = {
    data: Activity[]
}

export default function ActivityList(props: PetsInventoryProps) {
    const { t } = useTranslation()
    const [searchText, setSearchText] = useState('')

    const filteredData = props.data.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()))

    return (
        <View style={{ width: "100%" }}>
            <DropShadow style={styles.searchBarContainerShadow}>
                <View style={{ padding: padding.full }}>
                    <TextInput style={styles.searchBar} placeholder={t('books_list.search_bar_placeholder')} placeholderTextColor={colors.blackOpacity25} onChangeText={setSearchText} />
                </View>
            </DropShadow>
            <View style={{ height: "90%" }}>
                <FlatList style={styles.listContainer} data={filteredData} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => (
                    <PetsInventoryEntry entry={item}></PetsInventoryEntry>
                )} numColumns={1} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        width: "100%",
        padding: padding.full,
        paddingTop: 0,
    },
    searchBarContainerShadow: {
        flex: 0,
        flexGrow: 0,

        width: "100%",

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },

    searchBar: {
        color: colors.blackOpacity40,
        backgroundColor: colors.white,

        width: "100%",
        height: fontSize.big + 20,

        padding: padding.half,

        fontSize: fontSize.normal,

        borderRadius: 5,
    }
});
