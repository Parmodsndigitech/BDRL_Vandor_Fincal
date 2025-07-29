import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AppWapper from "../../Components/AppWapper";
import HeaderGoBack from "../../Components/HeaderGoBack";
import StatusBarr from "../../Components/StatusBarr";
import Colors from "../../Utails/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { hp, wp } from "../../Utails/Responsive";
import StringsName from "../../Utails/StringsName";
import Fonts from "../../Utails/Fonts";
import InputComp from "../../Components/InputComp";
import ScreensName from "../../Utails/ScreensName";
import { APIRequest, ApiUrl } from "../../Constants/apiurl";
import { ToastModel } from "../../Components/alert/ToastModel";
export default function CreatePassword({ navigation, route }) {
  const [otp, setOtp] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const { userEmail } = route?.params;
  const [loading, setLoading] = useState(false);

  // user _OtpVerifyWithPasswordChange
  const _OtpVerifyWithPasswordChange = () => {
    let config = {
      url: `${ApiUrl.passwordResetApi}`,
      method: "post",
      body: {
        email: userEmail,
        password: newPassword,
        confirmPassword: confirmPassword,
        otp: otp,
      },
    };
    setLoading(true);
    APIRequest(
      config,
      (res) => {
        if (res?.success == true) {
          navigation.navigate(ScreensName.LOGIN);
        }
        ToastModel({ type: "success", text2: res?.message });
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        if (err?.message) {
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };
  // user _resendOtp
  const _resendOtp = () => {
    let config = {
      url: `${ApiUrl.resendOtpApi}`,
      method: "post",
      body: {
        email: userEmail,
        role: "vendor",
      },
    };
    setLoading(true);
    APIRequest(
      config,
      (res) => {
        ToastModel({ type: "success", text2: res?.message });
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        if (err?.message) {
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };
  return (
    <AppWapper>
      {loading && (
        <ActivityIndicator
          color={Colors.btnColor}
          size="large"
          style={styles.loader}
        />
      )}
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.headerGoBackContianer}>
        <HeaderGoBack />
      </View>

      <View style={styles.container}>
        <KeyboardAwareScrollView
          extraHeight={150}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.passwordContianer}>
            <Text style={styles.forgotPassword}>
              {StringsName.setNewPassword}
            </Text>

            <Text
              style={{
                fontFamily: Fonts.LATO_BOLD700,
                fontSize: hp(1.5),
                color: Colors.gray878787,
                textAlign: "center",
              }}
            >
              We’ve sent an OTP to your email
            </Text>
            <Text
              style={{
                fontFamily: Fonts.LATO_BOLD700,
                fontSize: hp(1.8),
                color: Colors.Black,
                textAlign: "center",
              }}
            >
              {userEmail}
            </Text>
          </View>
          <Text
            style={[
              styles.btnTxt,
              {
                alignSelf: "flex-start",
                paddingLeft: wp(6),
                color: Colors[525252],
              },
            ]}
          >
            {StringsName.enterOTP}
          </Text>
          <View style={styles.inputContianer}>
            <InputComp
              placeholder={StringsName.enterOTP}
              maxLength={6}
              keyboardType={true}
              onChangeText={(text) => {
                setOtp(text);
              }}
              value={otp}
            />
          </View>
          <Text
            onPress={() => {
              _resendOtp();
            }}
            style={{
              color: Colors.Black,
              fontSize: hp(1.6),
              fontFamily: Fonts.LATO_BOLD700,
              paddingHorizontal: wp(6),
              marginTop: hp(-0.5),
              textAlign: "right",
            }}
          >
            Resend
          </Text>
          <Text
            style={[
              styles.btnTxt,
              {
                alignSelf: "flex-start",
                paddingLeft: wp(6),
                color: Colors[525252],
              },
            ]}
          >
            {StringsName.newPassword}
          </Text>
          <View style={styles.inputContianer}>
            <InputComp
              placeholder={StringsName.newPassword}
              onChangeText={(text) => {
                setNewPassword(text);
              }}
              value={newPassword}
            />
          </View>
          <Text
            style={[
              styles.btnTxt,
              {
                alignSelf: "flex-start",
                paddingLeft: wp(6),
                color: Colors[525252],
              },
            ]}
          >
            {StringsName.conPassowrd}
          </Text>
          <View style={styles.inputContianer}>
            <InputComp
              placeholder={StringsName.conPassowrd}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              value={confirmPassword}
            />
          </View>

          <TouchableOpacity
            disabled={otp && newPassword && confirmPassword ? false : true}
            style={[
              styles.btnContianer,
              {
                backgroundColor:
                  otp && newPassword && confirmPassword
                    ? Colors.btnColor
                    : Colors.lightGray,
              },
            ]}
            onPress={() => {
              _OtpVerifyWithPasswordChange();
            }}
          >
            <Text style={styles.btnTxt}>Reset Password</Text>
          </TouchableOpacity>
          <Text style={styles.remoberPassword}>
            Remembered password?{" "}
            <Text
              onPress={() => navigation.navigate(ScreensName.LOGIN)}
              style={styles.signIn}
            >
              Sign in
            </Text>
          </Text>
        </KeyboardAwareScrollView>
      </View>
    </AppWapper>
  );
}

const styles = StyleSheet.create({
  headerGoBackContianer: {
    paddingHorizontal: wp(4),
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordContianer: {
    marginVertical: hp(7),
    alignSelf: "center",
    paddingHorizontal: wp(5),
  },
  forgotPassword: {
    color: Colors.TxtColor,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(4),
    textAlign: "center",
  },

  forgotPasswordPara: {
    color: Colors.gray878787,
    alignItems: "center",
    fontSize: hp(1.8),
    marginVertical: hp(2),
    fontFamily: Fonts.LATO_Regular600,
    alignSelf: "center",
  },
  btnContianer: {
    backgroundColor: Colors.btnColor,
    width: "90%",
    alignSelf: "center",
    borderRadius: wp(1.5),
    marginVertical: hp(5),
    paddingVertical: hp(1.5),
  },
  inputContianer: {
    borderWidth: wp(0.3),
    borderColor: Colors[525252],
    borderRadius: wp(1.5),
    width: "90%",
    alignContent: "center",
    alignSelf: "center",
    marginVertical: hp(1),
  },
  btnTxt: {
    color: Colors.White,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2),
    textAlign: "center",
  },
  remoberPassword: {
    color: Colors.gray878787,
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(2),
    textAlign: "center",
  },
  signIn: {
    color: Colors.Black,
    textDecorationLine: "underline",
    fontWeight: "700",
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
});
