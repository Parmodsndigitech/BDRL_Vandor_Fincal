import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ImagePath from "../../Utails/ImagePath";
import { hp, wp } from "../../Utails/Responsive";
import StringsName from "../../Utails/StringsName";
import Colors from "../../Utails/Colors";
import Fonts from "../../Utails/Fonts";
import VectorIcon from "../../Utails/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import ScreensName from "../../Utails/ScreensName";
import { setItem } from "../../Utails/AsyncStorage";

const OnboardingThree = () => {
  const navigation = useNavigation();
  const _handleSkip = () => {
    navigation.navigate(ScreensName.LOGIN);
  };
  const _handleDone = () => {
    navigation.navigate(ScreensName.LOGIN);
    setItem("onboarded", "1");
  };
  return (
    <View style={styles.continaer}>
      <Text onPress={_handleSkip} style={styles.skipBtn}>
        {StringsName.Skip}
      </Text>
      <View style={styles.imageContinaer}>
        <View style={styles.imageInnerContinaer}>
          <Image
            source={ImagePath.onBardingEllipsesSmall}
            style={styles.onBardingEllipsesSmall}
          />
          <Image
            source={ImagePath.Onboarding03}
            style={styles.Onboarding01}
            resizeMode="contain"
          />
          <Image
            source={ImagePath.onBardingEllipsesSmall}
            style={styles.onBardingEllipsesLarge}
          />
        </View>
      </View>
      <View style={styles.dottedContinaer}>
        <View style={styles.dootedSecend} />
        <View style={styles.dootedThard} />
        <View style={styles.dootedFirst} />
      </View>
      <View style={styles.txtConitnaer}>
        <Text style={styles.onboardingHeading01}>
          {StringsName.OnboardingHeading03}
        </Text>
        <Text style={[styles.onboardingHeading01, styles.onboardingPara01]}>
          {StringsName.OnboardingPara03}
        </Text>
      </View>
      <View style={styles.bottomBtnContinaer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.backBtnTxt}>{StringsName.back}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_handleDone} style={styles.arrowBtn}>
          <VectorIcon
            type={"MaterialIcons"}
            name={"arrow-forward-ios"}
            color={Colors.White}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default OnboardingThree;
const styles = StyleSheet.create({
  continaer: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: "center",
    alignItems: "center",
  },
  skipBtn: {
    position: "absolute",
    top: hp(1),
    color: Colors.btnColor,
    padding: wp(1),
    fontSize: hp(2.2),
    fontFamily: Fonts.LATO_BOLD700,
    right: wp(5),
  },
  imageContinaer: {
    marginTop: hp(-10),
  },
  imageInnerContinaer: {
    width: wp(90),
    height: hp(30),
  },
  onBardingEllipsesSmall: {
    width: wp(8),
    height: hp(4),
    resizeMode: "contain",
    position: "absolute",
    right: wp(45),
    top: hp(-4),
  },
  Onboarding01: { width: "100%", height: "100%" },
  onBardingEllipsesLarge: {
    width: wp(10),
    height: hp(5),
    resizeMode: "contain",
    position: "relative",
    right: "-80%",
    top: hp(5),
  },
  txtConitnaer: { marginTop: hp(6), alignItems: "center" },
  onboardingHeading01: {
    color: Colors.TxtColor,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.5),
  },
  onboardingPara01: {
    fontSize: hp(1.9),
    textAlign: "center",
    width: wp(80),
    color: Colors.gray878787,
    marginVertical: hp(4),
    marginTop: hp(2),
    fontFamily: Fonts.LATO_Regular600,
  },
  arrowBtn: {
    backgroundColor: Colors.btnColor,
    padding: wp(4),
    borderRadius: wp(100),
  },
  dottedContinaer: { marginTop: hp(6), flexDirection: "row" },
  dootedFirst: {
    width: wp(8),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.btnColor,
  },
  dootedSecend: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.gray878787,
  },
  dootedThard: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.gray878787,
    marginHorizontal: wp(1.5),
  },
  bottomBtnContinaer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: wp(4),
    position: "absolute",
    bottom: hp(4),
  },
  backBtn: {
    borderWidth: wp(0.2),
    borderColor: Colors.btnColor,
    paddingHorizontal: wp(10),
    borderRadius: wp(2),
    height: hp(6),
    justifyContent: "center",
  },
  backBtnTxt: {
    color: Colors.btnColor,
    fontSize: hp(2.2),
    fontFamily: Fonts.LATO_Regular600,
  },
});
