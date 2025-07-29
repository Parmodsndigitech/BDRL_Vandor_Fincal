import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AppWapper from "../../Components/AppWapper";
import Colors from "../../Utails/Colors";
import StatusBarr from "../../Components/StatusBarr";
import VectorIcon from "../../Utails/VectorIcon";
import { hp, wp } from "../../Utails/Responsive";
import { useNavigation } from "@react-navigation/native";
import ScreensName from "../../Utails/ScreensName";
import { CountryPicker } from "react-native-country-codes-picker";

export default function LoginPhoneNo() {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
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
          <Text style={styles.loginTxt}>{"Welcome Back"}</Text>
          <Text style={styles.loginTxt2}>{"Log into your account"}</Text>
          <View style={{ marginHorizontal: 10 }}>
            <View
              style={{
                flexDirection: "row",
                borderRadius: 10,
                padding: 0,
                height: 40,
                width: "90%",
                alignSelf: "center",
                borderWidth: 0.5,
                borderRadius: 7,
                marginTop: wp(12),
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "25%",
                  justifyContent: "center",
                }}
                onPress={() => setShow(true)}
                activeOpacity={0.5}
              >
                <Text
                  style={{
                    color: Colors.Black,
                    fontSize: 18,
                  }}
                >
                  {countryCode}
                </Text>
              </TouchableOpacity>
              <CountryPicker
                show={show}
                pickerButtonOnPress={(item) => {
                  setCountryCode(item.dial_code);
                  setShow(false);
                }}
              />

              <TextInput
                placeholder=" Mobile Number"
                placeholderTextColor={Colors.Black}
                keyboardType="number-pad"
                maxLength={10}
                style={{
                  width: "75%",
                  paddingHorizontal: 10,
                  color: Colors.Black,
                  borderLeftWidth: 0.5,
                }}
              />
            </View>

            <View
              style={{ marginTop: wp(1.5), alignSelf: "center", width: "90%" }}
            >
              <Text
                style={{
                  fontSize: hp(1.5),
                  fontWeight: "400",
                  color: Colors.Black,
                }}
              >
                You will receive an SMS verification that may apply message and
                data rates.
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
              onPress={() => navigation.navigate(ScreensName.GETOTP)}
            >
              <Text
                style={{ color: Colors.White, fontSize: 16, fontWeight: "600" }}
              >
                Get OTP
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
    fontSize: hp(4),
    fontWeight: "600",
  },
  loginTxt2: {
    color: Colors.TxtColor,
    textAlign: "center",
    fontSize: hp(2),
    fontWeight: "400",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});
