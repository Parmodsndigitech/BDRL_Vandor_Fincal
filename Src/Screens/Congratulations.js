import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import FastImage from "react-native-fast-image";
import ImagePath from "../Utails/ImagePath";
import { hp, wp } from "../Utails/Responsive";
import Colors from "../Utails/Colors";
import ScreensName from "../Utails/ScreensName";
import { useNavigation } from "@react-navigation/native";

const Congratulations = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(ScreensName.LOGIN);
    }, 2000);
  }, []);
  return (
    <View style={styles.contianer}>
      <Text style={{ color: Colors.Black, fontSize: hp(3.5) }}>
        Congratulations
      </Text>
      <FastImage
        source={ImagePath.congatucationGif}
        style={{ width: wp(100), height: hp(40), borderRadius: wp(50) }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Congratulations;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
