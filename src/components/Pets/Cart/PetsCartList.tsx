import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Modal, UIManager } from 'react-native';

import colors from '../../../styles/colors.ts';
import padding from '../../../styles/padding.ts';
import fontSize from '../../../styles/fontSize.ts';
import { Activity, Author, BookEntry, CoverPhoto, Order, Pet } from '../../../assets/SharedTypes.tsx';
import { TextInput } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import DropShadow from 'react-native-drop-shadow';
import PetsCartEntry from './PetsCartEntry.tsx'
import { Image } from 'react-native-reanimated/lib/typescript/Animated';
import { CreditCardFormData, CreditCardFormField, CreditCardInput, CreditCardView } from 'react-native-credit-card-input';
import { AppContext } from '../../../utils/AppProvider/AppProvider.tsx';
import { BackendServiceContext } from '../../../services/BackedServiceProvider.tsx';

type PetsInventoryProps = {
    data: Pet[]
}

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default function ActivityList(props: PetsInventoryProps) {
    const appContext = useContext(AppContext)
    const backendContext = useContext(BackendServiceContext)
    const { t } = useTranslation()
    const [searchText, setSearchText] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [creditCardData, setCreditCardData] = useState<CreditCardFormData>()
    const [creditCardField, setCreditCardField] = useState<CreditCardFormField>()

    const filteredData = props.data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))

    const confirmPayment = () => {
        appContext?.app.handleLoader(true)

        if (!appContext?.app.cart.length) { return }

        for (let i = 0; i < appContext?.app.cart.length; i++) {
            var currDate = new Date()
            currDate.setDate(currDate.getDate() + 7)
            const newOrder: Order = {
                id: Math.floor((Math.random() * 10) + 1),
                petId: appContext?.app.cart[i].id,
                quantity: 1,
                shipDate: currDate.toString(),
                status: "placed",
                complete: false
            }
            backendContext?.beService.placeOrder(newOrder)
        }

        appContext?.app.setCart([])
        setModalVisible(false)

        setTimeout(() => {
            appContext?.app.handleLoader(false)
        }, 100)
    }

    return (
        <View style={{ width: "100%" }}>
            <Modal animationType='slide' transparent={true} visible={modalVisible}>
                <DropShadow style={styles.searchBarContainerShadow}>
                    <View style={styles.creditCardContainer}>
                        <CreditCardView style={styles.creditCardView} focusedField={creditCardField} type={creditCardData?.values.type} number={creditCardData?.values.number} expiry={creditCardData?.values.expiry} cvc={creditCardData?.values.cvc} />
                        <CreditCardInput onChange={(formData) => setCreditCardData(formData)} />
                        <View style={styles.paymentButtonContainer}>
                            <TouchableOpacity style={styles.cancelPayment} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.cancelPaymentText}>{t('pets_cart_screen.cancel_payment')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={creditCardData ? creditCardData.valid ? styles.proceed : styles.proceedGreyed : styles.proceedGreyed} onPress={() => confirmPayment()}>
                                <Text style={styles.confirmPaymentText}>{t('pets_cart_screen.confirm_payment')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </DropShadow>
            </Modal>

            <DropShadow style={styles.searchBarContainerShadow}>
                <View style={{ padding: padding.full }}>
                    <TextInput style={styles.searchBar} placeholder={t('books_list.search_bar_placeholder')} placeholderTextColor={colors.blackOpacity25} onChangeText={setSearchText} />
                </View>
            </DropShadow>
            <View style={{ height: "83%" }}>
                <FlatList style={styles.listContainer} data={filteredData} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => (
                    <PetsCartEntry entry={item} key={item.id}></PetsCartEntry>
                )} numColumns={1} />
            </View>
            {appContext?.app.cart && appContext?.app.cart.length > 0 ? (
                <DropShadow style={styles.searchBarContainerShadow}>
                    <TouchableOpacity style={styles.buyButtonContainer} onPress={() => { setModalVisible(!modalVisible) }}>
                        <Text style={styles.buyButton}>{t('pets_cart_screen.buy')}</Text>
                    </TouchableOpacity>
                </DropShadow>
            ) : null}
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

        marginTop: "30%",

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
    }
});
