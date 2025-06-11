import React, { useContext, useEffect, useState } from 'react';
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
    const [inCart, setInCart] = useState(false)

    const onCartPress = () => {
        console.log(inCart)
        if (inCart) {
            setInCart(false)

            var tempArray = appContext?.app.cart.slice() as Pet[]
            tempArray = tempArray.filter((item) => item.id != props.entry.id)

            console.log(props.entry.id, tempArray)

            appContext?.app.setCart(tempArray)
        } else {
            setInCart(true)
            
            var tempArray = appContext?.app.cart.slice() as Pet[]
            tempArray.push(props.entry)

            appContext?.app.setCart(tempArray)
        }
    }

    const onCartUpdate = () => {
        if(appContext?.app.cart.filter((item) => item.id == props.entry.id).length == 0) {
            setInCart(false)
        }
    }

    useEffect(() => {
        onCartUpdate()
    }, [appContext?.app.cart])

    return (
        <DropShadow style={styles.mainContainerShadow}>
            <View style={styles.mainContainer}>
                <View style={styles.buyContainer}>
                    <TouchableOpacity onPress={onCartPress}>
                        <Image style={styles.buyIcon} source={inCart ? images.completed : images.shoppingCart} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.title}>{props.entry.name}</Text>
                    <Text style={styles.author}>{props.entry.status}</Text>
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
    buyContainer: {
        backgroundColor: colors.petsPrimary,

        position: 'absolute',
        alignSelf: 'flex-end',

        margin: padding.half,
        padding: 2,

        zIndex: 1,

        borderRadius: 200,
        borderWidth: 2,
        borderColor: colors.petsPrimary
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