import {
  Alert,
  Button,
  Linking,
  PermissionsAndroid,
  StyleSheet,
  Platform,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { store } from "./Src/redux/store";
import { Provider } from "react-redux";
import Routes from "./Src/Routes/Routes";
import { LogBox } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { hp } from "./Src/Utails/Responsive";
import Fonts from "./Src/Utails/Fonts";
import Colors from "./Src/Utails/Colors";
import ZPractice from "./ZPractice";
import messaging from "@react-native-firebase/messaging";
import RNRestart from "react-native-restart";
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APIRequest, ApiUrl } from "./Src/Constants/apiurl";
// import messaging from '@react-native-firebase/messaging';
import { requestUserPermission } from "./Src/FirebaseNotification/NotificationService";
import { ToastModel } from "./Src/Components/alert/ToastModel";
export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState(null);
  const [vendorID, setvendorID] = useState("");

  // add code before START

  useEffect(() => {
    requestNotificationPermission();
    getFcmToken();
  }, []);
  const requestNotificationPermission = async () => {
    if (Platform.OS === "android" && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log("Notification permission granted");
        } else {
          console.log("Notification permission denied");
        }
      } catch (err) {
        console.warn("Permission request failed", err);
      }
    } else {
      console.log(
        "No need to request notification permission for this version"
      );
    }
  };

  const getFcmToken = async () => {
    const token = await messaging().getToken();
    // console.log("Fcm Token:. parmod new.", token);
  };
  // add code before START

  // internet Conncetion function  Start
  useEffect(() => {
    // setTimeout(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });
    return () => {
      unsubscribe();
    };
    // }, -2000);
  }, []);
  // internet Conncetion function  End

  // new code start %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // Request permission and send token to backend
  useEffect(() => {
    _getProfileData();
    requestPermission();
    sendFcmTokenToBackend();
  }, []);

  // Get vendor profile data
  const _getProfileData = async () => {
    let config = {
      url: ApiUrl.getDetailsApi,
      method: "get",
    };
    await APIRequest(
      config,
      (res) => {
        setvendorID(res?.data?._id);
        AsyncStorage.setItem("setvendor", JSON.stringify(res?.data?._id))
          .then(() => {
            // console.log("Vendor data saved successfully");
          })
          .catch((error) => {
            console.error("Error saving vendor data", error);
          });
      },
      (err) => {
        if (err?.message) {
          console.error("Error fetching profile data:", err.message);
        }
      }
    );
  };

  // Check and request permission for notifications
  const requestPermission = async () => {
    if (Platform.OS === "ios") {
      const permissionStatus = await request(PERMISSIONS.IOS.NOTIFICATIONS);
      if (permissionStatus === RESULTS.GRANTED) {
        // console.log("Notification permission granted on iOS");
      } else {
        showPermissionAlert();
      }
    } else if (Platform.OS === "android") {
      const permissionStatus = await check(PERMISSIONS.ANDROID.NOTIFICATIONS);
      if (permissionStatus !== RESULTS.GRANTED) {
        showPermissionAlert();
      }
    }
  };

  // Show alert to guide user to settings
  const showPermissionAlert = () => {
    Alert.alert(
      "Permission Required",
      "Please enable app permissions in your settings to receive notifications.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Go to Settings",
          onPress: openSettings,
        },
      ],
      { cancelable: false }
    );
  };

  // Open device settings
  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else if (Platform.OS === "android") {
      Linking.openURL("app-settings:");
    }
  };

  // Send FCM token to backend
  const sendFcmTokenToBackend = async (fcmToken) => {
    try {
      const storedData = await AsyncStorage.getItem("setvendor");
      const vendor = JSON.parse(storedData);
      const vendorIDD = vendor;
      const response = await fetch(ApiUrl.fcmTokeSendApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newFcmToken: fcmToken,
          userId: vendorID || vendorIDD,
        }),
      });
      const responseData = await response.json();
      // console.log("Token successfully sent to backend", responseData);
    } catch (error) {
      console.error(
        "Error retrieving vendor data or sending FCM token to backend",
        error
      );
    }
  };

  // Handle foreground push notification
  const foregroundNotificationHandler = messaging().onMessage(
    async (remoteMessage) => {
      // console.log("Received foreground notification:", remoteMessage);
      ToastModel({
        type: "success",
        text2: `${remoteMessage.notification.title} - ${remoteMessage.notification.body}`,
      });
    }
  );

  // Handle background notification opening
  const backgroundNotificationHandler = messaging().onNotificationOpenedApp(
    (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage
      );
      // Example: Navigate to a specific screen or update state
    }
  );

  // Check for initial notification when app is opened from a notification
  const checkInitialNotification = async () => {
    const remoteMessage = await messaging().getInitialNotification();
    if (remoteMessage) {
      console.log("App opened from a notification:", remoteMessage);
    }
  };

  // Request user permission and get FCM token
  useEffect(() => {
    const requestUserPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        // console.log("Notification permission granted");
      } else {
        console.log("Notification permission denied");
        showPermissionAlert(); // Show alert if permission is denied
      }
    };

    const getFcmToken = async () => {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        sendFcmTokenToBackend(fcmToken);
      } else {
        console.log("No FCM token available");
      }
    };

    requestUserPermission();
    getFcmToken();
    checkInitialNotification();

    // Clean up listeners on unmount
    return () => {
      foregroundNotificationHandler();
      backgroundNotificationHandler();
    };
  }, []);

  // new code end %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      {isConnected &&
      (connectionType === "wifi" || connectionType === "cellular") ? (
        <View style={{ flex: 1 }}>
          <Routes />
          <Toast />
          {/* <ZPractice /> */}
        </View>
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text
            style={{
              color: Colors[525252],
              fontSize: hp(2),
              fontFamily: Fonts.LATO_Regular600,
            }}
          >
            Please Checki Your Internet Connection..
          </Text>
          <Text
            style={{
              color: Colors.redF01919,
              textAlign: "center",
              fontSize: hp(2),
              fontFamily: Fonts.LATO_Regular600,
            }}
          >
            No internet connect...{" "}
          </Text>
        </View>
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({});
