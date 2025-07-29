//  // new code start %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//  useEffect(() => {
//     _getProfileData();
//     requestPermission();
//     sendFcmTokenToBackend();
//     requestUserPermission();
//   }, [vendorID]);
//   //  Permissions  START
//   const _getProfileData = async () => {
//     let config = {
//       url: ApiUrl.getDetailsApi,
//       method: "get",
//     };
//     await APIRequest(
//       config,
//       (res) => {
//         setvendorID(res?.data?._id);
//         AsyncStorage.setItem("setvendor", JSON.stringify(res?.data?._id))
//           .then(() => {
//             console.log("Vendor data saved successfully");
//           })
//           .catch((error) => {
//             console.error("Error saving vendor data", error);
//           });
//       },
//       (err) => {
//         if (err?.message) {
//           console.error("Error fetching profile data:", err.message);
//         }
//       }
//     );
//   };

//   useEffect(() => {
//     const checkPermission = async () => {
//       const permissionStatus = await check(PERMISSIONS.IOS.NOTIFICATIONS);
//       if (permissionStatus === RESULTS.GRANTED) {
//         console.log("Notification permission granted To BDRL_Vendor");
//       } else {
//         showPermissionAlert();
//       }
//     };
//     checkPermission();
//   }, []);

//   const openSettings = () => {
//     if (Platform.OS === "ios") {
//       Linking.openURL("app-settings:");
//     } else if (Platform.OS === "android") {
//       Linking.openURL("app-settings:");
//     }
//   };
//   const showPermissionAlert = () => {
//     Alert.alert(
//       "Permission Required",
//       "Please enable app permissions in your settings to receive notifications From BDRL-Vendor.",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Go to Settings",
//           onPress: openSettings,
//         },
//       ],
//       { cancelable: false }
//     );
//   };
//   const requestPermission = async () => {
//     const status = await request(PERMISSIONS.IOS.NOTIFICATIONS);
//     if (status === RESULTS.GRANTED) {
//       console.log("Notification permission granted");
//     } else {
//       showPermissionAlert();
//     }
//   };
//   const sendFcmTokenToBackend = async (fcmToken) => {
//     try {
//       const storedData = await AsyncStorage.getItem("setvendor");
//       const vendor = JSON.parse(storedData);
//       const vendorIDD = vendor;
//       const response = await fetch(ApiUrl.fcmTokeSendApi, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           newFcmToken: fcmToken,
//           userId: vendorID || vendorIDD,
//         }),
//       });
//       const responseData = await response.json();
//       // console.log("Token successfully sent to backend App", responseData);
//     } catch (error) {
//       //   // else {
//       //   //   console.log("No vendor data found in AsyncStorage");
//       //   // }
//       // }
//       console.error(
//         "Error retrieving vendor data or sending FCM token to backend",
//         error
//       );
//     }
//   };
//   useEffect(() => {
//     const requestUserPermission = async () => {
//       const authorizationStatus = await messaging().requestPermission();
//       if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
//         console.log("Notification permission granted");
//       } else {
//         console.log("Notification permission denied");
//       }
//     };
//     const getFcmToken = async () => {
//       const fcmToken = await messaging().getToken();
//       if (fcmToken) {
//         sendFcmTokenToBackend(fcmToken);
//       } else {
//         console.log("No FCM token available");
//       }
//     };
//     // Foreground notification handler
//     const unsubscribeOnMessage = messaging().onMessage(
//       async (remoteMessage) => {
//         console.log("Received foreground notification:", remoteMessage); //cd  set in state in fuchure parmod
//         ToastModel({
//           type: "success",
//           text2:
//             (remoteMessage.notification.title, remoteMessage.notification.body),
//         });
//       }
//     );
//     // Background or quit state notification handler
//     const unsubscribeOnNotificationOpenedApp =
//       messaging().onNotificationOpenedApp((remoteMessage) => {
//         // console.log(
//         //   "Notification caused app to open from background state: Parmod... set in state in fuchure ",
//         //   remoteMessage
//         // );
//       });
//     const checkInitialNotification = async () => {
//       const remoteMessage = await messaging().getInitialNotification();
//       if (remoteMessage) {
//         console.log("App opened from a notification:", remoteMessage);
//       }
//     };
//     // Request permission and get the FCM token
//     requestUserPermission();
//     getFcmToken();
//     checkInitialNotification();
//     return () => {
//       unsubscribeOnMessage();
//       unsubscribeOnNotificationOpenedApp();
//     };
//   }, []);
//   // For Ios Appication parmod kumar developer
//   useEffect(() => {
//     // Request permission for notifications (necessary for iOS)
//     const requestUserPermission = async () => {
//       const authorizationStatus = await messaging().requestPermission();
//       if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
//         console.log("Notification permission granted");
//       } else {
//         console.log("Notification permission denied");
//       }
//     };
//     // Get FCM token and send it to the backend
//     const getFcmToken = async () => {
//       try {
//         const fcmToken = await messaging().getToken();
//         // console.log('Pamrod FCM TOken....', fcmToken)
//         if (fcmToken) {
//           sendFcmTokenToBackend(fcmToken);
//         } else {
//           console.log("No FCM token available");
//         }
//       } catch (error) {
//         console.error("Error fetching FCM token", error);
//       }
//     };
//     // Foreground notification handler
//     const unsubscribeOnMessage = messaging().onMessage(
//       async (remoteMessage) => {
//         // console.log("Received foreground notification:", remoteMessage); set in state in fuchure parmod
//         ToastModel({
//           type: "success",
//           text2:
//             (remoteMessage.notification.title, remoteMessage.notification.body),
//         });
//       }
//     );
//     // Background or quit state notification handler
//     const unsubscribeOnNotificationOpenedApp =
//       messaging().onNotificationOpenedApp((remoteMessage) => {
//         console.log(
//           "Notification caused app to open from background state:",
//           remoteMessage
//         );
//         // Example: Navigate to a specific screen
//         // navigateToScreen(remoteMessage.data.screen); // You can use your navigation logic here
//       });
//     // Check if the app was opened from a notification
//     const checkInitialNotification = async () => {
//       const remoteMessage = await messaging().getInitialNotification();
//       if (remoteMessage) {
//         console.log("App opened from a notification:", remoteMessage);
//       }
//     };
//     requestUserPermission();
//     getFcmToken();
//     checkInitialNotification();
//     return () => {
//       unsubscribeOnMessage();
//       unsubscribeOnNotificationOpenedApp();
//     };
//   }, []);
//   //  Permissions  END

//   // new code end %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%