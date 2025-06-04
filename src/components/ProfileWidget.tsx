import React, { useState, useRef, useEffect } from 'react';
import DropShadow from 'react-native-drop-shadow';
import { StyleSheet, Text, View, Dimensions, Image, Platform, UIManager, LayoutAnimation, Animated, useAnimatedValue, Linking } from 'react-native';
import * as images from '../assets/index.ts';
import IconText from './IconText.tsx';

import colors from '../styles/colors';
import padding from '../styles/padding';
import fontSize from '../styles/fontSize';
import { useLocale } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { AnimatedView } from 'react-native-reanimated/lib/typescript/component/View';

type ProfileWidgetProps = {
  data: ProfileEntry
}

export default function ProfileWidget(props: ProfileWidgetProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    open ? show() : hide()
  }, [open])

  const show = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const hide = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const maxHeightAnimated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 2000],
  })

  if (
    Platform.OS === 'android'
  ) {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const showMoreLess = () => {
    setOpen(!open)
  }

  return (
    <DropShadow style={styles.bottomContainerShadow}>
      <Animated.View style={[styles.bottomContainer, {maxHeight: maxHeightAnimated}]}>
        {props.data.imageURL == undefined ? <Image style={styles.profilePicture} source={images.anonUser} /> : <Image style={styles.profilePicture} src={props.data.imageURL} />}
        <Text style={styles.name}>{props.data.name}</Text>
        <Text style={styles.title}>{props.data.title}</Text>
        <View style={styles.mailPhoneContainer}>
          <IconText onPress={() => Linking.openURL('mailto:'+props.data.email)} imageSrc={images.email} text={props.data.email} textSize={fontSize.small} color={colors.blackOpacity25} />
          <IconText onPress={() => Linking.openURL('tel:$'+props.data.cellNumber)} imageSrc={images.phone} text={String(props.data.cellNumber)} textSize={fontSize.small} color={colors.blackOpacity25} />
        </View>

        {open ? (<View style={styles.detailsContainer}>

          {props.data.biography != undefined ? (<View style={styles.biographyContainer}>
            <IconText imageSrc={images.biography} text={t("profile_screen.profile_biography")} textSize={fontSize.veryBig} color={colors.primary} style={styles.biographyTitle} />
            <Text style={styles.biography}>{props.data.biography}</Text>
          </View>) : null}

          {props.data.quote != undefined ? (<View style={styles.quoteContainer}>
            <Text style={styles.quote}>{'"' + props.data.quote + '"'}</Text>

            {props.data.quoteAuthor != undefined ? (<View>
              <Text style={styles.quoteAuthor}>{'-' + props.data.quoteAuthor}</Text>
            </View>) : null}
          </View>) : null}
        </View>) : null}

        <IconText onPress={showMoreLess} imageSrc={open ? images.arrowDropUp : images.arrowDropDown} text={open ? t("profile_screen.profile_show_less") : t("profile_screen.profile_show_more")} textSize={fontSize.normal} color={colors.primary} style={open ? styles.showLess : styles.showMore} />
      </Animated.View>
    </DropShadow>
  );
}

export type ProfileEntry = {
  name: string
  email: string
  imageURL?: string // Directory dell'immagine di profilo
  title: string // Titolo aziendale
  quote?: string
  quoteAuthor?: string
  biography?: string
  cellNumber: number
}

const styles = StyleSheet.create({
  bottomContainerShadow: {
    flex: 0,
    flexGrow: 0,
    width: "100%",

    margin: 10,

    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  bottomContainer: {
    flex: 0,
    flexGrow: 0,

    backgroundColor: colors.white,

    width: "auto",
    height: "auto",
    minHeight: 150,

    margin: padding.half,
    padding: padding.half,

    overflow : "hidden",

    borderRadius: 20,
  },
  mailPhoneContainer: {
    marginTop: 8,
  },
  detailsContainer: {
    marginTop: 30
  },
  quoteContainer: {
    flex: 0,
    alignContent: "flex-start",
    justifyContent: "center",

    marginTop: 10
  },
  biographyContainer: {
    flex: 0,
    alignContent: "flex-start",
    justifyContent: "center",
  },

  name: {
    color: colors.primary,

    fontSize: fontSize.veryBig,
    fontWeight: "bold"
  },
  title: {
    color: colors.blackOpacity40,

    fontSize: fontSize.big,
  },
  quote: {
    color: colors.blackOpacity40,

    fontSize: fontSize.veryBig,
    fontStyle: "italic"
  },
  quoteAuthor: {
    color: colors.blackOpacity25,

    fontSize: fontSize.small,
    fontStyle: "italic",

    textAlign: "right",
  },
  biographyTitle: {
    fontWeight: "bold"
  },
  biography: {
    color: colors.blackOpacity25,

    fontSize: fontSize.normal,
  },

  showMore: {
    position: "absolute",
    alignSelf: "center",

    margin: 5,
    marginVertical: 140 - fontSize.normal,
  },
  showLess: {
    alignSelf: "center",

    margin: 5
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