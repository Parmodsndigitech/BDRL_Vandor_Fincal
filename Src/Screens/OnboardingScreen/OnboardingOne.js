// package
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

// Utails
import ImagePath from "../../Utails/ImagePath";
import { hp, wp } from "../../Utails/Responsive";
import StringsName from "../../Utails/StringsName";
import Colors from "../../Utails/Colors";
import Fonts from "../../Utails/Fonts";
import VectorIcon from "../../Utails/VectorIcon";
import ScreensName from "../../Utails/ScreensName";
import { setItem } from "../../Utails/AsyncStorage";
// Components
import StatusBarr from "../../Components/StatusBarr";
const OnboardingOne = () => {
  const navigation = useNavigation();
  const _handleSkip = () => {
    navigation.navigate(ScreensName.LOGIN);
  };
  const _handleDone = () => {
    navigation.navigate(ScreensName.ONBOARDINGSCREENTWO);
    setItem("onboarded", "1");
  };
  return (
    <View style={styles.continaer}>
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
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
            source={ImagePath.Onboarding01}
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
        <View style={styles.dootedFirst} />
        <View style={styles.dootedSecend} />
        <View style={styles.dootedThard} />
      </View>

      <View style={styles.txtConitnaer}>
        <Text style={styles.onboardingHeading01}>
          {StringsName.OnboardingHeading01}
        </Text>
        <Text style={[styles.onboardingHeading01, styles.onboardingPara01]}>
          {StringsName.OnboardingPara01}
        </Text>
      </View>

      <TouchableOpacity onPress={_handleDone} style={styles.arrowBtn}>
        <VectorIcon
          type={"MaterialIcons"}
          name={"arrow-forward-ios"}
          color={Colors.White}
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingOne;

const styles = StyleSheet.create({
  continaer: {
    backgroundColor: Colors.White,
    flex: 1,
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
    right: wp(2),
  },
  Onboarding01: { width: "100%", height: "100%" },
  onBardingEllipsesLarge: {
    width: wp(10),
    height: hp(5),
    resizeMode: "contain",
  },
  txtConitnaer: { marginTop: hp(6), alignItems: "center" },
  onboardingHeading01: {
    color: Colors.TxtColor,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.5),
    textAlign: "center",
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
    position: "absolute",
    bottom: hp(4),
    right: wp(7),
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
    marginHorizontal: wp(1.5),
  },
  dootedThard: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.gray878787,
  },
});
