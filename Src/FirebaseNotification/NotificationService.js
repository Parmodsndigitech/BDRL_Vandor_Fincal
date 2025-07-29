import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";
export const requestUserPermission = async () => {
  if (Platform.OS === "ios") {
    const authorizationStatus = await messaging().requestPermission();
    if (
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      // console.log("Notification permission granted");
    } else {
      console.log("Notification permission denied");
    }
  }
};
