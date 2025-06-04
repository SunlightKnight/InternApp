import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import { StyleSheet, Text, View, Dimensions, Image, ImageSourcePropType, StyleProp, TouchableOpacity } from 'react-native';
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
  onPress? : () => void
}

export default function IconText(props: iconTextProps) {
  return (
    <View style={[styles.container, props.style]}>
      <Image style={{tintColor: props.color, width: props.textSize + 5, height: props.textSize, marginVertical: 2.5, overflow : "visible"}} source={props.imageSrc}/>
      {props.onPress == undefined ? (
        <Text style={{color: props.color, fontSize: props.textSize}}>{props.text}</Text>
      ) : (
        <TouchableOpacity onPress={props.onPress}>
          <Text style={{color: props.color, fontSize: props.textSize}}>{props.text}</Text>
        </TouchableOpacity>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    alignContent: "center",
    overflow: "visible",

    gap: 5
  }
})