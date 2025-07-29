import {
  ActivityIndicator,
  Image,
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
import ScreensName from "../../Utails/ScreensName";
import { APIRequest, ApiUrl } from "../../Constants/apiurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { ToastModel } from "../../Components/alert/ToastModel";
import { setLogin } from "../../redux/Slice/LoginSlice";
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [hide, sethide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // user Login
  const _loginUser = async () => {
    if (validateEmail(email)) {
      let config = {
        url: `${ApiUrl.loginApi}`,
        method: "post",
        body: {
          email: email,
          password: password,
          role: "vendor",
        },
      };
      setLoading(true);
      await APIRequest(
        config,
        (res) => {
          ToastModel({ type: "success", text2: res?.message });
          AsyncStorage.setItem("token", res?.token).catch((err) =>
            console.log(err)
          );
          // console.log('user login....', res)
          // upadteFCMToken(res?.token)
          dispatch(setLogin(true));
          setLoading(false);
          navigation.navigate(ScreensName.BOTTOMTABS);
        },
        (err) => {
          console.log(err?.message, "---err");
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
      <View style={styles.container}>
        <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
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
        <View style={styles.loginContainer}>
          <Text style={styles.loginTxt}>{"Login"}</Text>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: hp(2), color: Colors.Black }}>
              {" "}
              User ID
            </Text>
            <View
              style={{
                width: "100%",
                height: 40,
                borderWidth: 0.5,
                borderRadius: 7,
                backgroundColor: "#EEEEEE",
                alignSelf: "center",
                justifyContent: "center",
                marginVertical: 5,
              }}
            >
              <TextInput
                style={{
                  padding: 0,
                  paddingHorizontal: 10,
                  color: Colors.Black,
                  paddingHorizontal: 20,
                }}
                placeholder="Enter your email"
                placeholderTextColor={Colors.Black}
                keyboardType="email-address"
                onChangeText={(text) => {
                  setEmail(text);
                }}
                value={email}
              />
            </View>
            <Text
              style={{ fontSize: hp(2), color: Colors.Black, marginTop: wp(2) }}
            >
              Password
            </Text>
            <View
              style={{
                width: "100%",
                height: 40,
                borderWidth: 0.5,
                borderRadius: 7,
                backgroundColor: "#EEEEEE",
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: wp(1),
              }}
            >
              <TextInput
                style={{ padding: 0, width: "80%", color: Colors.Black }}
                placeholder="Enter your password"
                placeholderTextColor={Colors.Black}
                secureTextEntry={hide}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ justifyContent: "center" }}
                onPress={() => sethide(!hide)}
              >
                <Image
                  style={{ height: 25, width: 25, resizeMode: "contain" }}
                  source={
                    hide
                      ? require("../../asstes/Img/hide.png")
                      : require("../../asstes/Img/show.png")
                  }
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                alignSelf: "flex-end",
                marginTop: 5,
                marginHorizontal: 10,
              }}
              onPress={() => navigation.navigate(ScreensName.FORGOTPASSWORD)}
            >
              <Text
                style={{
                  color: "#3C9AFB",
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                Forget Password ?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={email && password ? false : true}
              style={[
                styles.loginBtn,
                {
                  backgroundColor:
                    email && password ? Colors.btnColor : Colors.lightGray,
                },
              ]}
              onPress={() => _loginUser()}
            >
              <Text style={styles.btnTxt}>Login</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                marginTop: wp(5),
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  fontWeight: "500",
                  color: Colors.Black,
                }}
              >
                Don’t have an account?
                <Text
                  style={{ color: Colors.btnColor }}
                  onPress={() => navigation.navigate(ScreensName.REGISTER)}
                >
                  {" "}
                  Signup
                </Text>
              </Text>
            </View>
          </View>
        </View>
        {/* <View style={{ bottom: wp(10), alignSelf: "center" }}>
          <Text
            style={{
              color: Colors.btnColor,
              fontSize: hp(2),
              fontWeight: "700",
            }}
            onPress={() => navigation.navigate(ScreensName.LOGINPONE)}
          >
            {" "}
            Use Phone Number, instead
          </Text>
        </View> */}
      </View>
    </AppWapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(4),
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
  btnGoBack: {
    width: wp(10),
    height: wp(10),
    justifyContent: "center",
    margin: wp(2),
  },
  btnTxt: { color: Colors.White, fontSize: 16, fontWeight: "600" },
  loginBtn: {
    marginTop: wp(10),
    borderRadius: 10,
    backgroundColor: Colors.btnColor,
    width: "80%",
    justifyContent: "center",
    paddingVertical: 8,
    alignItems: "center",
    alignSelf: "center",
  },
  loginTxt: {
    color: Colors.TxtColor,
    textAlign: "center",
    fontSize: hp(4),
    fontWeight: "600",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});
export default Login;
