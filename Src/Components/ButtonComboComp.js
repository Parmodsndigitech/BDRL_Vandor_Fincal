import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { hp, wp } from "../Utails/Responsive";
import Colors from "../Utails/Colors";
import Fonts from "../Utails/Fonts";

export default function ButtonComboComp({ disabled, titleRight,onPressRight,bntContianerStyle }) {
  return (
    <View style={styles.invoiBookAgainContainer}>
    <TouchableOpacity/>
      <TouchableOpacity
      disabled={disabled}
        activeOpacity={0.8}
        style={{...styles.BtnInvoiBookAgain,...bntContianerStyle}}
        onPress={onPressRight}
      >
        <Text style={[styles.BtnInvoiBookAgainTxt, { color: Colors.White }]}>
          {titleRight}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  invoiBookAgainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(1),
    marginTop: hp(1),
  },
  BtnInvoiBookAgain: {
    padding: wp(3.5),
    borderRadius: wp(1.8),
    width: "47%",
    backgroundColor: Colors.btnColor 
  },
  BtnInvoiBookAgainTxt: {
    color: Colors.btnColor,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.1),
    textAlign: "center",
  
  },
});
