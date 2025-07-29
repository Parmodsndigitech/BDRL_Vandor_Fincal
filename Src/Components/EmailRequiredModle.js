import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ModalCom from "./ModalCom";
import Colors from "../Utails/Colors";
import { hp, wp } from "../Utails/Responsive";
import InputComp from "./InputComp";
import StringsName from "../Utails/StringsName";
import Fonts from "../Utails/Fonts";
import ButtonComp from "./ButtonComp";
import { ToastModel } from "./alert/ToastModel";
import { ApiUrl } from "../Constants/apiurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VectorIcon from "../Utails/VectorIcon";

const EmailRequiredModle = ({ onBackdropPress, isVisible, setIsVisible }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  // const isDotComEmail = email.toLowerCase().includes(".com");
  const isDotComEmail = email.toLowerCase().includes("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [emailData, setEmailData] = useState("");
  const inputRefs = useRef([]);
  //   const validateEmail = (email) => {
  //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     return regex.test(email);
  //   };

  // Gmail and Get OTP START  Part
  const validateEmail = (email) => {
    const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicRegex.test(email)) return false;
    const domain = email.split("@")[1].toLowerCase();
    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "protonmail.com",
      "icloud.com",
      "aol.com",
      "zoho.com",
      "mail.com",
      "yandex.com",
    ];
    return allowedDomains.includes(domain);
  };
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
  const _registerUser = async () => {
    // if (validateEmail(email)) {
      const fd = new FormData();
      fd.append("email", email);
      try {
        const response = await fetch(ApiUrl.registerApi, {
          method: "POST",
          body: fd,
          headers: {
            Accept: "multipart/form-data",
            "Content-Type": "multipart/form-data",
            //   Authorization: `Bearer ${token}`,
            //   token: token,
          },
        });
        const result = await response.json();
        // console.log('pamrod......',result )
        setEmailData(result);
        ToastModel({ type: "success", text2: result?.message });
      } catch (error) {
        console.error(error);
        // ToastModel({ type: "error", text2: result?.message });
          alert(`${result?.message}`)
      }
    // } else {
    //   Alert.alert(
    //     "Invalid Email Address",
    //     "Please enter a valid email address."
    //   );
    // }
  };
  useEffect(() => {
    setEmailData();
  }, [email]);

  //   OTP Verify Part START
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
      //   setLoading(true);
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
          email: email,
          otp: otpCode,
          role: "vendor",
        }),
      });
      const result = await response.json();
      if (result?.success == true) {
        setIsVisible(false);
        AsyncStorage.setItem("emailVerify", email).catch((err) =>
            console.log(err)
          );
        // navigation.navigate(ScreensName.CONGRATULATIONS);
      }
      // ToastModel({ type: "success", text2: result?.message });
          alert(`${result?.message}`)

    } catch (error) {
      console.error("Fetch error:", error);
      ToastModel({
        type: "error",
        text2: "There was an error processing your request.",
      });
    } finally {
      //   setLoading(false);
    }
  };

  return (
    <ModalCom
      contianerStyle={{
        backgroundColor: "rgba(0,0,0,0.0)",
        padding: 0,
        margin: 0,
      }}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
    >
      <View
        style={{
          backgroundColor: Colors.White,
          height: emailData?.success == true ? hp(50) : hp(30),
          marginHorizontal: wp(4),
          borderRadius: wp(4),
          padding: wp(4),
        }}
      >
      <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnGoBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <VectorIcon
            size={hp(3)}
            name={"arrowleft"}
            type={"AntDesign"}
            color={Colors.Black}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.titleTxt,
            {
              textAlign: "center",
              fontSize: hp(3),
              color: Colors.Black,
              fontWeight: "900",
              marginTop:hp(0)
            },
          ]}
        >
          Vendor Register
        </Text>

        <Text style={styles.titleTxt}>{StringsName.emailAddress}</Text>
        <InputComp
          placeholder={StringsName.enterEmailAddress}
          containerStyle={styles.containerStyle}
          value={email}
          onChangeText={(txt) => {
            setEmail(txt);
          }}
        />
        <ButtonComp
          disabled={isDotComEmail ? false : true}
          onPress={() => {
            _registerUser();
          }}
          title={"Send Otp"}
          containerTitle={{ fontSize: hp(2) }}
          containerStyle={{
            width: "35%",
            alignSelf: "flex-end",
            paddingVertical: hp(1.5),
            backgroundColor: isDotComEmail ? Colors.btnColor : Colors.lightGray,
          }}
        />

        {emailData?.success == true && (
          <View>
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
          </View>
        )}
      </View>
    </ModalCom>
  );
};

export default EmailRequiredModle;

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: wp(0.2),
    borderColor: Colors[525252],
  },
    btnGoBack: {
    width: wp(10),
    height: wp(10),
    justifyContent: "center",
  },
  titleTxt: {
    color: Colors[525252],
    fontSize: hp(2.2),
    fontFamily: Fonts.LATO_BOLD700,
    marginVertical: hp(0.5),
    marginTop: hp(1.5),
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp(2),
  },
  input: {
    width: wp(12),
    height: wp(12),
    borderWidth: wp(0.3),
    borderColor: Colors.lightGray,
    textAlign: "center",
    fontSize: hp(2),
    marginHorizontal: wp(1),
    borderRadius: wp(1.5),
    color: Colors.Black,
  },
});
