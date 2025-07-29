import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Colors from "../../Utails/Colors";
import { hp, wp } from "../../Utails/Responsive";
import StringsName from "../../Utails/StringsName";
import Fonts from "../../Utails/Fonts";
import HeaderGoBack from "../../Components/HeaderGoBack";
import moment from "moment";
import NeedHelpModel from "../../Components/NeedHelpModel";

const InvoiceScreen = ({ route }) => {
  const { data } = route?.params;
  // console.log('data..',data)
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <View style={styles.headerGoBackContianer}>
        <HeaderGoBack title={StringsName.Invoiced} />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.flexContainer}>
            <Text style={styles.title}>#123346</Text>
            <Text
              style={[
                styles.title,
                { color: Colors.gray878787, fontSize: hp(1.7) },
              ]}
            >
              InvoiceVehicle number : 12HR 890
            </Text>
          </View>
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
          <View style={styles.flexContainer}>
            <Text style={[styles.title, { fontSize: hp(2) }]}>Payments</Text>
          </View>
          <View style={styles.flexContainer}>
            <Text style={styles.title}>Trip Fare</Text>
            <Text
              style={[
                styles.title,
                { color: Colors.gray878787, fontSize: hp(1.7) },
              ]}
            >
              ₹ 1000
            </Text>
          </View>
          <View style={styles.flexContainer}>
            <Text style={styles.title}>TDS</Text>
            <Text
              style={[
                styles.title,
                { color: Colors.gray878787, fontSize: hp(1.7) },
              ]}
            >
              ₹ 100
            </Text>
          </View>
          <View style={styles.flexContainer}>
            <Text style={styles.title}>Commission</Text>
            <Text
              style={[
                styles.title,
                { color: Colors.gray878787, fontSize: hp(1.7) },
              ]}
            >
              ₹ 50
            </Text>
          </View>
          <View style={styles.flexContainer}>
            <Text style={styles.title}>Other Deductions</Text>
            <Text
              style={[
                styles.title,
                { color: Colors.gray878787, fontSize: hp(1.7) },
              ]}
            >
              ₹ 50
            </Text>
          </View>
          <View
            style={[
              styles.flexContainer,
              { borderBottomWidth: hp(0.1), borderBottomColor: Colors[525252] },
            ]}
          >
            <View>
              <Text style={styles.title}>Advance Payment</Text>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.gray878787,
                    fontSize: hp(1.5),
                    marginBottom: hp(1),
                  },
                ]}
              >
                {moment(data?.createdAt).format("DD MMM YYYY")}
              </Text>
            </View>
            <Text
              style={[
                styles.title,
                { color: Colors.gray878787, fontSize: hp(1.7) },
              ]}
            >
              ₹ {data?.advancePayment}
            </Text>
          </View>
          <View style={styles.flexContainer}>
            <View>
              <Text style={styles.title}>Balance Payment </Text>
              <Text
                style={[
                  styles.title,
                  { color: Colors.gray878787, fontSize: hp(1.5) },
                ]}
              >
                {moment(data?.createdAt).format("DD MMM YYYY")}
              </Text>
            </View>
            <Text
              style={[
                styles.title,
                { color: Colors.gray878787, fontSize: hp(1.7) },
              ]}
            >
              ₹ {data?.balancePayment}
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => toggleModal()}
      >
        <Text style={styles.btnTitle}>{StringsName.help}</Text>
      </TouchableOpacity>
      <NeedHelpModel modalVisible={modalVisible} toggleModal={toggleModal} />
    </View>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabColor,
    padding: wp(4),
    borderRadius: wp(1.5),
    marginHorizontal: wp(4),
    marginVertical: hp(2),
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(2),
    marginVertical: hp(1),
  },
  title: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(1.8),
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
});
