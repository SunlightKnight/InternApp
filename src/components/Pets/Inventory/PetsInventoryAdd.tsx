import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, UIManager, Image } from 'react-native';
import { Switch } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'

import colors from '../../../styles/colors.ts';
import padding from '../../../styles/padding.ts';
import fontSize from '../../../styles/fontSize.ts';
import { Activity, Author, BookEntry, CoverPhoto, Order, Pet } from '../../../assets/SharedTypes.tsx';
import { TextInput } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import DropShadow from 'react-native-drop-shadow';
import { CreditCardFormData, CreditCardFormField, CreditCardInput, CreditCardView } from 'react-native-credit-card-input';
import { AppContext } from '../../../utils/AppProvider/AppProvider.tsx';
import { BackendServiceContext } from '../../../services/BackedServiceProvider.tsx';
import * as images from '../../../assets/index.ts'

type PetsInventoryProps = {

}

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default function PetsInventoryAdd(props: PetsInventoryProps) {
    const appContext = useContext(AppContext)
    const backendContext = useContext(BackendServiceContext)
    const { t } = useTranslation()
    const [petName, setPetName] = useState('')
    const [petImageURL, setPetImageURL] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const createPet = () => {
        const newPet: Pet = {
            id: Math.floor(Math.random() * 1000000000000000 + 1),
            category: {
                id: 0,
                name: 'string'
            },
            name: petName,
            photoUrls: [
                petImageURL
            ],
            tags: [
                {
                    id: 0,
                    name: 'string'
                }
            ],
            status: 'available'
        }

        setModalVisible(false)
        appContext?.app.handleLoader(true)

        backendContext?.beService.addPet(newPet)

        setTimeout(() => {
            appContext?.app.handleLoader(false)
        }, 100)
    }

    return (
        <View style={{ width: "100%", height: '100%', position: 'absolute' }}>
            <Modal avoidKeyboard={false} propagateSwipe={true} animationIn='slideOutUp' animationOut={'slideOutDown'} swipeDirection='down' onSwipeComplete={() => { setModalVisible(false) }} isVisible={modalVisible}>
                <View style={styles.addMenuContainer}>
                    <Text style={styles.addTitle}>{t('pets_inventory_screen.add_title')}</Text>
                    <TextInput style={styles.addTextField} onChangeText={setPetName} placeholderTextColor={colors.blackOpacity25} placeholder={t('pets_inventory_screen.add_placeholder')}></TextInput>
                    <TextInput style={styles.addTextField} onChangeText={setPetImageURL} placeholderTextColor={colors.blackOpacity25} placeholder={t('pets_inventory_screen.add_image_placeholder')}></TextInput>
                    <TouchableOpacity onPress={() => createPet()}>
                        <Text style={styles.sellButton}>{t('pets_inventory_screen.add_sell')}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={{ position: 'absolute', width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <DropShadow style={styles.addContainerShadow}>
                        <TouchableOpacity style={styles.addContainer} onPress={() => { setModalVisible(!modalVisible); console.log(modalVisible) }}>
                            <Image source={images.add} style={styles.addImage} />
                        </TouchableOpacity>
                    </DropShadow>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    addContainer: {
        backgroundColor: colors.white,

        alignContent: 'center',
        justifyContent: 'center',
        padding: padding.quarter,
        margin: padding.half,
        marginVertical: padding.full,

        zIndex: 1,

        borderRadius: '100%'
    },
    addContainerShadow: {
        zIndex: 1,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    addImage: {
        tintColor: colors.petsPrimary,

        width: 60,
        height: 60,
    },

    addMenuContainer: {
        position: 'absolute',
        backgroundColor: colors.white,

        width: '100%',
        marginTop: '450%',
        padding: padding.full,
        paddingTop: 0,

        alignContent: 'center',

        borderRadius: 10,
        gap: padding.full,
    },
    addMenuContainerShadow: {
        flex: 0,
        flexGrow: 0,

        width: "100%",

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    addTitle: {
        color: colors.petsPrimary,

        textAlign: 'center',
        margin: padding.full,
        marginBottom: 0,

        fontSize: fontSize.veryBig,
        fontWeight: 'bold'
    },
    addTextField: {
        color: colors.blackOpacity40,

        flexDirection: 'row',

        width: "100%",
        height: fontSize.big + 20,
        padding: padding.half,
        gap: 5,

        fontSize: fontSize.normal,

        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.blackOpacity40,
    },
    addAvailableText: {
        color: colors.blackOpacity40,

        width: '87%',

        alignSelf: 'flex-start',

        fontSize: fontSize.normal,
    },
    addAvailableButton: {
        alignSelf: 'flex-end',

        zIndex: 1,

        marginBottom: -4
    },
    addButtonContainer: {
        width: "100%",
        paddingHorizontal: padding.full,
    },

    sellButton: {
        backgroundColor: colors.petsPrimary,
        color: colors.white,

        padding: 10,
        textAlign: "center",

        fontWeight: "bold",

        borderRadius: 5
    },
});
