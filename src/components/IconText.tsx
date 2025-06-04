import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import { StyleSheet, Text, View, Dimensions, Image, ImageSourcePropType, StyleProp } from 'react-native';
import { anonUser } from '../assets/index.ts';

import colors from '../styles/colors.ts';
import padding from '../styles/padding.ts';
import fontSize from '../styles/fontSize.ts';

type iconTextProps = {
  style?: any,
  imageSrc : ImageSourcePropType
  color : string,
  text : string,
  textSize : number,
}

export default function ProfileWidget(props: iconTextProps) {
  return (
    <View style={[styles.container, props.style]}>
      <Image style={{tintColor: props.color, width: props.textSize + 5, height: props.textSize, marginVertical: 2.5}} source={props.imageSrc}/>
      <Text style={{color: props.color, fontSize: props.textSize}}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",

    gap: 5
  }
})