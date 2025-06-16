import { useContext, useEffect, useState } from 'react';
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
import ProfileWidget, { ProfileEntry } from '../../../components/Main/Profile/ProfileWidget.tsx';
import { Activity, Author, BookEntry, CoverPhoto, Pet } from '../../../assets/SharedTypes.tsx';
import BooksList from '../../../components/Main/BooksList/BooksList.tsx';
import PetsInventoryList from '../../../components/Pets/Inventory/PetsInventoryList.tsx'
import PetsCartList from '../../../components/Pets/Cart/PetsCartList.tsx';

interface CartProps {
    navigation: any
}

function Cart(props: CartProps) {
    const appContext = useContext(AppContext)
    const backendContext = useContext(BackendServiceContext)
    const { t } = useTranslation()

    return (
        <View style={styles.defaultContainer}>
            <PetsCartList data={appContext?.app.cart as Pet[]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    defaultContainer: {
        backgroundColor: colors.petsPrimaryBackground,

        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
})

export default Cart