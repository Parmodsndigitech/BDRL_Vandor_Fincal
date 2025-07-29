import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import AppWapper from "../../Components/AppWapper";
import Colors from "../../Utails/Colors";
import StatusBarr from "../../Components/StatusBarr";
import VectorIcon from "../../Utails/VectorIcon";
import { hp, wp } from "../../Utails/Responsive";
import { useNavigation } from "@react-navigation/native";
import ScreensName from "../../Utails/ScreensName";

export default function GetOtp() {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpInputRefs = useRef([]);
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < otpInputRefs.current.length - 1) {
      otpInputRefs.current[index + 1].focus();
    }

    const filteredArray = newOtp.filter((item) => item !== "");
    if (filteredArray.length === 4) {
      const newOtpp = newOtp.join("");
      Keyboard.dismiss();
    }
  };
  return (
    <AppWapper>
      <View style={styles.container}>
        <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
        <TouchableOpacity
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
        <View style={styles.loginContainer}>
          <Text style={styles.loginTxt}>{"Otp verification"}</Text>
          <Text style={styles.loginTxt2}>
            {"enter the verification code	we just sent on your phone number"}
          </Text>
          <View style={{ marginHorizontal: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: wp(4),
                marginHorizontal: 10,
                width: "80%",
                alignSelf: "center",
              }}
            >
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={{
                    color: "#000",
                    width: 45,
                    // backgroundColor: '#D3D3D3',
                    height: 45,
                    borderRadius: 10,
                    borderColor: "#D3D3D3",
                    borderWidth: 1,
                    marginHorizontal: 5,
                    textAlign: "center",
                    fontSize: 20,
                    color: Colors[525252],
                  }}
                  onChangeText={(text) => handleOtpChange(index, text)}
                  value={digit}
                  placeholderTextColor={Colors.gray878787}
                  maxLength={1}
                  keyboardType="numeric"
                  ref={(ref) => (otpInputRefs.current[index] = ref)}
                />
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: wp(5),
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: hp(1.7),
                  fontWeight: "500",
                  color: Colors.gray878787,
                }}
              >
                Didn’t receive any code?
                <Text style={{ color: Colors.btnColor }}> Resend</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{
                marginTop: wp(10),
                borderRadius: 10,
                backgroundColor: Colors.btnColor,
                width: "80%",
                justifyContent: "center",
                paddingVertical: 8,
                alignItems: "center",
                alignSelf: "center",
              }}
              onPress={() => navigation.navigate(ScreensName.LOGIN)}
            >
              <Text
                style={{ color: Colors.White, fontSize: 16, fontWeight: "600" }}
              >
                Verify
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ bottom: wp(10), alignSelf: "center" }}>
          <Text
            style={{
              color: Colors.btnColor,
              fontSize: hp(2),
              fontWeight: "700",
            }}
            onPress={() => navigation.navigate(ScreensName.LOGIN)}
          >
            {" "}
            Use email, instead
          </Text>
        </View>
      </View>
    </AppWapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(4),
  },
  btnGoBack: {
    width: wp(10),
    height: wp(10),
    justifyContent: "center",
    margin: wp(2),
  },
  loginTxt: {
    color: Colors.TxtColor,
    textAlign: "center",
    fontSize: hp(4.5),
    fontWeight: "600",
  },
  loginTxt2: {
    color: Colors.TxtColor,
    textAlign: "center",
    fontSize: hp(1.6),
    width: "70%",
    alignSelf: "center",
    fontWeight: "400",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});
