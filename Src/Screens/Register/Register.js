import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppWapper from "../../Components/AppWapper";
import VectorIcon from "../../Utails/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import { hp, wp } from "../../Utails/Responsive";
import StatusBarr from "../../Components/StatusBarr";
import HeaderGoBack from "../../Components/HeaderGoBack";
import StringsName from "../../Utails/StringsName";
import InputComp from "../../Components/InputComp";
import Colors from "../../Utails/Colors";
import Fonts from "../../Utails/Fonts";
import ButtonComp from "../../Components/ButtonComp";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreensName from "../../Utails/ScreensName";
import { ToastModel } from "../../Components/alert/ToastModel";
import ModelBankDetials from "../../Components/BankDetailsModel";
import Modal from "react-native-modal";
import EmailRequiredModle from "../../Components/EmailRequiredModle";
import AsyncStorage from "@react-native-async-storage/async-storage";

const companyTypeData = [
  {
    id: 1,
    name: "pvt/ltd",
  },
  {
    id: 2,
    name: "proprietorship",
  },
  {
    id: 3,
    name: "LLP",
  },
];
const Register = () => {
  const navigation = useNavigation();
  const [companyName, setComapnyName] = useState("");
  const [companyAddress, setComapnyAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [panCardNo, setPanCardNo] = useState("");
  const [password, setPassword] = useState("");
  const [responsibleStaff, setResponsibleStaff] = useState("");
  const [responsiblestaffContactNumber, setResponsiblestaffContactNumber] =
    useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [bankName, setBankName] = useState("");
  const [bankAcNo, setBankAcNo] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankCenclledCheque, setBankCenclledCheque] = useState("");
  const [inputGst, setInputGst] = useState("");
  const [selectedCompanyType, setSelectedCompanyType] = useState("");
  const [modalCompanyTypeVisible, setModalCompanyTypeVisible] = useState(false);
  const [referral, setReferral] = useState("");
   const [isVisible, setIsVisible] = useState(false);
   

  // const validateEmail = (email) => {
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return regex.test(email);
  // };
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };
  const _onSelectCompayType = (companyType) => {
    setSelectedCompanyType(companyType);
    setModalCompanyTypeVisible(false);
  };
  const _registerUserNext = async () => {
    // if (validateEmail(email)) {
    //  const email = await AsyncStorage.getItem("emailVerify").catch((err) =>
    //   console.log(err, "----- token err")
    // );
    // console.log('pamrodd..',email)
      const data = {
        companyName,
        companyAddress,
        mobileNo,
        panCardNo,
        password,
        responsibleStaff,
        responsiblestaffContactNumber,
        bankName,
        bankAcNo,
        bankIfsc,
        bankCenclledCheque,
        referral,
        inputGst,
        selectedCompanyType,
      };
      navigation.navigate(ScreensName.REGISTERDOC, { data: data });
    // } else {
    //   ToastModel({
    //     type: "error",
    //     text2: "Invalid Email Address', 'Please enter a valid email address.",
    //   });
    // }
  };

  useEffect(()=>{
    setIsVisible(true)
  },[])
  return (
    <AppWapper>
      <ModelBankDetials
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        bankName={bankName}
        setBankAcNo={setBankAcNo}
        setBankName={setBankName}
        bankAcNo={bankAcNo}
        bankIfsc={bankIfsc}
        setBankIfsc={setBankIfsc}
        bankCenclledCheque={bankCenclledCheque}
        setBankCenclledCheque={setBankCenclledCheque}
      />
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.headerGoBackContianer}>
        <HeaderGoBack title={""} />
        <View style={styles.doteedBtnContianer}>
          <View style={styles.dotted} />
          <View
            style={[
              styles.dotted,
              {
                width: "13%",
                backgroundColor: Colors.gray878787,
                marginHorizontal: wp(1.5),
              },
            ]}
          />
          <View
            style={[
              styles.dotted,
              { width: "13%", backgroundColor: Colors.gray878787 },
            ]}
          />
        </View>
      </View>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          extraHeight={150}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.registeTxt}>{"Register"}</Text>
          <Text style={styles.titleTxt}>{StringsName.companyName}</Text>
          <InputComp
            placeholder={StringsName.enteCompanyName}
            containerStyle={styles.containerStyle}
            value={companyName}
            onChangeText={(txt) => {
              setComapnyName(txt);
            }}
          />
          <Text style={styles.titleTxt}>{StringsName.companyType}</Text>
          {selectedCompanyType ? (
            <Text
              onPress={() => setModalCompanyTypeVisible(true)}
              style={[
                {
                  borderWidth: wp(0.2),
                  padding: wp(3),
                  paddingVertical: hp(1.5),
                  borderRadius: wp(1.5),
                  fontSize: hp(1.8),
                  color: Colors.Black,
                },
              ]}
            >
              {selectedCompanyType}
            </Text>
          ) : (
            <Text
              onPress={() => setModalCompanyTypeVisible(true)}
              style={{
                borderWidth: wp(0.2),
                padding: wp(3),
                paddingVertical: hp(1.5),
                borderRadius: wp(1.5),
                fontSize: hp(1.8),
                color: Colors.gray878787,
              }}
            >
              Select Company type
            </Text>
          )}
          <Text style={styles.titleTxt}>{StringsName.companyAddress}</Text>
          <InputComp
            placeholder={StringsName.entercompanyAddress}
            containerStyle={styles.containerStyle}
            value={companyAddress}
            onChangeText={(txt) => {
              setComapnyAddress(txt);
            }}
          />
          <Text style={styles.titleTxt}>{StringsName.companyGstNo}</Text>
          <InputComp
            placeholder={StringsName.enterCompanyGstNo}
            containerStyle={{
              borderWidth: wp(0.2),
              borderColor: Colors[525252],
              textTransform: "uppercase",
            }}
            value={inputGst}
            onChangeText={(txt) => {
              setInputGst(txt);
            }}
          />
          <Text style={styles.titleTxt}>{StringsName.contactNumber}</Text>
          <InputComp
            placeholder={StringsName.enterContactNumber}
            containerStyle={styles.containerStyle}
            maxLength={10}
            keyboardType={true}
            value={mobileNo}
            onChangeText={(txt) => {
              setMobileNo(txt);
            }}
          />
          <Text style={styles.titleTxt}>{'Pan Card No'}</Text>
          <InputComp
            placeholder={'Enter Pan card no'}
            containerStyle={styles.containerStyle}
            value={panCardNo}
            onChangeText={(txt) => {
              setPanCardNo(txt);
            }}
          />
          <Text style={styles.titleTxt}>Create {StringsName.password}</Text>
          <InputComp
            placeholder={StringsName.enterPassword}
            containerStyle={styles.containerStyle}
            value={password}
            onChangeText={(txt) => {
              setPassword(txt);
            }}
          />
          <Text style={styles.titleTxt}>{StringsName.responsibleStaff} Name</Text>
          <InputComp
            placeholder={StringsName.enterFirstName}
            containerStyle={styles.containerStyle}
            value={responsibleStaff}
            onChangeText={(txt) => {
              setResponsibleStaff(txt);
            }}
          />
          <Text style={styles.titleTxt}>
            {StringsName.responsiblestaffContactNumber}
          </Text>
          <InputComp
            placeholder={StringsName.enterContactNumber}
            containerStyle={styles.containerStyle}
            maxLength={10}
            keyboardType={true}
            value={responsiblestaffContactNumber}
            onChangeText={(txt) => {
              setResponsiblestaffContactNumber(txt);
            }}
          />
          <Text style={styles.titleTxt}>{StringsName.bankDetails}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={styles.addBankDetailsBtn}
          >
            <Text style={styles.enterBankDetailsBntTxt}>
              {StringsName.enterBankDetails}
            </Text>
            <VectorIcon
              type={"Octicons"}
              name={"diff-added"}
              size={28}
              color={Colors.Black}
            />
          </TouchableOpacity>

          <Text style={styles.titleTxt}>{StringsName.referal}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: hp(5),
            }}
          >
            {["employeeReferral"].map((item) => (
              <View key={item} style={styles.vehicleBodyTypeContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setReferral(item)}
                  style={styles.outerCricleBtn}
                >
                  {referral == item && <View style={styles.innerCricleBtn} />}
                </TouchableOpacity>
                <Text
                  onPress={() => setReferral(item)}
                  style={styles.vehicleBodyTxt}
                >
                  {item}
                </Text>
              </View>
            ))}
            <View style={{ marginHorizontal: wp(2) }} />
            {["customerReferral"].map((item) => (
              <View key={item} style={styles.vehicleBodyTypeContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setReferral(item)}
                  style={styles.outerCricleBtn}
                >
                  {referral == item && <View style={styles.innerCricleBtn} />}
                </TouchableOpacity>
                <Text
                  onPress={() => setReferral(item)}
                  style={styles.vehicleBodyTxt}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </KeyboardAwareScrollView>
      </View>

      <View style={styles.btnContianer}>
        <ButtonComp
          disabled={
            companyName &&
            companyAddress &&
            mobileNo &&
            panCardNo &&
            password &&
            responsibleStaff &&
            responsiblestaffContactNumber &&
            bankName &&
            bankAcNo &&
            bankIfsc &&
            bankCenclledCheque &&
            referral &&
            inputGst
              ? false
              : true
          }
          onPress={_registerUserNext}
          title={"Next"}
          containerStyle={{
            width: "60%",
            alignSelf: "center",
            backgroundColor:
              companyName &&
              companyAddress &&
              mobileNo &&
              panCardNo &&
              password &&
              responsibleStaff &&
              responsiblestaffContactNumber &&
              bankName &&
              bankAcNo &&
              bankIfsc &&
              bankCenclledCheque &&
              referral &&
              inputGst
                ? Colors.btnColor
                : Colors.lightGray,
          }}
        />

        <Text style={styles.aledyAccount}>
          Already have an Account?{" "}
          <Text
            onPress={() => {
              navigation.navigate(ScreensName.LOGIN);
            }}
            style={{
              color: Colors.btnColor,
              textDecorationLine: "underline",
              padding: hp(1),
            }}
          >
            Login Here
          </Text>
        </Text>
      </View>
<EmailRequiredModle 
 isVisible={isVisible}
    setIsVisible={setIsVisible}
        onBackdropPress={() => setIsVisible(false)}
/>
      {/* Model for Subject View   */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCompanyTypeVisible}
        style={{ margin: 0 }}
        onRequestClose={() => setModalCompanyTypeVisible(false)}
      >
        <View
          style={[
            styles.modalOverlay,
            {
              backgroundColor: "rgba(0, 0, 0, .5)",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <View
            style={[
              {
                backgroundColor: "white",
                width: "90%",
                alignSelf: "center",
                padding: wp(4),
                borderRadius: wp(2),
              },
            ]}
          >
            <Text
              style={[
                styles.nameLabel,
                {
                  width: "100%",
                  textAlign: "center",
                  alignSelf: "center",
                  fontSize: hp(2.5),
                  marginBottom: hp(3),
                },
              ]}
              numberOfLines={1}
            >
              select Company type{" "}
            </Text>

            <FlatList
              data={companyTypeData}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => _onSelectCompayType(item?.name)}
                >
                  <Text
                    style={[
                      styles.truckText,
                      {
                        fontSize: hp(2.2),
                        color: Colors.Black,
                        padding: wp(2),
                        fontWeight: "600",
                        borderBottomWidth: wp(0.5),
                        borderColor: Colors.Black,
                      },
                    ]}
                  >
                    {capitalizeFirstLetter(item?.name)}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.closeButton, { marginTop: hp(2) }]}
              onPress={() => setModalCompanyTypeVisible(false)}
            >
              <Text
                style={[
                  styles.buttonText,
                  { textAlign: "center", fontSize: hp(2.5), color: "red" },
                ]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Model for Language View   */}
    </AppWapper>
  );
};

export default Register;

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
  registeTxt: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    alignSelf: "center",
    fontSize: hp(4),
    marginVertical: hp(5),
  },
  containerStyle: {
    borderWidth: wp(0.2),
    borderColor: Colors[525252],
  },
  titleTxt: {
    color: Colors[525252],
    // color:'red',
    fontSize: hp(2.2),
    fontFamily: Fonts.LATO_BOLD700,
    marginVertical: hp(0.5),
    marginTop: hp(1.5),
  },
  btnContianer: {
    backgroundColor: Colors.White,
    flex: 0.3,
    paddingTop: hp(2),
  },
  aledyAccount: {
    color: Colors.TxtColor,
    fontSize: hp(1.8),
    fontFamily: Fonts.LATO_BOLD700,
    marginVertical: hp(2),
    alignSelf: "center",
  },
  addBankDetailsBtn: {
    borderWidth: wp(0.3),
    borderColor: Colors[525252],
    borderRadius: wp(1.5),
    height: hp(6),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(3),
  },
  enterBankDetailsBntTxt: {
    color: Colors.gray878787,
    fontSize: hp(1.8),
    fontFamily: Fonts.LATO_BOLD700,
  },
  modalContent: {
    position: "absolute",
    bottom: hp(0),
    height: hp(60),
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    // backgroundColor:'rgba(0,0,0,.7)'
  },
  outerCricleBtn: {
    borderWidth: wp(0.33),
    borderColor: Colors[525252],
    width: wp(5),
    height: wp(5),
    borderRadius: wp(5),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(1),
  },
  innerCricleBtn: {
    width: wp(3.5),
    height: wp(3.5),
    borderRadius: wp(3.5),
    backgroundColor: Colors.btnColor,
  },
  vehicleBodyTxt: {
    color: Colors.textcolor1C274C,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(1.6),
  },
  vehicleBodyTypeContainer: { flexDirection: "row", alignItems: "center" },
  nameLabel: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: Colors.Black,
    textAlign: "center",
    marginVertical: hp(1),
  },
});
