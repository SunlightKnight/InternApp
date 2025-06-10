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
import { Author, BookEntry, CoverPhoto } from '../../../assets/SharedTypes.tsx';
import BooksList from '../../../components/Main/BooksList/BooksList.tsx';

interface ProfileProps {
    navigation: any
}

function ProfileWindow(props: ProfileProps) {
    const appContext = useContext(AppContext)
    const backendContext = useContext(BackendServiceContext)
    const { t } = useTranslation()
    const [books, setBooks] = useState(Array<BookEntry>)
    const [authors, setAuthors] = useState(Array<Author>)
    const [images, setImages] = useState(Array<CoverPhoto>)

    const getBooks = () => {
        backendContext?.beService.getBooks()
            .then((result) => {
                console.log(result)
                setBooks(result)
            })
            .catch((result) => {
                getBooks
            })
    }
    const getAuthors = () => {
        backendContext?.beService.getAuthors()
            .then((result) => {
                console.log(result)
                setAuthors(result)
            })
            .catch((result) => {
                getAuthors()
            })
    }
    const getImages = () => {
        backendContext?.beService.getImages()
            .then((result) => {
                console.log(result)
                setImages(result)
            })
            .catch((result) => {
                getImages()
            })
    }

    useEffect(() => {
        getBooks()
        getAuthors()
        getImages()
    }, [])

    return (
        <View style={styles.defaultContainer}>
            <BooksList data={books} authors={authors} images={images}/>
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

export default ProfileWindow