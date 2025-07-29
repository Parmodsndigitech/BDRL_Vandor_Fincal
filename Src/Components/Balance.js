import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Utails/Colors";
import { hp, wp } from "../Utails/Responsive";
import Fonts from "../Utails/Fonts";
import { useNavigation } from "@react-navigation/native";
import ScreensName from "../Utails/ScreensName";
import { ToastModel } from "./alert/ToastModel";
import { APIRequest, ApiUrl } from "../Constants/apiurl";
import moment from "moment";

const Balance = () => {
  const naivgation = useNavigation();
  const [getPayment, setGetPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    _paymentStatus();
  }, []);
  const _paymentStatus = () => {
    setLoading(true);
    let config = {
      url: ApiUrl.paymenStatusApi,
      method: "get",
    };
    APIRequest(
      config,
      (res) => {
        setGetPayment(res?.data);
        ToastModel({ type: "error", text2: res?.message });
        setLoading(false);
      },
      (err) => {
        console.log("_paymentStatus", err);
        if (err?.message) {
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          naivgation.navigate(ScreensName.BALANCESCREEN, { data: item });
        }}
        style={styles.container}
      >
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
          <View style={[styles.outerCricel, { borderColor: Colors.redF01919 }]}>
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
              {moment(item?.createdAt).format("DD MMM YYYY")}
            </Text>
          </View>
          <Text style={[styles.title, { fontSize: hp(1.7) }]}>
            ₹ {item?.advancePayment}
          </Text>
        </View>
        <View style={styles.flexContainer}>
          <View>
            <Text style={[styles.title, { color: "orange" }]}>
              Balance Payment{" "}
            </Text>
            <Text
              style={[styles.title, { color: "orange", fontSize: hp(1.5) }]}
            >
              {moment(item?.createdAt).format("DD MMM YYYY")}
            </Text>
          </View>
          <Text style={[styles.title, { color: "orange", fontSize: hp(1.7) }]}>
            ₹ {item?.balancePayment}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      {loading && (
        <ActivityIndicator
          color={Colors.btnColor}
          size="large"
          style={styles.loader}
        />
      )}
      <FlatList
        data={getPayment}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <View style={{ marginBottom: hp(2) }}></View>
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: hp(2.5),
                fontFamily: Fonts.LATO_Regular600,
                color: Colors.Gray,
              }}
            >
              No Balance's Found!
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabColor,
    padding: wp(4),
    borderRadius: wp(1.5),
    marginVertical: hp(2),
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
