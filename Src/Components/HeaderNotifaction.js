import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ImagePath from "../Utails/ImagePath";
import { hp, wp } from "../Utails/Responsive";
export default function HeaderNotifaction({ onPress }) {
  return (
    <View style={styles.contianer}>
      <TouchableOpacity
        style={styles.logoHomeContainer}
        activeOpacity={0.8}
        onPress={() => {
          Alert.alert("Alert");
        }}
      >
        <Image source={ImagePath.logoHome} style={styles.logoHome} />
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.notifactionBellContaner}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Image
          source={ImagePath.notifactionBell}
          style={styles.notifactionBell}
        />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  contianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp(1.5),
  },
  logoHomeContainer: {
    width: wp(20),
    height: hp(5),
  },
  logoHome: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  notifactionBell: {
    width: wp(20),
    height: hp(7),
  },
  notifactionBell: {
    width: wp(7),
    resizeMode: "contain",
  },
});
