// package
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, Text, View } from "react-native";

// Utails
import ImagePath from "../Utails/ImagePath";
import { hp, wp } from "../Utails/Responsive";
import ScreensName from "../Utails/ScreensName";
import Colors from "../Utails/Colors";
import Fonts from "../Utails/Fonts";
import StringsName from "../Utails/StringsName";

// Screens
import Home from "../Screens/Home/Home";
import Acitivty from "../Screens/Acitivty/Acitivty";
import Profile from "../Screens/Profile/Profile";
import Approval from "../Screens/Approval/Approval";
import { APIRequest, ApiUrl } from "../Constants/apiurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ToastModel } from "../Components/alert/ToastModel";

// var
const _Width = "100%";
const _Height = "100%";
const _Active = wp(9);
const _UnActive = wp(8);
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const [vendorID, setVendorID] = useState("");
  useEffect(() => {
    if (vendorID) {
      upadteFCMToken();
    }
  }, [vendorID]);
  const upadteFCMToken = async () => {
    try {
      const [fcmTokenNN, venderIDD] = await Promise.all([
        AsyncStorage.getItem("fcmToken"),
        AsyncStorage.getItem("saveVendorID"),
      ]);
      // console.log('fcmTokenNNfcmTokenNNfcmTokenNN...',fcmTokenNN,)
      // console.log('venderIDDvenderIDDvenderIDD...',venderIDD,)
      if (fcmTokenNN && venderIDD) {
        const config = {
          url: `${ApiUrl.fcmTokeSendApi}`,
          method: "put",
          body: {
            userId: venderIDD,
            newFcmToken: fcmTokenNN,
            // role: "vendor",
          },
        };
        APIRequest(
          config,
          (res) => {
            console.log("FCM Token updated successfully:", res);
            ToastModel({ type: "success", text2: res?.message });
          },
          (err) => {
            ToastModel({ type: "error", text2: err?.message });
          }
        );
      } else {
        ToastAndroid.show(
          "Missing FCM token or vendor ID.",
          ToastAndroid.SHORT
        );
        ToastModel({ type: "error", text2: "Missing FCM token or vendor ID" });
      }
    } catch (error) {
      console.error("Error in upadteFCMToken:", error);
    }
  };
  return (
    <Tab.Navigator
      initialRouteName={ScreensName.HOME}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: hp(8),
          backgroundColor: Colors.White,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name={ScreensName.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ width: _Active }}>
                <Image
                  source={ImagePath.BottomHome}
                  style={{
                    width: _Width,
                    height: _Height,
                    resizeMode: "contain",
                    tintColor: focused ? Colors.Black : Colors.Black,
                  }}
                />
                <Text style={styles.activeLabel}>{StringsName.home}</Text>
              </View>
            ) : (
              <View style={{ width: _UnActive }}>
                <Image
                  source={ImagePath.BottomHome}
                  style={{
                    width: _Width,
                    height: _Height,
                    resizeMode: "contain",
                    tintColor: focused ? Colors.Black : Colors.Black,
                  }}
                />
                <Text />
              </View>
            ),
        }}
      />

      <Tab.Screen
        name={ScreensName.ACITIVTY}
        component={Acitivty}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ width: _Active }}>
                <Image
                  source={ImagePath.BottomActivity}
                  style={{
                    width: _Width,
                    height: _Height,
                    resizeMode: "contain",
                    tintColor: focused ? Colors.Black : Colors.Black,
                  }}
                />
                <Text style={[styles.activeLabel, { fontSize: hp(1.2) }]}>
                  {/* {StringsName.activity} */}
                  {"Trips"}
                </Text>
              </View>
            ) : (
              <View style={{ width: _UnActive }}>
                <Image
                  source={ImagePath.BottomActivity}
                  style={{
                    width: _Width,
                    height: _Height,
                    resizeMode: "contain",
                    tintColor: focused ? Colors.Black : Colors.Black,
                  }}
                />
                <Text />
              </View>
            ),
        }}
      />

      <Tab.Screen
        name={ScreensName.APPROVAL}
        component={Approval}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ width: wp(10) }}>
                <Image
                  source={ImagePath.vanderTrack}
                  style={{
                    width: _Width,
                    height: _Height,
                    resizeMode: "contain",
                    tintColor: focused ? Colors.Black : Colors.Black,
                  }}
                />
                <Text style={styles.activeLabel}>{"Trucks"}</Text>
              </View>
            ) : (
              <View style={{ width: wp(9) }}>
                <Image
                  source={ImagePath.vanderTrack}
                  style={{
                    width: _Width,
                    height: _Height,
                    resizeMode: "contain",
                    tintColor: focused ? Colors.Black : Colors.Black,
                  }}
                />
              </View>
            ),
        }}
      />

      <Tab.Screen
        name={ScreensName.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ width: _Active }}>
                <Image
                  source={ImagePath.Bottomprofile}
                  style={{
                    width: _Width,
                    height: _Height,
                    resizeMode: "contain",
                    tintColor: focused ? Colors.Black : Colors.Black,
                  }}
                />
                <Text style={[styles.activeLabel, { fontSize: hp(1.2) }]}>
                  {StringsName.profile}
                </Text>
              </View>
            ) : (
              <View style={{ width: _UnActive }}>
                <Image
                  source={ImagePath.Bottomprofile}
                  style={{
                    width: _Width,
                    height: _Height,
                    resizeMode: "contain",
                    tintColor: focused ? Colors.Black : Colors.Black,
                  }}
                />
              </View>
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  activeLabel: {
    color: Colors.Black,
    position: "absolute",
    bottom: hp(0.2),
    fontSize: hp(1.4),
    alignSelf: "center",
    fontFamily: Fonts.LATO_BOLD700,
  },
});
