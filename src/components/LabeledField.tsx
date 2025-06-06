import React, { useState } from 'react';
import DropShadow from 'react-native-drop-shadow';
import { StyleSheet, Text, View, TextInput, TextInputProps, TouchableOpacity, Image } from 'react-native';
import * as images from '../assets/index.ts';

import colors from '../styles/colors.ts';
import padding from '../styles/padding.ts';
import fontSize from '../styles/fontSize.ts';
import { useTranslation } from 'react-i18next';

interface LabeledFieldProps extends TextInputProps {
  warningText?: string,
}

export default function LabeledField(props: LabeledFieldProps) {
  const [passwordShow, setPasswordShow] = useState(props.secureTextEntry ? props.secureTextEntry : false)

  const showHide = () => {
    setPasswordShow(!passwordShow)
  }

  return (
    <View style={[styles.container, props.style]}>
      {props.warningText == undefined ? (
        <View>
          <TextInput style={[styles.input]} {...props} placeholderTextColor={colors.blackOpacity25} secureTextEntry={passwordShow}/>
          {props.secureTextEntry != undefined ? (
            <TouchableOpacity onPress={showHide}>
              <Image style={styles.showButton} source={passwordShow ? images.eyeOn : images.eyeOff} />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <View>
          <Text style={styles.label}>{props.warningText}</Text>
          <TextInput style={[styles.input, {borderColor: colors.red}]} {...props} placeholderTextColor={colors.blackOpacity25} secureTextEntry={passwordShow}/>
          {props.secureTextEntry != undefined ? (
            <TouchableOpacity onPress={showHide}>
              <Image style={styles.showButton} source={passwordShow ? images.eyeOn : images.eyeOff} />
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "visible",
    width: "100%",

    gap: 5
  },
  label: {
    color: colors.red,

    fontSize: fontSize.small
  },
  input: {
    color: colors.blackOpacity40,

    width: "100%",
    height: fontSize.big + 20,

    padding: padding.half,

    fontSize: fontSize.normal,

    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.blackOpacity40,
  },
  showButton: {
    tintColor: colors.blackOpacity40,
    backgroundColor : colors.white,

    width: 30,
    height: 30,

    position: 'absolute',

    alignSelf: 'flex-end',
    margin: 10,
    marginVertical: -34,
  }
})