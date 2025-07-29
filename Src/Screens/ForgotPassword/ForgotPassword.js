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
export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // user _forgotPassword
  const _forgotPassword = () => {
    if (validateEmail(email)) {
      let config = {
        url: `${ApiUrl.forgotPasswordApi}`,
        method: "post",
        body: {
          email: email,
        },
      };
      setLoading(true);
      APIRequest(
        config,
        (res) => {
          if (res?.success == true) {
            navigation.navigate(ScreensName.CREATEPASSWORD, {
              userEmail: config?.body?.email,
            });
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
    } else {
      ToastModel({ type: "error", text2: "Please Enter Valid Email Address" });
    }
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
              {StringsName.forgotPassword}
            </Text>
            <Text style={styles.forgotPasswordPara}>
              {StringsName.forgotPasswordPara}
            </Text>
          </View>

          <Text style={styles.emailAddress}>{StringsName.emailAddress}</Text>
          <View
            style={{
              borderWidth: wp(0.3),
              borderColor: Colors[525252],
              borderRadius: wp(1.5),
              width: "90%",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <InputComp
              placeholder={StringsName.enterEmailAddress}
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
            />
          </View>

          <TouchableOpacity
            disabled={email ? false : true}
            activeOpacity={0.8}
            style={[
              styles.btnContianer,
              {
                backgroundColor: email ? Colors.btnColor : Colors.lightGray,
              },
            ]}
            onPress={() => _forgotPassword()}
          >
            <Text
              style={{
                color: Colors.White,
                fontFamily: Fonts.LATO_BOLD700,
                fontSize: hp(2.2),
                textAlign: "center",
              }}
            >
              Continue
            </Text>
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
    marginVertical: hp(8),
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
    textAlign: "center",
    paddingHorizontal: hp(2),
  },
  btnContianer: {
    width: "90%",
    alignSelf: "center",
    borderRadius: wp(1.5),
    marginVertical: hp(5),

    paddingVertical: hp(1.5),
    backgroundColor: Colors.btnColor,
  },
  emailAddress: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2),
    marginHorizontal: wp(5),
    marginBottom: hp(1),
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
