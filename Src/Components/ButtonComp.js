import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../Utails/Colors";
import { hp, wp } from "../Utails/Responsive";
import Fonts from "../Utails/Fonts";

export default function ButtonComp({
  title,
  onPress,
  containerStyle,
  disabled,
  containerTitle
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      style={{ ...styles.container, ...containerStyle }}
      onPress={onPress}
    >
      <Text style={{...styles.btnTitle,...containerTitle}}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.btnColor,
    paddingVertical: hp(1.8),
    borderRadius: wp(2),
    marginTop: hp(1.5),
  },
  btnTitle: {
    color: Colors.White,
    textAlign: "center",
    fontFamily: Fonts.LATO_BOLD700,
    letterSpacing: wp(0.3),
    fontSize: hp(2),
  },
});
