import React, { useState } from 'react';
import DropShadow from 'react-native-drop-shadow';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import * as images from '../assets/index.ts';
import IconText from './IconText.tsx';

import colors from '../styles/colors';
import padding from '../styles/padding';
import fontSize from '../styles/fontSize';
import { useLocale } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

type ProfileWidgetProps = {
  data : ProfileEntry
}

export default function ProfileWidget(props: ProfileWidgetProps) {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <DropShadow style={styles.bottomContainerShadow}>
        <View style={styles.bottomContainer}>
          {props.data.imageURL == undefined ? <Image style={styles.profilePicture} source={images.anonUser}/> : <Image style={styles.profilePicture} src={props.data.imageURL}/>}
          <Text style={styles.name}>{props.data.name}</Text>
          <Text style={styles.title}>{props.data.title}</Text>
          <View style={styles.mailPhoneContainer}>
            <IconText imageSrc={images.email} text={String(props.data.email)} textSize={fontSize.small} color={colors.blackOpacity25}/>
            <IconText imageSrc={images.phone} text={String(props.data.cellNumber)} textSize={fontSize.small} color={colors.blackOpacity25}/>
          </View>
          <IconText imageSrc={images.arrowDropDown} text={t("profile_screen.profile_show_more")} textSize={fontSize.normal} color={colors.primary} style={styles.showMoreLess}/>

        </View>
    </DropShadow>
  );
}

export type ProfileEntry = {
  id: number,
  name: string
  email: string
  imageURL?: string // Directory dell'immagine di profilo
  title: string // Titolo aziendale
  quote: string
  cellNumber: number
}

const styles = StyleSheet.create({
  bottomContainerShadow: {
    flex: 0,
    flexGrow: 0,
    width: "100%",

    margin: 10,

    shadowColor: '#000',
    shadowOffset: {width: 6, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  bottomContainer: {
    flex: 0,
    flexGrow: 1,

    backgroundColor: colors.white,

    width: "auto",
    minHeight: 150,

    margin: padding.half,
    padding: padding.half,

    borderRadius: 20,
  },
  mailPhoneContainer: {
    flexDirection: "column",

    marginTop: 8,
  },

  name: {

    color : colors.primary,

    fontSize: fontSize.veryBig,
    fontWeight: "bold"
  },
  title:  {


    color : colors.blackOpacity25,

    fontSize: fontSize.big,
  },

  showMoreLess: {
    position: "absolute",
    alignSelf: "center",

    margin: 5,
    marginVertical: 140 - fontSize.normal,
  },

  profilePicture: {
    alignSelf: "flex-end",
    position: "absolute",

    backgroundColor: colors.grey,

    height: 110,
    width: 110,

    margin: padding.full,
    marginVertical: 18,

    borderRadius: 100,
    borderColor: colors.primary,
    borderWidth: 6
  }
})