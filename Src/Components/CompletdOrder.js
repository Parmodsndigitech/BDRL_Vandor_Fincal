import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ImagePath from "../Utails/ImagePath";
import { hp, wp } from "../Utails/Responsive";
import Colors from "../Utails/Colors";
import Fonts from "../Utails/Fonts";
import StringsName from "../Utails/StringsName";
import VectorIcon from "../Utails/VectorIcon";
import Collapsible from "react-native-collapsible";
import ButtonComboComp from "./ButtonComboComp";

export default function CompletdOrder() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <View style={styles.container}>
      <View style={styles.vanderTrackContianer}>
        <View style={styles.vanderTrackInnerContianer}>
          <Image
            source={ImagePath.vanderTrack}
            style={styles.vanderTrackIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.vanderTrackName}>Tata Ace</Text>
      </View>

      <View style={styles.vanderLocationAddress}>
        <Text style={styles.toFromTxt}>{StringsName.to}</Text>
        <View>
          <Text style={styles.vanderLocationAddressTxt}>41.2 km, 06:00 am</Text>
          <Text style={styles.vanderLocationAddressTxt} numberOfLines={1}>
            {`4517 Washington Ave. Manchester, Kentucky 39495`}
          </Text>
        </View>
      </View>

      <View style={styles.vanderLocationAddress}>
        <Text style={styles.toFromTxt}>{StringsName.from}</Text>
        <View>
          <Text style={styles.vanderLocationAddressTxt}>41.2 km, 09:00 pm</Text>
          <Text
            style={styles.vanderLocationAddressTxt}
            numberOfLines={1}
          >{`3517 W. Gray St. Utica, Pennsylvania 57867`}</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleCollapse}
        style={styles.packageDetailsContianer}
      >
        <View style={styles.packageDetailsIconContinaer}>
          <Image
            source={ImagePath.packageDetailsIcon}
            style={styles.packageDetailsIcon}
          />
        </View>
        <Text style={styles.packagedetails}>{StringsName.packagedetails}</Text>
        {isCollapsed ? (
          <VectorIcon
            type={"MaterialIcons"}
            name={"keyboard-arrow-up"}
            size={30}
            color={Colors.TxtColor}
          />
        ) : (
          <VectorIcon
            type={"MaterialIcons"}
            name={"keyboard-arrow-down"}
            size={30}
            color={Colors.TxtColor}
          />
        )}
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <View>
          <View
            style={[
              styles.numberOfBoxesContainer,
              styles.productTpyeContainer,
              { marginTop: hp(0) },
            ]}
          >
            <Text style={styles.productTpye}>{StringsName.productTpye}</Text>
            <Text style={styles.numberOfBoxes}>Machine</Text>
          </View>
          <Text style={[styles.numberOfBoxes, { marginTop: hp(-1) }]}>
            Volvo bus engine
          </Text>
        </View>
        <View style={[styles.numberOfBoxesContainer, { marginTop: hp(1.5) }]}>
          <Text style={styles.numberOfBoxes}>{StringsName.numberOfBoxes}</Text>
          <Text style={styles.numberOfBoxes}>05</Text>
        </View>
        <View style={styles.driverDettalsContianer}>
          <View>
            <Text style={styles.driverNo} numberOfLines={1}>
              Note:
            </Text>

            <Text
              style={[styles.driverNo, styles.handelwithCare]}
              numberOfLines={1}
            >
              Handle with care
            </Text>
          </View>

          <Text style={styles.driverNo}>{"Fare Details"}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: wp(0.3),
              borderColor: Colors.gray878787,
            }}
          >
            <Text
              style={[
                styles.driverNo,
                { marginTop: hp(1), paddingBottom: hp(1) },
                styles.numberOfBoxes,
              ]}
              numberOfLines={1}
            >
              Trip fare
            </Text>
            <Text style={styles.numberOfBoxes}>₹ 120</Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  styles.driverNo,
                  { marginTop: hp(1), paddingBottom: hp(1) },
                  styles.numberOfBoxes,
                ]}
                numberOfLines={1}
              >
                <Text style={[styles.driverNo, { marginTop: hp(1) }]}>
                  {"Fare without Tax"}
                </Text>
              </Text>
              <Text style={styles.numberOfBoxes}>₹ 120</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: hp(-1),
              }}
            >
              <Text
                style={[
                  styles.driverNo,
                  { marginTop: hp(1), paddingBottom: hp(1) },
                  styles.numberOfBoxes,
                ]}
                numberOfLines={1}
              >
                <Text style={styles.numberOfBoxes}>{"CGST Tax"}</Text>
              </Text>
              <Text style={styles.numberOfBoxes}>₹ 120</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: hp(-1),
                justifyContent: "space-between",
                borderBottomWidth: wp(0.3),
                borderColor: Colors.gray878787,
              }}
            >
              <Text
                style={[
                  styles.driverNo,
                  { marginTop: hp(1), paddingBottom: hp(1) },
                  styles.numberOfBoxes,
                ]}
                numberOfLines={1}
              >
                <Text style={styles.numberOfBoxes}>{"SGST Tax"}</Text>
              </Text>
              <Text style={styles.numberOfBoxes}>₹ 120</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomWidth: wp(0.3),
                borderColor: Colors.gray878787,
              }}
            >
              <Text
                style={[
                  styles.driverNo,
                  { marginTop: hp(1), paddingBottom: hp(1) },
                  styles.numberOfBoxes,
                ]}
                numberOfLines={1}
              >
                <Text style={[styles.driverNo, { marginTop: hp(1) }]}>
                  {"Total order fare"}
                </Text>
              </Text>
              <Text style={styles.numberOfBoxes}>₹ 120</Text>
            </View>
          </View>

          {/* $$$$$$$$$$$$$$$$$$$$ GOOD COOD $$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */}
          <View style={styles.paymenMethodContainer}>
            <View style={styles.paymenMethodInnerContainer}>
              <Text style={styles.paymentmehodTxt}>
                {StringsName.paymentMode}
              </Text>
              <Text style={styles.numberOfBoxes}>{"Cash"}</Text>
            </View>
            <View style={styles.paymenMethodInnerContainer}>
              <Text style={styles.paymentmehodTxt}>
                {StringsName.dataOfpayment}
              </Text>
              <Text style={styles.numberOfBoxes}>{"10 June 2024 "}</Text>
            </View>
            <View style={styles.paymenMethodInnerContainer}>
              <Text style={styles.paymentmehodTxt}>
                {StringsName.advanceAmount}
              </Text>
              <Text style={styles.numberOfBoxes}>{"₹ 120"}</Text>
            </View>
            <View style={styles.paymenMethodInnerContainer}>
              <Text style={styles.paymentmehodTxt}>
                {StringsName.balanceAmount}
              </Text>
              <Text style={styles.numberOfBoxes}>{"₹ 500"}</Text>
            </View>
          </View>
          <ButtonComboComp
            titleleft={StringsName.mailInvoice}
            titleRight={StringsName.bookAgin}
          />
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.F7F7F7,
    padding: wp(4),
    borderRadius: wp(2),
    borderWidth: wp(0.3),
    borderColor: Colors.green029C0D,
    backgroundColor: Colors.greenLight,
    marginBottom: hp(1.5),
  },
  vanderTrackContianer: {
    flexDirection: "row",
    alignItems: "center",
  },
  vanderTrackInnerContianer: {
    width: wp(6),
    height: hp(3),
    marginRight: wp(7),
  },
  vanderTrackIcon: {
    width: "100%",
    height: "100%",
  },
  vanderTrackName: {
    fontFamily: Fonts.LATO_Regular600,
    fontWeight: "600",
    fontSize: hp(1.8),
    color: Colors.textcolor1C274C,
  },
  vanderLocationAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(1),
  },
  toFromTxt: {
    fontFamily: Fonts.LATO_BOLD700,
    fontWeight: "600",
    fontSize: hp(2.3),
    color: Colors.textcolor1C274C,
    width: "15%",
  },
  vanderLocationAddressTxt: {
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(1.8),
    color: Colors.textcolor1C274C,
    marginLeft: wp(2),
    width: wp(70),
    paddingRight: wp(3),
  },
  packageDetailsContianer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(1),
  },
  packageDetailsIconContinaer: {
    width: wp(6),
    height: hp(3),
    marginRight: wp(3),
  },
  packageDetailsIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  packagedetails: {
    fontFamily: Fonts.LATO_Regular600,
    color: Colors.textcolor1C274C,
    fontSize: hp(1.9),
  },
  numberOfBoxesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  numberOfBoxes: {
    fontFamily: Fonts.LATO_Regular600,
    color: Colors.textcolor1C274C,
    fontSize: hp(1.8),
  },
  productTpye: {
    fontFamily: Fonts.LATO_BOLD700,
    color: Colors.textcolor1C274C,
    fontSize: hp(2),
  },
  productTpyeContainer: {
    marginVertical: hp(1.5),
  },
  driverDettalsContianer: {
    marginTop: hp(2),
  },
  driverNo: {
    fontFamily: Fonts.LATO_BOLD700,
    color: Colors.textcolor1C274C,
    fontSize: hp(2),
  },
  handelwithCare: {
    backgroundColor: Colors.White,
    padding: wp(1),
    height: hp(5),
    marginVertical: hp(1),
    fontSize: hp(1.8),
    fontFamily: Fonts.LATO_BOLD700,
  },
  paymenMethodContainer: {
    marginTop: hp(1),
  },
  paymenMethodInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: hp(0.7),
  },
  paymentmehodTxt: {
    fontFamily: Fonts.LATO_BOLD700,
    color: Colors.textcolor1C274C,
    fontSize: hp(2),
  },
});
