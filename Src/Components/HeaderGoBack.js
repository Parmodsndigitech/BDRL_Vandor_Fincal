import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { hp, wp } from "../Utails/Responsive";
import VectorIcon from "../Utails/VectorIcon";
import Colors from "../Utails/Colors";
import { useNavigation } from "@react-navigation/native";
import Fonts from "../Utails/Fonts";

const HeaderGoBack = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.contianer}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <VectorIcon
          type={"AntDesign"}
          name={"arrowleft"}
          size={30}
          color={Colors.textcolor1C274C}
        />
      </TouchableOpacity>
      <Text style={styles.activity}>{title}</Text>
    </View>
  );
};
export default HeaderGoBack;
const styles = StyleSheet.create({
  contianer: {
    height: hp(6),
    flexDirection: "row",
    alignItems: "center",
  },
  activity: {
    color: Colors.TxtColor,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.5),
    marginLeft: wp(1.5),
  },
});
