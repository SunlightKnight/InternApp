import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';

import colors from '../../styles/colors';
import padding from '../../styles/padding';
import fontSize from '../../styles/fontSize';
import { Author, BookEntry, CoverPhoto } from '../../assets/SharedTypes';
import { useTranslation } from 'react-i18next';
import DropShadow from 'react-native-drop-shadow';
import { Activity } from '../../assets/SharedTypes';
import Moment from 'moment';
import IconText from '../IconText';
import * as images from '../../assets/index'

type ActivityListEntryProps = {
    entry: Activity
}

export default function ActivityListEntry(props: ActivityListEntryProps) {
    const { t } = useTranslation()

    return (
        <DropShadow style={styles.mainContainerShadow}>
            <View style={styles.mainContainer}>
                <View style={[styles.statusContainer, { backgroundColor: props.entry.completed ? colors.green : colors.red }]}>
                    <IconText imageSrc={props.entry.completed ? images.completed : images.incomplete} color={colors.white} text={props.entry.completed ? t('activity_screen.completed') : t('activity_screen.incomplete')} textSize={fontSize.verySmall}/>
                </View>
                <View>
                    <Text style={styles.title}>{props.entry.title}</Text>
                    <Text style={styles.author}>{Moment(props.entry.dueDate).format('[[] DD-MM-YYYY []] HH:MM:SS')}</Text>
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
    statusContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',

        backgroundColor: colors.white,
        margin: padding.half,
        padding: padding.quarter,
        borderRadius: 5,
    },

    title: {
        color: colors.primary,

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
    }
});