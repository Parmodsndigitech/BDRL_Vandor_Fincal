// packages
import {
  Alert,
  BackHandler,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Linking,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
// Utails
import ScreensName from "../../Utails/ScreensName";
import Colors from "../../Utails/Colors";
import { hp, wp } from "../../Utails/Responsive";
import Fonts from "../../Utails/Fonts";
// Components
import HeaderNotifaction from "../../Components/HeaderNotifaction";
import AppWapper from "../../Components/AppWapper";
import StatusBarr from "../../Components/StatusBarr";
import QuotationRequest from "../../Components/QuotationRequest";
import CountryQuotation from "../../Components/CountryQuotation";
import SliderAutoPlay from "../../Components/SliderAutoPlay";
import { APIRequest, ApiUrl } from "../../Constants/apiurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { requestUserPermission } from "../../FirebaseNotification/NotificationService";
import { ToastModel } from "../../Components/alert/ToastModel";
import AddTruckPopupModle from "../../Components/AddTruckPopupModle";
import InAppUpdates, { IAUUpdateKind } from "sp-react-native-in-app-updates";
import { useSelector } from "react-redux";

const inAppUpdates = new InAppUpdates(false); // isDebug: false

export const checkForMandatoryUpdate = async () => {
  try {
    const result = await inAppUpdates.checkNeedsUpdate();

    if (result.shouldUpdate) {
      if (Platform.OS === "android") {
        inAppUpdates.startUpdate({
          updateType: IAUUpdateKind.IMMEDIATE,
        });
      } else {
        // iOS Alert
        Alert.alert(
          "Update Required",
          "A new version of the app is available. Please update to continue.",
          [
            {
              text: "Update Now",
              onPress: () => {
                // Redirect to App Store
                Linking.openURL("https://apps.apple.com/app/idYOUR_APP_ID");
                BackHandler.exitApp();
              },
            },
          ],
          { cancelable: false }
        );
      }
    }
  } catch (error) {
    // console.log('Update check error:', error);  you can uncommit this

    // Handle case when Google Play blocks install due to battery/disk (error -6)
    if (Platform.OS === "android") {
      // Alert.alert(
      //   'Cannot Update Now',
      //   'Please check your battery level or storage. The update cannot proceed.',
      //   [{ text: 'Exit', onPress: () => BackHandler.exitApp() }],
      //   { cancelable: false }
      // );
    }
  }
};

// ########################################
export default function Home() {
  const gettruckData = useSelector((state) => state.isLogin?.userData);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [vendorID, setvendorID] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [truckData, SetTruckData] = useState();

  // Firebase Notifaction for All  Start
  // new code start %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% For Fush Notfaction
  useEffect(() => {
    checkForMandatoryUpdate();
    _getProfileData();
    _getAllQuotation();
    requestPermission();
    sendFcmTokenToBackend();
    requestUserPermission();
  }, [vendorID]);
  //  Permissions  START
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
            // console.error("Error saving vendor data", error);
          });
      },
      (err) => {
        if (err?.message) {
          console.error("Error fetching profile data:", err.message);
        }
      }
    );
  };
  const _getAllQuotation = () => {
    let config = {
      url: ApiUrl.getAllQuery,
      method: "get",
    };
    APIRequest(
      config,
      (res) => {
        ToastModel({ type: "success", text2: res?.message });
      },
      (err) => {
        if (err?.message) {
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };

  useEffect(() => {
    const checkPermission = async () => {
      const permissionStatus = await check(PERMISSIONS.IOS.NOTIFICATIONS);
      if (permissionStatus === RESULTS.GRANTED) {
        // console.log("Notification permission granted To BDRL_Vendor");
      } else {
        showPermissionAlert();
      }
    };
    checkPermission();
  }, []);
  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else if (Platform.OS === "android") {
      Linking.openURL("app-settings:");
    }
  };
  const showPermissionAlert = () => {
    Alert.alert(
      "Permission Required",
      "Please enable app permissions in your settings to receive notifications From BDRL-Vendor.",
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
  const requestPermission = async () => {
    const status = await request(PERMISSIONS.IOS.NOTIFICATIONS);
    if (status === RESULTS.GRANTED) {
      // console.log("Notification permission granted");
    } else {
      showPermissionAlert();
    }
  };
  const sendFcmTokenToBackend = async (fcmToken) => {
    try {
      const storedData = await AsyncStorage.getItem("setvendor");
      // if ((storedData !== null) == vendorID) {
      const vendor = JSON.parse(storedData);
      const vendorIDD = vendor;
      // console.log('parmod FCM Home:', fcmToken)
      // console.log('parmod vendorIDD Home:', vendorIDD)
      // console.log('parmod vendorID Home:', vendorID)
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
      // console.log("Token successfully sent to backend Home", responseData);
      // }
      // else {
      //   console.log("No vendor data found in AsyncStorage");
      // }
    } catch (error) {
      console.error(
        "Error retrieving vendor data or sending FCM token to backend",
        error
      );
    }
  };
  useEffect(() => {
    const requestUserPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        // console.log("Notification permission granted");
      } else {
        console.log("Notification permission denied");
      }
    };
    const getFcmToken = async () => {
      const fcmToken = await messaging().getToken();
      // console.log("Token...", fcmToken);
      if (fcmToken) {
        sendFcmTokenToBackend(fcmToken);
      } else {
        console.log("No FCM token available");
      }
    };
    // Foreground notification handler
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        // console.log("Received foreground notification:", remoteMessage); set in state in fuchure
        ToastModel({
          type: "success",
          text2:
            (remoteMessage.notification.title, remoteMessage.notification.body),
        });
      }
    );
    // Background or quit state notification handler
    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp((remoteMessage) => {
        // console.log(
        //   "Notification caused app to open from background state: Parmod... set in state in fuchure ",
        //   remoteMessage
        // );
      });
    const checkInitialNotification = async () => {
      const remoteMessage = await messaging().getInitialNotification();
      if (remoteMessage) {
        console.log("App opened from a notification:", remoteMessage);
      }
    };
    // Request permission and get the FCM token
    requestUserPermission();
    getFcmToken();
    checkInitialNotification();
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);
  // For Ios Appication parmod kumar developer
  useEffect(() => {
    // Request permission for notifications (necessary for iOS)
    const requestUserPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        // console.log("Notification permission granted");
      } else {
        console.log("Notification permission denied");
      }
    };
    // Get FCM token and send it to the backend
    const getFcmToken = async () => {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          sendFcmTokenToBackend(fcmToken);
        } else {
          console.log("No FCM token available");
        }
      } catch (error) {
        console.error("Error fetching FCM token", error);
      }
    };
    // Foreground notification handler
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        // console.log("Received foreground notification:", remoteMessage); set in state in fuchure pamrod
        ToastModel({
          type: "success",
          text2:
            (remoteMessage.notification.title, remoteMessage.notification.body),
        });
      }
    );
    // Background or quit state notification handler
    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          "Notification caused app to open from background state:",
          remoteMessage
        );
        // Example: Navigate to a specific screen
        // navigateToScreen(remoteMessage.data.screen); // You can use your navigation logic here
      });
    // Check if the app was opened from a notification
    const checkInitialNotification = async () => {
      const remoteMessage = await messaging().getInitialNotification();
      if (remoteMessage) {
        console.log("App opened from a notification:", remoteMessage);
        // Handle the initial notification if needed
      }
    };
    // Execute all the logic
    requestUserPermission();
    getFcmToken();
    checkInitialNotification();
    // Cleanup listeners on unmount
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);
  //  Permissions  END
  // new code end %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // page refress
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        sendFcmTokenToBackend();
        _getProfileData();
        _getAllQuotation();
        return false;
      }
    );
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      sendFcmTokenToBackend();
      _getProfileData();
      _getAllQuotation();
      Alert.alert("Confirm exit", "Do you want to go back?", [
        { text: "Cancel", style: "cancel", onPress: () => {} },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    });

    return () => {
      backHandler.remove();
      navigation.removeListener("beforeRemove");
    };
  }, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      sendFcmTokenToBackend();
      _getProfileData();
      _getAllQuotation();
      return;
    }, [])
  );
  // onRefresh
  // const onRefresh = () => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     sendFcmTokenToBackend();
  //     _getProfileData();
  //     _getAllQuotation()
  //     setRefreshing(false);
  //   }, 200);
  // };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      sendFcmTokenToBackend();
      _getProfileData();
      _getAllQuotation();
      setRefreshing(false);
    }, 200);
  }, []);
  // useEffect(() => {
  //   setIsVisible(true)
  //   setTimeout(() => {
  //     setIsVisible(false)
  //   },2000);
  // }, []);

  useEffect(() => {
    _pamrodj();
    _getAllTrack();
  }, []);

  useEffect(()=>{
    setIsVisible(true);
  },[])
  useEffect(()=>{
    if (truckData || gettruckData) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  },[truckData,gettruckData])
  const _pamrodj = async () => {
    try {
      // const storedData = await AsyncStorage.getItem("checkTruckModle");
      // const vendor = JSON.parse(storedData);
      // const vendorIDD = vendor;
      // if(vendorIDD){
      if (truckData || gettruckData) {
        setIsVisible(false);
      }
    } catch (error) {
      console.log("errr..", err);
    }
  };
  const _getAllTrack = () => {
    let config = {
      url: ApiUrl.getAllTruckApi,
      method: "get",
    };
    APIRequest(
      config,
      (res) => {
        if (res?.data) {
          SetTruckData(res?.data);
          //  AsyncStorage.setItem("checkTruckModle", JSON.stringify(res?.data))
          setIsVisible(false);
        }
      },
      (err) => {
        if (err?.message) {
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };

  // Check If any Update ************** START
  useEffect(() => {
    checkForMandatoryUpdate();
  }, []);

  return (
    <AppWapper>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
        <HeaderNotifaction
          onPress={() => {
            navigation.navigate(ScreensName.NOTIFACTION);
          }}
        />
        <View>
          <SliderAutoPlay />
          <QuotationRequest />
          <CountryQuotation
            refreshData={onRefresh}
            countryTitle={""}
            countryCount={""}
          />
        </View>
      </ScrollView>
      <AddTruckPopupModle
        isVisible={isVisible}
        // onBackdropPress={() => setIsVisible(false)}
      />
    </AppWapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(4),
  },
  whatsshipmenttoday: {
    color: Colors.textcolor1C274C,
    fontSize: hp(2.2),
    fontFamily: Fonts.LATO_BOLD700,
  },
  transit: {
    fontFamily: Fonts.LATO_BOLD700,
    color: Colors[525252],
    fontSize: hp(2.2),
    margin: wp(2),
  },
});
