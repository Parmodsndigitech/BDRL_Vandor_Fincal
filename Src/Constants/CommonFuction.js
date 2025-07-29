import axios from "axios";
import Config from "../Constants/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const postApi = async (EndPoint, body) => {
  try {
    let isFormData = body instanceof FormData;
    let authToken = await AsyncStorage.getItem("authKey");
    let response = await axios.post(Config.BaseUrl + EndPoint, body, {
      headers: {
        authKey: authToken,
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
