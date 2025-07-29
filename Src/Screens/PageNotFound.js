import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppWapper from "../Components/AppWapper";
import StatusBarr from "../Components/StatusBarr";
import HeaderGoBack from "../Components/HeaderGoBack";
import Colors from "../Utails/Colors";
import StringsName from "../Utails/StringsName";
import { hp, wp } from "../Utails/Responsive";
import ImagePath from "../Utails/ImagePath";
import Fonts from "../Utails/Fonts";
import ButtonComp from "../Components/ButtonComp";
import FastImage from "react-native-fast-image";

export default function PageNotFound() {
  return (
    <AppWapper>
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.headerGoBackContianer}>
        <HeaderGoBack title={""} />
      </View>
      <View style={styles.container}>
        <View style={styles.noInternetGifContianer}>
          <FastImage
            source={ImagePath.error404Gif}
            style={styles.noInternetGif}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.yourOffline}>{StringsName.pageNotFound}</Text>
          <Text style={styles.checkWiFidata}>
            {StringsName.weSorryGoBackHome}
          </Text>
        </View>

        <View style={styles.bntContianer}>
          <ButtonComp
            title={StringsName.backToHomeCaptial}
            onPress={() => {
              Alert.alert("Alert");
            }}
          />
        </View>
      </View>
    </AppWapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(2),
    // paddingBottom: hp(5),
    paddingVertical: hp(1),
    justifyContent: "center",
    // alignItems: "center",
  },
  headerGoBackContianer: {
    paddingHorizontal: wp(4),
    borderBottomWidth: wp(0.6),
    borderColor: Colors.F7F7F7,
    backgroundColor: Colors.White,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  noInternetGifContianer: {
    alignSelf: "center",
    width: wp(70),
    height: hp(30),
    marginTop: hp(-20),
  },
  noInternetGif: { width: "100%", height: "100%", resizeMode: "cover" },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  yourOffline: {
    marginTop: hp(2),
    marginBottom: hp(0.5),
    color: Colors.textcolor1C274C,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.4),
  },
  checkWiFidata: {
    color: Colors.textcolor1C274C,
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(1.9),
    textAlign: "center",
  },
  refreshBtn: {
    padding: wp(2),
    backgroundColor: Colors.btnColor,
    borderRadius: wp(1.5),
  },
  bntContianer: { width: "50%", alignSelf: "center", marginVertical: hp(2) },
});
