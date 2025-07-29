import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import ImagePath from "../Utails/ImagePath";
import { hp, wp } from "../Utails/Responsive";
import Colors from "../Utails/Colors";
import Fonts from "../Utails/Fonts";
import { useNavigation } from "@react-navigation/native";
import ModalCom from "./ModalCom";
import ScreensName from "../Utails/ScreensName";

const AddTruckPopupModle = ({ onBackdropPress, isVisible }) => {
  const navigation = useNavigation();
  return (
    <ModalCom
      contianerStyle={{
        backgroundColor: "rgba(0,0,0,0.9)",
        padding: 0,
        margin: 0,
      }}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
    >
      <StatusBar
        backgroundColor="#000" // Android: background color of the bar
        barStyle="light-content" // "light-content" for dark background, or "dark-content"
        translucent={false} // Set true if you want content to go under the bar
      />
      <View
        style={{
          alignSelf: "center",
          marginBottom: hp(10),
          marginTop: hp(-5),
          flexDirection: "row",
        }}
      >
        <View style={{ marginBottom: hp(5) }}>
          <Text
            style={{
              color: "#fff",
              fontSize: hp(3),
              fontFamily: Fonts.LATO_BOLD700,
              marginRight: wp(2),
            }}
          >
            BDRL - Truck Partner
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: hp(1.7),
              fontFamily: Fonts.LATO_Regular600,
            }}
          >
            BDRL LOGISTICS PRIVATE LIMITED
          </Text>
        </View>
        <FastImage
          source={ImagePath.splashLogo}
          style={{
            width: wp(24),
            height: hp(5.3),
            position: "relative",
            marginTop: hp(0.6),
          }}
          tintColor={"#fff"}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate(ScreensName.ADDNEWTRUCK);
        }}
        style={{ alignSelf: "center" }}
      >
        <Text style={{ color: "white", marginTop: hp(10), fontSize: hp(4) }}>
          Please First Add Your Truck
        </Text>
        <Text
          style={{ color: "white", fontSize: hp(1.5), marginBottom: hp(4) }}
        >
          Please first add your Truck for continue work with Us.
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: hp(2.5),
            marginTop: hp(0.5),
            fontFamily: Fonts.LATO_Light400,
            textAlign: "center",
            borderWidth: 1,
            borderColor: Colors.White,
            padding: wp(3),
            paddingVertical: hp(1.8),
            borderRadius: wp(4),
          }}
        >
          Add Your Truck
        </Text>
      </TouchableOpacity>
    </ModalCom>
  );
};

export default AddTruckPopupModle;

const styles = StyleSheet.create({});
