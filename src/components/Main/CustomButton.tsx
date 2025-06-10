import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from '../../styles/colors';
import padding from '../../styles/padding';
import fontSize from '../../styles/fontSize';

type CustomButtonProps = {
  text: string
  onPress: (event: any) => void 
}

export default function CustomButton(props: CustomButtonProps) {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: padding.threequarters,
    backgroundColor: colors.primary,
    borderRadius: 5
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.normal,
    fontWeight: "600"
  }
});
