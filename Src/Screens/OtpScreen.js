import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { hp, wp } from "../Utails/Responsive";
import Colors from "../Utails/Colors";
import ButtonComp from "../Components/ButtonComp";
import StatusBarr from "../Components/StatusBarr";
import { APIRequest, ApiUrl } from "../Constants/apiurl";
import Fonts from "../Utails/Fonts";
import { ToastModel } from "../Components/alert/ToastModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreensName from "../Utails/ScreensName";
import { useNavigation } from "@react-navigation/native";

const OtpScreen = ({ route }) => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const { data } = route?.params;

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, "");
    setOtp(newOtp);
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = () => {
    const otpCode = otp.join("");

  };

  const _OtpVerify = async () => {
    let token;

    try {
      token = await AsyncStorage.getItem("token");
    } catch (err) {
      console.error("Error retrieving token:", err);
      ToastModel({ type: "error", text2: "Failed to retrieve token." });
      return;
    }
    try {
      setLoading(true);
      const otpCode = otp.join("");
      const response = await fetch(ApiUrl.emailOtpVerify, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          token: token,
        },
        body: JSON.stringify({
          email: data,
          otp: otpCode,
          role: "vendor",
        }),
      });
      const result = await response.json();
      if (result?.success == true) {
        navigation.navigate(ScreensName.CONGRATULATIONS);
      }

      ToastModel({ type: "success", text2: result?.message });
    } catch (error) {
      console.error("Fetch error:", error);
      ToastModel({
        type: "error",
        text2: "There was an error processing your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  // user _resendOtp
  const _resendOtp = () => {
    let config = {
      url: `${ApiUrl.resendOtpApi}`,
      method: "post",
      body: {
        email: data,
        role: "vendor",
      },
    };
    setLoading(true);
    APIRequest(
      config,
      (res) => {
        // console.log("...", res);
        ToastModel({ type: "success", text2: res?.message });
        setLoading(false);
      },
      (err) => {
        console.log(err?.message, "---err");
        setLoading(false);
        if (err?.message) {
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBarr barStyle={"dark-content"} backgroundColor={Colors.White} />
      {loading && (
        <ActivityIndicator
          color={Colors.btnColor}
          size="large"
          style={styles.loader}
        />
      )}
      <Text style={[styles.title, { marginBottom: hp(0) }]}>Enter OTP</Text>
      <Text
        style={[
          styles.title,
          {
            fontSize: hp(1.5),
            marginTop: hp(0.5),
            color: Colors.gray878787,
            textAlign: "center",
          },
        ]}
      >
        <Text style={{ color: Colors.Black }}>Code has been send to :</Text>{" "}
        {`\n`}
        {data}
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={(ref) => (inputRefs.current[index] = ref)}
            autoFocus={index === 0}
            placeholderTextColor={Colors[525252]}
          />
        ))}
      </View>
      <ButtonComp
        disabled={otp ? false : true}
        onPress={() => {
          _OtpVerify();
        }}
        title={"Verify Otp"}
        containerStyle={{
          paddingHorizontal: wp(10),
          backgroundColor: otp ? Colors.btnColor : Colors.lightGray,
        }}
      />
      <Text
        onPress={() => _resendOtp()}
        style={[
          styles.title,
          {
            marginTop: hp(2),
            fontSize: hp(1.5),
            padding: wp(2),
            textDecorationLine: "underline",
          },
        ]}
      >
        Resent OTP
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: hp(3),
    marginVertical: hp(15),
    color: Colors.Black,
    fontFamily: Fonts.LATO_BOLD700,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: hp(5),
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 999,
    alignSelf: "center",
    backgroundColor: Colors.RgbaWhite,
  },
  input: {
    width: wp(11),
    height: wp(11),
    borderWidth: wp(0.3),
    borderColor: Colors.lightGray,
    textAlign: "center",
    fontSize: hp(2),
    marginHorizontal: wp(1),
    borderRadius: wp(1.5),
    color: Colors.Black,
  },
});

export default OtpScreen;
