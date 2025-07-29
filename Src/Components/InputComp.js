import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { hp, wp } from "../Utails/Responsive";
import Colors from "../Utails/Colors";
import Fonts from "../Utails/Fonts";

const InputComp = ({
  placeholder,
  containerStyle,
  maxLength,
  keyboardType,
  value,
  onChangeText,
  multiline,
  editable,
  inputStyleInner,
}) => {
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <TextInput
        multiline={multiline}
        editable={editable}
        onChangeText={onChangeText}
        value={value}
        maxLength={maxLength}
        keyboardType={keyboardType ? "phone-pad" : "default"}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray878787}
        style={{ ...styles.inputStyle, ...inputStyleInner }}
      />
    </View>
  );
};
export default InputComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabColor,
    paddingHorizontal: wp(2),
    height: hp(5.8),
    borderRadius: wp(1.5),
  },
  inputStyle: {
    padding: 0,
    width: "100%",
    height: "100%",
    color: Colors.textcolor1C274C,
    fontFamily: Fonts.LATO_Regular600,
  },
});
