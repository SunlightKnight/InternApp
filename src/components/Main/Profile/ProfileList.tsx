import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

import colors from '../../../styles/colors.ts';
import padding from '../../../styles/padding.ts';
import fontSize from '../../../styles/fontSize.ts';
import { Activity, Author, BookEntry, CoverPhoto, Pet, Profile } from '../../../assets/SharedTypes.tsx';
import { TextInput } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import DropShadow from 'react-native-drop-shadow';
import { BackendServiceContext } from '../../../services/BackedServiceProvider.tsx';
import ProfileWidget from './ProfileWidget.tsx';

type ProfileListProps = {
}

export default function ActivityList() {
    const backendContext = useContext(BackendServiceContext)
    const { t } = useTranslation()
    const [data, setData] = useState<Array<Profile>>()
    const [refreshing, setRefreshing] = useState(false)
    const [searchText, setSearchText] = useState('')

    const filteredData = data ? data.filter((item) => item.name ? item.name.toLowerCase().includes(searchText.toLowerCase()) : null) : null

    const getProfiles = () => {
        setRefreshing(true)
        setData(undefined)
        backendContext?.beService.getProfiles()
            .then((result) => {
                console.log(result)
                setData(result)
                setRefreshing(false)
            })
            .catch((result) => {
                getProfiles()
            })
    }

    useEffect(() => {
        getProfiles()
    }, [])

    return (
        <View style={{ width: "100%" }}>
            <DropShadow style={styles.searchBarContainerShadow}>
                <View style={{ padding: padding.half }}>
                    <TextInput style={styles.searchBar} placeholder={t('books_list.search_bar_placeholder')} placeholderTextColor={colors.blackOpacity25} onChangeText={setSearchText} />
                </View>
            </DropShadow>
            {filteredData && filteredData?.length > 0 ? (
                <View style={{ height: "90%" }}>
                    <FlatList style={styles.listContainer} data={filteredData} refreshing={refreshing} onRefresh={getProfiles} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => (
                       <ProfileWidget key={item.id} data={item}/>
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
        padding: padding.half,
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
