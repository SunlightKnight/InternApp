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
import { Activity, Author, BookEntry, CoverPhoto } from '../../../assets/SharedTypes.tsx';
import BooksList from '../../../components/Main/BooksList/BooksList.tsx';
import PetsInventoryList from '../../../components/Main/ActivityList/ActivityList.tsx';

interface InventoryProps {
    navigation: any
}

function Inventory(props: InventoryProps) {
    const appContext = useContext(AppContext)
    const backendContext = useContext(BackendServiceContext)
    const { t } = useTranslation()
    const [activities, setActivities] = useState(Array<Activity>)

    const getActivities = () => {
        backendContext?.beService.getActivities()
            .then((result) => {
                console.log(result)
                setActivities(result)
            })
            .catch((result) => {
                getActivities()
            })
    }

    useEffect(() => {
        getActivities()
    }, [])

    return (
        <View style={styles.defaultContainer}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    defaultContainer: {
        backgroundColor: colors.primaryBackground,

        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
})

export default Inventory