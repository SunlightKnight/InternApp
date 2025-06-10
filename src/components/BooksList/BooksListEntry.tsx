import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';

import colors from '../../styles/colors';
import padding from '../../styles/padding';
import fontSize from '../../styles/fontSize';
import { Author, BookEntry, CoverPhoto } from '../../assets/SharedTypes';
import { useTranslation } from 'react-i18next';
import DropShadow from 'react-native-drop-shadow';
import * as images from '../../assets/index'

type BooksListEntryProps = {
    entry: BookEntry
    authors: Author[]
    imageSrc?: CoverPhoto
}

export default function BooksListEntry(props: BooksListEntryProps) {
    const { t } = useTranslation()
    const [showDetails, setShowDetails] = useState(false)

    const concatenateAuthors = () => {
        var result = (props.authors[0].firstName + " " + props.authors[0].lastName)
        for (let i = 1; i < props.authors.length; i++) {
            result += (", " + props.authors[i].firstName + " " + props.authors[i].lastName)
        }
        console.log(result)
        return result
    }

    return (
        <DropShadow style={styles.mainContainerShadow}>
            <View style={styles.mainContainer}>
            <View>
                <Text style={styles.title}>{props.entry.title}</Text>
                <Text style={styles.author}>{t('books_list.entry_author') + concatenateAuthors()}</Text>
            </View>

            {showDetails ? (
                <View>
                    <Text style={styles.title}>{t("books_list.entry_description")}</Text>
                    <View style={{flexDirection: "row"}}>
                        {props.imageSrc ? (
                            <Image style={styles.cover} src={props.imageSrc.url}/>
                        ) : null}
                        <Text style={styles.excerpt}>{'"' + props.entry.excerpt + '"'}</Text>
                    </View>
                    <Text style={styles.description}>{props.entry.description}</Text>
                </View>
            ) : null}

            <View>
                <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                    <Image style={styles.hideShowImage} source={showDetails ? images.showLess : images.showMore}/>
                </TouchableOpacity>
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

    title: {
        color: colors.primary,

        fontSize: fontSize.veryBig,
        fontWeight: "bold"
    },
    author: {
        color: colors.blackOpacity40,

        fontSize: fontSize.normal,
    },
    excerpt: {
        color: colors.blackOpacity40,

        textAlign: "center",
        alignSelf: "center",

        width: "70%",

        marginTop: 10,

        fontSize: fontSize.verySmall,
        fontStyle: 'italic',
    },
    description: {
        color: colors.blackOpacity40,

        fontSize: fontSize.small,
    },

    hideShowImage: {
        tintColor: colors.blackOpacity25,

        alignSelf: "center",

        width: 30,
        height: 30,
        marginTop: padding.quarter,
    },
    cover: {
        
        aspectRatio: 1 / 1.42,
        width: "30%",

        borderColor: colors.primary,
        borderWidth: 2
    }
});