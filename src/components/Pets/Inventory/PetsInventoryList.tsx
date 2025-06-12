import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

import colors from '../../../styles/colors.ts';
import padding from '../../../styles/padding.ts';
import fontSize from '../../../styles/fontSize.ts';
import { Activity, Author, BookEntry, CoverPhoto, Pet } from '../../../assets/SharedTypes.tsx';
import { TextInput } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import DropShadow from 'react-native-drop-shadow';
import PetsInventoryEntry from './PetsInventoryEntry.tsx'
import PetsInventoryAdd from './PetsInventoryAdd.tsx';
import { BackendServiceContext } from '../../../services/BackedServiceProvider.tsx';

type PetsInventoryProps = {
}

export default function ActivityList(props: PetsInventoryProps) {
    const backendContext = useContext(BackendServiceContext)
    const { t } = useTranslation()
    const [data, setData] = useState<Array<Pet>>()
    const [refreshing, setRefreshing] = useState(false)
    const [searchText, setSearchText] = useState('')

    const filteredData = data ? data.filter((item) => item.name ? item.name.toLowerCase().includes(searchText.toLowerCase()) : null) : null

    const getAvailablePets = () => {
        setRefreshing(true)
        setData(undefined)
        backendContext?.beService.findPetsByStatus('available')
            .then((result) => {
                console.log(result)
                const nonDupes = result.filter((item, index, array) =>
                    array.findIndex(i => i.id === item.id) == index
                );
                setData(nonDupes)
                setRefreshing(false)
            })
            .catch((result) => {
                getAvailablePets()
            })
    }

    useEffect(() => {
        getAvailablePets()
    }, [])

    return (
        <View style={{ width: "100%" }}>
            <PetsInventoryAdd />
            <DropShadow style={styles.searchBarContainerShadow}>
                <View style={{ padding: padding.full }}>
                    <TextInput style={styles.searchBar} placeholder={t('books_list.search_bar_placeholder')} placeholderTextColor={colors.blackOpacity25} onChangeText={setSearchText} />
                </View>
            </DropShadow>
            {filteredData && filteredData?.length > 0 ? (
                <View style={{ height: "90%" }}>
                    <FlatList style={styles.listContainer} data={filteredData} refreshing={refreshing} onRefresh={getAvailablePets} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => (
                        <PetsInventoryEntry entry={item} key={item.id}></PetsInventoryEntry>
                    )} numColumns={1} />
                </View>
            ) : (
                <View style={{ height: "90%", justifyContent: 'center' }}>
                    <Text style={styles.easterEgg}>{t('easter_eggs.nobody_here')}</Text>
                </View>
            )}
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
    },
    easterEgg: {
        color: colors.petsEasterEgg,
        alignSelf: 'center',
        textAlign: 'center',

        fontSize: 35,
    }
});
