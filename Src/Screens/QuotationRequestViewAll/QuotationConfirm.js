// packages
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// Components
import HeaderGoBack from "../../Components/HeaderGoBack";
import AppWapper from "../../Components/AppWapper";
import StatusBarr from "../../Components/StatusBarr";
import InputComp from "../../Components/InputComp";
import ButtonComboComp from "../../Components/ButtonComboComp";
import { ToastModel } from "../../Components/alert/ToastModel";
// Utails
import { hp, wp } from "../../Utails/Responsive";
import Colors from "../../Utails/Colors";
import StringsName from "../../Utails/StringsName";
import Fonts from "../../Utails/Fonts";
import ScreensName from "../../Utails/ScreensName";
// Constants
import { APIRequest, ApiUrl } from "../../Constants/apiurl";
import moment from "moment";

const QuotationConfirm = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [bitAmount, setBitAmount] = useState("");
  const [checkDublicate, setCheckDublicate] = useState("");
  const { getAllQuotationData } = route?.params;
  //  _createQuote APi
  const _createQuote = () => {
    setLoading(true);
    let config = {
      url: `${ApiUrl.createQuoteApi}`,
      method: "post",
      body: {
        queryId: getAllQuotationData?._id,
        amount: bitAmount,
      },
    };
    APIRequest(
      config,
      (res) => {
        if (res?.success === true && checkDublicate === res?.data?._id) {
          if (isFirstTime) {
            navigation.navigate(ScreensName.ACITIVTY);
            setIsFirstTime(false);
          } else {
            Alert.alert("Error", "You have already accessed this screen.");
          }
        }
        setCheckDublicate(res?.data?._id);
        ToastModel({ type: "success", text2: res?.message });
        setLoading(false);
        setBitAmount("");
      },
      (err) => {
        console.log(err?.message, "---err");
        setLoading(false);
        if (err?.message) {
          // ToastModel({ type: "error", text2: err?.message });
          // ToastModel({ type: "error", text2:'Your Account is not approved yet.'`{\n}` `You can't submit Bid until BDRL Team approval!` });
          alert(`Your Account is not approved yet. You can't  \n submit Bid until BDRL Team approval!`)
        }
      }
    );
  };
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
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
      <View style={[styles.headerGoBackContianer]}>
        <HeaderGoBack />
        <Text
          style={{
            color: Colors.Black,
            fontSize: hp(2.2),
            fontFamily: Fonts.LATO_BOLD700,
            fontWeight: "700",
          }}
        >
          Add Bid Amount
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: hp(5) }}
        showsVerticalScrollIndicator={false}
        style={styles.contianer}
      >
        {/* Contianer START */}
        <View style={styles.loadContianer}>
          <Text
            style={[
              styles.feetTxt,
              {
                marginBottom: hp(1),
                alignSelf: "flex-end",
                fontFamily: Fonts.LATO_BOLD700,
              },
            ]}
          >
            {moment(getAllQuotationData?.createdAt).calendar()}{" "}
          </Text>
          <View style={styles.productTpyeContainer}>
            <Text
              style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
            >
              Query Id
            </Text>
            <Text
              style={[styles.txtmachine, { width: "60%", textAlign: "right" }]}
              numberOfLines={2}
            >
              {capitalizeFirstLetter(getAllQuotationData?.queryId)}
            </Text>
          </View>
          <View style={styles.productTpyeContainer}>
            <Text
              style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
            >
              Branch Name
            </Text>
            <Text
              style={[styles.txtmachine, { width: "60%", textAlign: "right" }]}
              numberOfLines={2}
            >
              {capitalizeFirstLetter(getAllQuotationData?.branchName)}
            </Text>
          </View>

          <View style={styles.productTpyeContainer}>
            <Text
              style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
            >
              Budget
            </Text>
            <Text
              style={[styles.txtmachine, { width: "60%", textAlign: "right" }]}
              numberOfLines={2}
            >
              <Text style={{ color: Colors.Black }}>₹</Text>{" "}
              {getAllQuotationData?.advanceClient}
            </Text>
          </View>

          <View style={styles.productTpyeContainer}>
            <Text
              style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
            >
              Client Mobile
            </Text>
            <Text
              onPress={() => {
                const phoneNumber = `tel:${getAllQuotationData?.clientMobile}`;
                Linking.openURL(phoneNumber).catch((err) =>
                  console.error("Error opening dialer:", err)
                );
              }}
              style={[
                styles.txtmachine,
                {
                  width: "60%",
                  textAlign: "right",
                  color: Colors.btnColor,
                  textDecorationLine: "underline",
                },
              ]}
              numberOfLines={2}
            >
              (+91) {getAllQuotationData?.clientMobile}
            </Text>
          </View>

          <View style={[styles.toContianer, { marginTop: hp(1) }]}>
            <View style={styles.toOuterCircle}>
              <View style={styles.toInnerCircle} />
            </View>
            <Text
              style={{
                fontFamily: Fonts.LATO_BOLD700,
                color: Colors.green029C0D,
              }}
            >
              Pickup:{" "}
            </Text>
            <Text
              numberOfLines={2}
              style={[styles.toTxt, { textAlign: "right" }]}
            >
              {capitalizeFirstLetter(getAllQuotationData?.pickup?.location)}
              {`   `}
            </Text>
          </View>

          <View style={styles.toContianer}>
            <View
              style={[styles.toOuterCircle, { borderColor: Colors.redF01919 }]}
            >
              <View
                style={[
                  styles.toInnerCircle,
                  { backgroundColor: Colors.redF01919 },
                ]}
              />
            </View>
            <Text
              style={{
                fontFamily: Fonts.LATO_BOLD700,
                color: Colors.redF01919,
              }}
            >
              Drop:{" "}
            </Text>
            <Text
              numberOfLines={2}
              style={[styles.toTxt, { textAlign: "right" }]}
            >
              {capitalizeFirstLetter(getAllQuotationData?.drop?.location)}
            </Text>
          </View>
          <View>
            <View style={styles.productTpyeContainer}>
              <Text
                style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
              >
                Material Category
              </Text>
              <Text
                style={[
                  styles.txtmachine,
                  { width: "60%", textAlign: "right" },
                ]}
                numberOfLines={2}
              >
                {capitalizeFirstLetter(getAllQuotationData?.materialCategory)}
              </Text>
            </View>
            <View style={styles.productTpyeContainer}>
              <Text
                style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
              >
                {StringsName.materialWeight}
              </Text>
              <Text
                style={[styles.txtmachine, { textAlign: "right" }]}
                numberOfLines={2}
              >
                {capitalizeFirstLetter(getAllQuotationData?.materialWeight)}
                {StringsName.ton}
              </Text>
            </View>

            <View style={styles.productTpyeContainer}>
              <Text
                style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
              >
                Vehicle Body
              </Text>
              <Text
                style={[styles.txtmachine, { textAlign: "right" }]}
                numberOfLines={2}
              >
                {capitalizeFirstLetter(getAllQuotationData?.vehicleType)} Body
              </Text>
            </View>
            <View style={styles.productTpyeContainer}>
              <Text
                style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
              >
                Vehicle Length
              </Text>
              <Text
                style={[styles.txtmachine, { textAlign: "right" }]}
                numberOfLines={2}
              >
                {getAllQuotationData?.truckLength} Ft
              </Text>
            </View>
            <View
              style={[
                styles.productTpyeContaine,
                {
                  flexDirection: "column",
                  width: "100%",
                  marginTop: hp(1),
                },
              ]}
            >
              <Text
                style={[
                  styles.productTpye,

                  {
                    fontFamily: Fonts.LATO_BOLD700,
                    textAlign: "left",
                  },
                ]}
              >
                Material Description
              </Text>
              <Text
                style={[
                  styles.txtmachine,
                  {
                    backgroundColor: Colors.lightGray,
                    padding: wp(1),
                    marginTop: hp(1),
                    borderRadius: wp(1),
                  },
                ]}
              >
                {capitalizeFirstLetter(
                  getAllQuotationData?.materialDescription
                )}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            color: Colors.Black,
            fontSize: hp(2.2),
            fontFamily: Fonts.LATO_BOLD700,
            marginBottom: hp(-1),
            marginTop: hp(1),
          }}
        >
          {" "}
          Add Your Bid Amount
        </Text>
        <View style={styles.inputContianer}>
          <Text style={styles.ruppesSymbole}>{"₹"}</Text>
          <InputComp
            placeholder={StringsName.price}
            containerStyle={styles.containerStyle}
            value={bitAmount}
            onChangeText={(text) => {
              setBitAmount(text);
            }}
            keyboardType={true}
          />
        </View>

        <View style={styles.btnContianer}>
          <ButtonComboComp
            bntContianerStyle={{
              backgroundColor: bitAmount ? Colors.btnColor : Colors.lightGray,
            }}
            disabled={bitAmount ? false : true}
            titleRight={"Send Quotation"}
            onPressRight={() => {
              _createQuote();
            }}
          />
        </View>
      </ScrollView>
    </AppWapper>
  );
};
export default QuotationConfirm;
const styles = StyleSheet.create({
  headerGoBackContianer: {
    borderBottomWidth: hp(0.1),
    borderColor: Colors.gray878787,
    paddingHorizontal: wp(4),
    backgroundColor: Colors.White,
    flexDirection: "row",
    alignItems: "center",
  },
  contianer: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: wp(4),
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
  loadContianer: {
    backgroundColor: Colors.tabColor,
    marginVertical: hp(0.5),
    padding: wp(4),
    borderRadius: wp(1.5),
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
  truchTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(2),
  },
  truckContianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  truckImgContianer: { width: wp(5), height: hp(2) },
  truckImg: { width: "100%", height: "100%", resizeMode: "contain" },
  feetTxt: {
    color: Colors.textcolor1C274C,
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(1.8),
  },
  toContianer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
  },
  toOuterCircle: {
    width: wp(4.5),
    height: wp(4.5),
    borderRadius: wp(4.5),
    borderWidth: wp(0.3),
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(1),
  },
  toInnerCircle: {
    backgroundColor: "green",
    width: wp(3.5),
    height: wp(3.5),
    borderRadius: wp(3.5),
  },
  toTxt: {
    color: Colors.textcolor1C274C,
    fontSize: hp(1.8),
    fontFamily: Fonts.LATO_Regular600,
    width: "80%",
  },
  productTpyeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: hp(0.5),
  },
  productTpye: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(1.8),
  },
  txtmachine: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(1.8),
  },
  inputContianer: {
    marginVertical: hp(2),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(2),
    backgroundColor: Colors.tabColor,
    width: "100%",
    borderRadius: wp(1.5),
  },
  containerStyle: {
    flex: 1,
  },
  ruppesSymbole: {
    color: Colors.gray878787,
    fontSize: hp(2.3),
    fontFamily: Fonts.LATO_Regular600,
  },
  btnContianer: {
    width: "100%",
    alignSelf: "center",
  },
});
