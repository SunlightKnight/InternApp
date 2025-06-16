import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Modal, UIManager } from 'react-native';

import colors from '../../../styles/colors.ts';
import padding from '../../../styles/padding.ts';
import fontSize from '../../../styles/fontSize.ts';
import { Activity, Author, BookEntry, CoverPhoto, Order, Pet } from '../../../assets/SharedTypes.tsx';
import { TextInput } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import DropShadow from 'react-native-drop-shadow';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';
import { CreditCardFormData, CreditCardFormField, CreditCardInput, CreditCardView } from 'react-native-credit-card-input';
import { AppContext } from '../../../utils/AppProvider/AppProvider.tsx';
import { BackendServiceContext } from '../../../services/BackedServiceProvider.tsx';
import PetsHistoryEntry from './PetsHistoryEntry.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PetsHistoryListProps = {}

export default function PetsHistoryList(props: PetsHistoryListProps) {
    const appContext = useContext(AppContext)
    const backendContext = useContext(BackendServiceContext)
    const { t } = useTranslation()
    const [searchText, setSearchText] = useState('')
    const [data, setData] = useState<Array<Order>>([])
    const [refreshing, setRefreshing] = useState(false)
    const [availablePets, setAvailablePets] = useState<Array<Pet>>()

    const getAvailablePets = () => {
        setAvailablePets(undefined)
        backendContext?.beService.findPetsByStatus('available')
            .then((result) => {
                console.log(result)
                const nonDupes = result.filter((item, index, array) =>
                    array.findIndex(i => i.id === item.id) == index
                );
                setAvailablePets(nonDupes)
            })
            .catch((result) => {
                getAvailablePets()
            })
    }

    const getSavedOrders = async () => {
        const jsonValue = await AsyncStorage.getItem('orderHistory');
        setData(jsonValue ? JSON.parse(jsonValue) : [])
    }

    const dataRefresh = () => {
        setRefreshing(true)

        getAvailablePets()
        getSavedOrders()

        setRefreshing(false)
    }

    useEffect(() => {
        dataRefresh()
    }, [])

    const filteredData = data.filter((item) => item.id.toString().includes(searchText.toLowerCase()) && item.username == appContext?.app.petUser?.username)

    return (
        <View style={{ width: "100%" }}>
            <DropShadow style={styles.searchBarContainerShadow}>
                <View style={{ padding: padding.full }}>
                    <TextInput style={styles.searchBar} placeholder={t('books_list.search_bar_placeholder')} placeholderTextColor={colors.blackOpacity25} onChangeText={setSearchText} />
                </View>
            </DropShadow>
            <View style={{ height: "90%" }}>
                <FlatList style={styles.listContainer} refreshing={refreshing} onRefresh={() => dataRefresh()} data={filteredData} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => (
                    <PetsHistoryEntry entry={item} key={item.id} petName={availablePets?.find((item1) => {return item1.id == item.petId})?.name}></PetsHistoryEntry>
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
    buyButtonContainer: {
        width: "100%",
        paddingHorizontal: padding.full,
    },
    creditCardContainer: {
        backgroundColor: colors.white,

        marginTop: "35%",

        width: "100%",
        height: "100%",
        padding: padding.full,
        paddingTop: 0,

        borderRadius: 10,
    },
    creditCardView: {
        alignSelf: 'center',

        marginTop: 15,
    },

    paymentButtonContainer: {
        flexDirection: 'row',

        gap: 5,
        alignSelf: 'center',
        justifyContent: 'center',

        width: "70%",
        paddingHorizontal: padding.full,
    },
    cancelPayment: {
        backgroundColor: colors.red,

        width: '75%',
        padding: padding.half,

        borderRadius: 5,
    },
    proceedGreyed: {
        backgroundColor: colors.blackOpacity25,

        width: '75%',
        padding: padding.half,

        borderRadius: 5,
    },
    proceed: {
        backgroundColor: colors.green,

        width: '75%',
        padding: padding.half,

        borderRadius: 5,
    },

    confirmPaymentText: {
        color: colors.white,

        textAlign: 'center',

        fontWeight: 'bold'
    },
    cancelPaymentText: {
        color: colors.white,

        textAlign: 'center',

        fontWeight: 'bold'
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
    buyButton: {
        backgroundColor: colors.petsPrimary,
        color: colors.white,

        padding: 10,
        textAlign: "center",

        fontWeight: "bold",

        borderRadius: 5
    },
    easterEgg: {
        color: colors.petsEasterEgg,
        alignSelf: 'center',
        textAlign: 'center',

        fontSize: 35,
    }
});
