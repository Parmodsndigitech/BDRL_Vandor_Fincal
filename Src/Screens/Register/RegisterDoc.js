// packages
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DocumentPicker from "react-native-document-picker";
// Utails
import VectorIcon from "../../Utails/VectorIcon";
import { hp, wp } from "../../Utails/Responsive";
import Colors from "../../Utails/Colors";
import Fonts from "../../Utails/Fonts";
import ScreensName from "../../Utails/ScreensName";
// Components
import AppWapper from "../../Components/AppWapper";
import StatusBarr from "../../Components/StatusBarr";
import HeaderGoBack from "../../Components/HeaderGoBack";
import ButtonComp from "../../Components/ButtonComp";
import { ApiUrl } from "../../Constants/apiurl";
import { ToastModel } from "../../Components/alert/ToastModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomCheckbox = ({ label, onChange, isChecked }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.checkboxContainer}
      onPress={onChange}
    >
      <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
        {isChecked && <Text style={styles.checkmark}>✔</Text>}
      </View>
    </TouchableOpacity>
  );
};

var numberOfLines = 1;
const RegisterDoc = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [penCard, setPanCard] = useState("");
  const [addhar, setAddhar] = useState("");
  const [gst, setGst] = useState("");
  const [rc, setRC] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { data } = route?.params;
  const _pickPenDocument = async ({}) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setPanCard(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the picker");
      } else {
        console.error("DocumentPicker Error: ", err);
      }
    }
  };
  const _pickAddharDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setAddhar(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the picker");
      } else {
        console.error("DocumentPicker Error: ", err);
      }
    }
  };
  const _pickGstDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setGst(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the picker");
      } else {
        console.error("DocumentPicker Error: ", err);
      }
    }
  };
  const _pickRCDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setRC(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the picker");
      } else {
        console.error("DocumentPicker Error: ", err);
      }
    }
  };
  const _registerUser = async () => {
        const email = await AsyncStorage.getItem("emailVerify").catch((err) =>
          console.log(err, "----- token err")
        );
        // console.log('pamrodd..',email)
    const fd = new FormData();
    fd.append("companyName", data?.companyName);
    fd.append("companytype", data?.selectedCompanyType);
    fd.append("companyAddress", data?.companyAddress);
    fd.append("gstNumber", data?.inputGst);
    fd.append("mobileNo", data?.mobileNo);
    fd.append("email", email);
    fd.append("password", data?.password);
    fd.append("responsibleStaff", data?.responsibleStaff);
    fd.append("responsibleStaffContact", data?.responsiblestaffContactNumber);
    fd.append("referral", data?.referral);
    fd.append("bankDetails.bankName", data?.bankName);
    fd.append("bankDetails.accountNumber", data?.bankAcNo);
    fd.append("bankDetails.IFC", data?.bankIfsc);
    fd.append("panCardNumber", data?.panCardNo);
    fd.append("role", "vendor");
    fd.append("cancelCheckPhoto", {
      uri: data?.bankCenclledCheque?.uri,
      name: data?.bankCenclledCheque?.name,
      type: data?.bankCenclledCheque?.type,
    });
    fd.append("adharaCard", {
      uri: addhar?.uri,
      name: addhar?.name,
      type: addhar?.type,
    });
    fd.append("gstPdf", {
      uri: gst?.uri,
      name: gst?.name,
      type: gst?.type,
    });
    fd.append("panCardPdf", {
      uri: penCard?.uri,
      name: penCard?.name,
      type: penCard?.type,
    });
    fd.append("rcPdf", {
      uri: rc?.uri,
      name: rc?.name,
      type: rc?.type,
    });
    let token = await AsyncStorage.getItem("token").catch((err) =>
      console.log(err)
    );
    try {
      setLoading(true);
      const response = await fetch(ApiUrl.registerApi, {
        method: "POST",
        body: fd,
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          token: token,
        },
      });
      const result = await response.json();
      // console.log('Registe acoutn.......',result)
      if (result?.success == true) {
        // navigation.navigate(ScreensName.OTPSCREEN, { data: data?.email });
            navigation.navigate(ScreensName.CONGRATULATIONS);
      }
      ToastModel({ type: "success", text2: result?.message });
      setLoading(false);
    } catch (error) {
      console.error(error);
      ToastModel({ type: "error", text2: result?.message });
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
        <HeaderGoBack title={""} />
        <View style={styles.doteedBtnContianer}>
          <View
            style={[
              styles.dotted,
              { width: "13%", backgroundColor: Colors.btnColor },
            ]}
          />
          <View
            style={[
              styles.dotted,
              {
                width: "20%",
                backgroundColor: Colors.Black,
                marginHorizontal: wp(1.5),
              },
            ]}
          />
          <View
            style={[
              styles.dotted,
              { width: "13%", backgroundColor: Colors.btnColor },
            ]}
          />
        </View>
      </View>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          extraHeight={150}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.fileBtnContianer}
            onPress={_pickPenDocument}
          >
            <View>
              {penCard?.name ? (
                <Text
                  numberOfLines={numberOfLines}
                  style={[
                    styles.fileTxt,
                    styles.widthFlex,
                    { color: Colors.btnColor },
                  ]}
                >
                  {penCard?.name}
                </Text>
              ) : (
                <Text numberOfLines={numberOfLines} style={styles.fileTxt}>
                  File: Pan card Upload
                </Text>
              )}
              <Text
                numberOfLines={numberOfLines}
                style={[
                  styles.fileTxt,
                  {
                    color: Colors.gray878787,
                    fontSize: hp(1.8),
                    marginTop: hp(0.2),
                    color: penCard?.name && Colors.btnColor,
                  },
                ]}
              >
                Size: 1.00 MB
              </Text>
              <Text style={{ color: Colors.gray878787, fontSize: hp(1.2) }}>
                <Text style={{ color: Colors.Black }}></Text>JPEG, JPG, PNG
              </Text>
            </View>
            <VectorIcon
              type={"Feather"}
              name={"more-vertical"}
              color={Colors.Black}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.fileBtnContianer}
            onPress={_pickAddharDocument}
          >
            <View>
              {addhar?.name ? (
                <Text
                  numberOfLines={numberOfLines}
                  style={[
                    styles.fileTxt,
                    styles.widthFlex,
                    { color: Colors.btnColor },
                  ]}
                >
                  {addhar?.name}
                </Text>
              ) : (
                <Text numberOfLines={numberOfLines} style={styles.fileTxt}>
                  File: Aadhar Upload
                </Text>
              )}
              <Text
                numberOfLines={numberOfLines}
                style={[
                  styles.fileTxt,
                  {
                    color: Colors.gray878787,
                    fontSize: hp(1.8),
                    marginTop: hp(0.2),
                    color: addhar?.name && Colors.btnColor,
                  },
                ]}
              >
                Size: 1.00 MB
              </Text>
              <Text style={{ color: Colors.gray878787, fontSize: hp(1.2) }}>
                <Text style={{ color: Colors.Black }}></Text>JPEG, JPG, PNG
              </Text>
            </View>
            <VectorIcon
              type={"Feather"}
              name={"more-vertical"}
              color={Colors.Black}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.fileBtnContianer}
            onPress={_pickGstDocument}
          >
            <View>
              {gst?.name ? (
                <Text
                  numberOfLines={numberOfLines}
                  style={[
                    styles.fileTxt,
                    styles.widthFlex,
                    { color: Colors.btnColor },
                  ]}
                >
                  {gst?.name}
                </Text>
              ) : (
                <Text numberOfLines={numberOfLines} style={styles.fileTxt}>
                  File: GST Upload
                </Text>
              )}
              <Text
                numberOfLines={numberOfLines}
                style={[
                  styles.fileTxt,
                  {
                    color: Colors.gray878787,
                    fontSize: hp(1.8),
                    marginTop: hp(0.2),
                    color: gst?.name && Colors.btnColor,
                  },
                ]}
              >
                Size: 1.00 MB
              </Text>
              <Text style={{ color: Colors.gray878787, fontSize: hp(1.2) }}>
                <Text style={{ color: Colors.Black }}></Text>JPEG, JPG, PNG
              </Text>
            </View>
            <VectorIcon
              type={"Feather"}
              name={"more-vertical"}
              color={Colors.Black}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.fileBtnContianer}
            onPress={_pickRCDocument}
          >
            <View>
              {rc?.name ? (
                <Text
                  numberOfLines={numberOfLines}
                  style={[
                    styles.fileTxt,
                    styles.widthFlex,
                    { color: Colors.btnColor },
                  ]}
                >
                  {rc?.name}
                </Text>
              ) : (
                <Text numberOfLines={numberOfLines} style={[styles.fileTxt]}>
                  File: RC Upload
                </Text>
              )}
              <Text
                numberOfLines={numberOfLines}
                style={[
                  styles.fileTxt,
                  {
                    color: Colors.gray878787,
                    fontSize: hp(1.8),
                    marginTop: hp(0.2),
                    color: rc?.name && Colors.btnColor,
                  },
                ]}
              >
                Size: 1.00 MB
              </Text>
              <Text style={{ color: Colors.gray878787, fontSize: hp(1.2) }}>
                <Text style={{ color: Colors.Black }}></Text>JPEG, JPG, PNG
              </Text>
            </View>
            <VectorIcon
              type={"Feather"}
              name={"more-vertical"}
              color={Colors.Black}
              size={20}
            />
          </TouchableOpacity>

          <View style={styles.rcTxtMustContianer}>
            <VectorIcon
              type={"Feather"}
              name={"info"}
              size={25}
              color={Colors.textcolor1C274C}
            />
            <Text
              style={[styles.rcTxtMust, { width: "80%" }]}
              numberOfLines={2}
            >
              The name on the RC must match the company name.
            </Text>
          </View>
          <View style={[styles.rcTxtMustContianer, { marginTop: hp(12) }]}>
            <CustomCheckbox
              label="Custom Checkbox"
              isChecked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <Text style={styles.policeConfimeTxt} numberOfLines={2}>
              Please confirm that you agree to our{" "}
              <Text
                onPress={() =>
                  navigation.navigate(ScreensName.TERMCONDITIONSAUTH)
                }
                style={styles.tremPoliceTxt}
              >
                Terms and conditions
              </Text>
              and{" "}
              <Text
                onPress={() =>
                  navigation.navigate(ScreensName.PRICACYPOLICEYAUTH)
                }
                style={styles.tremPoliceTxt}
              >
                {" "}
                privacy Policy
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>

      <View style={styles.btnContianer}>
        <ButtonComp
          onPress={_registerUser}
          disabled={penCard && addhar && gst && isChecked && rc ? false : true}
          title={"Create Account"}
          containerStyle={{
            width: "60%",
            alignSelf: "center",
            backgroundColor:
              penCard && addhar && gst && isChecked
                ? Colors.btnColor
                : Colors.lightGray,
          }}
        />
      </View>
    </AppWapper>
  );
};

export default RegisterDoc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(4),
    justifyContent: "space-around",
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
  headerGoBackContianer: {
    paddingHorizontal: wp(4),
    backgroundColor: Colors.White,
  },
  doteedBtnContianer: {
    height: hp(6),
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  dotted: {
    width: "20%",
    height: hp(0.9),
    backgroundColor: Colors.Black,
    borderRadius: wp(2),
  },

  containerStyle: {
    borderWidth: wp(0.2),
    borderColor: Colors[525252],
  },

  btnContianer: {
    backgroundColor: Colors.White,
    flex: 0.3,
    paddingTop: hp(2),
  },
  fileBtnContianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(1.5),
    alignItems: "center",
    marginVertical: hp(2),
  },
  fileTxt: {
    color: Colors.Black,
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(2),
    width: wp(60),
  },
  widthFlex: { width: wp(60), flex: 1 },
  rcTxtMust: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(1.6),
    marginLeft: wp(2),
  },
  rcTxtMustContianer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
    marginTop: hp(4),
  },
  policeConfimeTxt: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(1.8),
    marginLeft: wp(2),
    paddingHorizontal: wp(2),
  },
  tremPoliceTxt: { color: Colors.btnColor, textDecorationLine: "underline" },
  checkboxContainer: {
    width: wp(6),
    height: wp(6),
  },
  checkbox: {
    width: wp(6),
    height: wp(6),
    borderWidth: wp(0.4),
    borderRadius: wp(0.5),
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(1),
  },
  checkmark: {
    color: Colors.Black,
    fontSize: hp(1.8),
  },
  label: {
    fontSize: hp(1.8),
  },
});
