import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Collapsible from "react-native-collapsible";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../Utails/Colors";
import Fonts from "../../Utails/Fonts";
import StringsName from "../../Utails/StringsName";
import { hp, wp } from "../../Utails/Responsive";
import ImagePath from "../../Utails/ImagePath";
import VectorIcon from "../../Utails/VectorIcon";
import StatusBarr from "../../Components/StatusBarr";
import AppWapper from "../../Components/AppWapper";
import HeaderGoBack from "../../Components/HeaderGoBack";
import NeedHelpModel from "../../Components/NeedHelpModel";

export default function PaidScreen() {
  const naivgation = useNavigation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <AppWapper>
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.headerGoBackContianer}>
        <HeaderGoBack title={StringsName.paid} />
      </View>
      <View style={styles.outerContianer}>
        <View style={styles.container}>
          <View style={styles.vanderTrackContianer}>
            <View style={styles.vanderTrackInnerContianer}>
              <Image
                source={ImagePath.vanderTrack}
                style={styles.vanderTrackIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.vanderTrackName}>Mahindra </Text>
          </View>

          <Text style={styles.vanderVehicleNumber}>
            Vehicle number : 12HR 890
          </Text>

          <View style={styles.vanderLocationAddress}>
            <View style={styles.outerCricel}>
              <View style={styles.innerCricle} />
            </View>
            <Text
              style={styles.vanderLocationAddressTxt}
              numberOfLines={1}
            >{`4517 Washington Ave. Manchester, Kentucky 39495`}</Text>
          </View>

          <View style={styles.vanderLocationAddress}>
            <View
              style={[styles.outerCricel, { borderColor: Colors.redF01919 }]}
            >
              <View
                style={[
                  styles.innerCricle,
                  { backgroundColor: Colors.redF01919 },
                ]}
              />
            </View>
            <Text
              style={styles.vanderLocationAddressTxt}
              numberOfLines={1}
            >{`3517 W. Gray St. Utica, Pennsylvania 57867`}</Text>
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
            <Text style={styles.packagedetails}>
              {StringsName.packagedetails}
            </Text>
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
              <View style={styles.numberOfBoxesContainer}>
                <Text style={styles.numberOfBoxes}>
                  {StringsName.numberOfBoxes}
                </Text>
                <Text style={styles.numberOfBoxes}>05</Text>
              </View>

              <View
                style={[
                  styles.numberOfBoxesContainer,
                  styles.productTpyeContainer,
                ]}
              >
                <Text style={styles.productTpye}>
                  {StringsName.productTpye}
                </Text>
                <Text style={styles.numberOfBoxes}>Machine</Text>
              </View>
              <Text style={[styles.numberOfBoxes, { marginTop: hp(-1) }]}>
                Volvo bus engine
              </Text>
            </View>
            <View style={styles.driverDettalsContianer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.driverNo} numberOfLines={1}>
                  Driver number
                </Text>
                <Text style={styles.numberOfBoxes}>91+ 1223456754</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[styles.driverNo, { marginVertical: hp(0.5) }]}
                  numberOfLines={1}
                >
                  Delivery point of contact
                </Text>
                <Text style={styles.numberOfBoxes}>91+ 1234567254</Text>
              </View>
              {/* ########################### add patymen Method START  */}
              <Text
                style={[styles.driverNo, { marginVertical: hp(0.5) }]}
                numberOfLines={1}
              >
                Payment
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[styles.driverNo, { marginVertical: hp(0.5) }]}
                  numberOfLines={1}
                >
                  Trip Fare
                </Text>
                <Text style={styles.numberOfBoxes}>₹ 1000</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[styles.driverNo, { marginVertical: hp(0.5) }]}
                  numberOfLines={1}
                >
                  TDS
                </Text>
                <Text style={styles.numberOfBoxes}>₹ 100</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[styles.driverNo, { marginVertical: hp(0.5) }]}
                  numberOfLines={1}
                >
                  Commission
                </Text>
                <Text style={styles.numberOfBoxes}>₹ 50</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[styles.driverNo, { marginVertical: hp(0.5) }]}
                  numberOfLines={1}
                >
                  Other Deductions
                </Text>
                <Text style={styles.numberOfBoxes}>₹ 50</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomWidth: hp(0.1),
                  borderBottomColor: Colors[525252],
                }}
              >
                <View>
                  <Text
                    style={[styles.driverNo, { marginVertical: hp(0.5) }]}
                    numberOfLines={1}
                  >
                    Advance Payment
                  </Text>
                  <Text
                    style={[styles.numberOfBoxes, { marginBottom: hp(1) }]}
                    numberOfLines={1}
                  >
                    12 Jul 2024
                  </Text>
                </View>

                <Text style={styles.numberOfBoxes}>₹ 300</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[styles.driverNo, { marginVertical: hp(0.5) }]}
                  numberOfLines={1}
                >
                  Balance Payment
                </Text>
                <Text style={styles.numberOfBoxes}>₹ 0</Text>
              </View>
              {/* ########################### add patymen Method End  */}
            </View>
          </Collapsible>
        </View>

        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => toggleModal()}
        >
          <Text style={styles.btnTitle}>{StringsName.help}</Text>
        </TouchableOpacity>
        <NeedHelpModel modalVisible={modalVisible} toggleModal={toggleModal} />
      </View>
    </AppWapper>
  );
}

const styles = StyleSheet.create({
  headerGoBackContianer: {
    paddingHorizontal: wp(4),
    borderBottomWidth: wp(0.6),
    borderColor: Colors.F7F7F7,
    backgroundColor: Colors.White,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  outerContianer: {
    flex: 1,
    paddingHorizontal: wp(4),
    backgroundColor: Colors.White,
    paddingVertical: hp(2),
  },
  container: {
    backgroundColor: Colors.tabColor,
    padding: wp(4),
    borderRadius: wp(1),
    marginBottom: hp(1.5),
  },
  vanderTrackContianer: {
    flexDirection: "row",
    alignItems: "center",
  },
  vanderTrackInnerContianer: {
    width: wp(6),
    height: hp(3),
    marginRight: wp(3),
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
  vanderVehicleNumber: {
    fontFamily: Fonts.LATO_Regular600,
    fontWeight: "600",
    fontSize: hp(1.9),
    color: Colors.textcolor1C274C,
    marginVertical: hp(1),
  },

  outerCricel: {
    width: wp(5.5),
    height: wp(5.5),
    borderRadius: wp(5.5),
    borderWidth: 1,
    borderColor: Colors.green029C0D,
    padding: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCricle: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(4),
    backgroundColor: Colors.green029C0D,
  },
  vanderLocationAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(1),
  },
  vanderLocationAddressTxt: {
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(1.8),
    color: Colors.textcolor1C274C,
    marginLeft: wp(2),
    width: "90%",
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
  btn: {
    borderWidth: wp(0.3),
    borderColor: Colors.btnColor,
    paddingVertical: hp(1.5),
    borderRadius: wp(1.5),
    width: "48%",
  },
  btnTitle: {
    color: Colors.btnColor,
    textAlign: "center",
    fontSize: hp(2),
    fontFamily: Fonts.LATO_BOLD700,
  },
  btnContianer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: hp(5),
    alignSelf: "center",
  },
  btnUpload: {
    backgroundColor: Colors.btnColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  add: { fontSize: hp(2), color: Colors.White },
  uploadBtnBrowerConainer: {
    position: "absolute",
    bottom: hp(12),
    right: wp(5),
    width: "46%",
  },
  uploadBtnBrower: {
    backgroundColor: Colors.btnColor,
    alignItems: "center",
    textAlign: "center",
    borderRadius: wp(1.5),
    paddingVertical: hp(1.5),
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2),
    opacity: 0.8,
    marginVertical: hp(0.5),
  },
  btnContainer: {
    borderWidth: wp(0.2),
    borderColor: Colors.btnColor,
    position: "absolute",
    alignSelf: "baseline",
    paddingHorizontal: wp(10),
    paddingVertical: hp(1.5),
    borderRadius: wp(1.5),
    bottom: hp(6),
    marginLeft: wp(5),
    zIndex: 999,
  },
  btnTitle: {
    color: Colors.btnColor,
    textAlign: "center",
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2),
  },
});
