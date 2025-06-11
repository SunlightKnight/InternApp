import React, { useContext, useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';

import colors from '../../../styles/colors';
import padding from '../../../styles/padding';
import fontSize from '../../../styles/fontSize';
import { Author, BookEntry, CoverPhoto, Pet } from '../../../assets/SharedTypes';
import { useTranslation } from 'react-i18next';
import DropShadow from 'react-native-drop-shadow';
import { Activity } from '../../../assets/SharedTypes';
import Moment from 'moment';
import IconText from '../../Main/IconText';
import * as images from '../../../assets/index'
import { AppContext } from '../../../utils/AppProvider/AppProvider';

type ActivityListEntryProps = {
    entry: Pet
}

export default function ActivityListEntry(props: ActivityListEntryProps) {
    const appContext = useContext(AppContext)
    const { t } = useTranslation()

    const onRemovePress = () => {
        var tempArray = appContext?.app.cart.slice() as Pet[]
        tempArray = tempArray.filter((item) => item.id != props.entry.id)

        appContext?.app.setCart(tempArray)
    }

    return (
        <DropShadow style={styles.mainContainerShadow}>
            <View style={styles.mainContainer}>
                <View style={styles.removeContainer}>
                    <TouchableOpacity onPress={onRemovePress}>
                        <Image style={styles.buyIcon} source={images.incomplete} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.title}>{props.entry.name}</Text>
                    <Text style={styles.author}>Qt: 1</Text>
                </View>
            </View>
        </DropShadow>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.white,

        marginVertical: padding.half,
        padding: padding.half,
        borderRadius: 5,
    },
    mainContainerShadow: {
        flex: 0,
        flexGrow: 0,

        width: "100%",

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    removeContainer: {
        backgroundColor: colors.red,

        position: 'absolute',
        alignSelf: 'flex-end',
        zIndex: 1,

        margin: padding.half,
        padding: 2,

        borderRadius: 200,
        borderWidth: 2,
        borderColor: colors.red
    },

    title: {
        color: colors.petsPrimary,

        fontSize: fontSize.veryBig,
        fontWeight: "bold"
    },
    author: {
        color: colors.blackOpacity40,

        fontSize: fontSize.normal,
    },
    statusText: {
        color: colors.white,

        fontSize: fontSize.verySmall,
    },
    buyIcon: {
        tintColor: colors.white,

        width: 25,
        height: 25,
    }
});