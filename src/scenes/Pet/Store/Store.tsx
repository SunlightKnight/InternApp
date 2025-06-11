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
import ProfileWidget, { ProfileEntry } from '../../../components/Main/ProfileWidget.tsx';
import { Activity, Author, BookEntry, CoverPhoto, Pet } from '../../../assets/SharedTypes.tsx';
import BooksList from '../../../components/Main/BooksList/BooksList.tsx';
import PetsInventoryList from '../../../components/Pets/Inventory/PetsInventoryList.tsx'

interface InventoryProps {
    navigation: any
}

function Inventory(props: InventoryProps) {
    const appContext = useContext(AppContext)
    const backendContext = useContext(BackendServiceContext)
    const { t } = useTranslation()
    const [availablePets, setAvailablePets] = useState(Array<Pet>)

    const getAvailablePets = () => {
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

    useEffect(() => {
        getAvailablePets()
    }, [])

    return (
        <View style={styles.defaultContainer}>
            <PetsInventoryList data={availablePets} />
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

export default Inventory