import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Utails/Colors";
import { hp, wp } from "../Utails/Responsive";
import Fonts from "../Utails/Fonts";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { APIRequest, ApiUrl } from "../Constants/apiurl";
import moment from "moment";

const Paid = () => {
  const navigation = useNavigation();
  const [getAllQuotations, setGetAllQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendorID, setvendorID] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };
  useEffect(() => {
    _getProfileData();
    _getAllQueryquotation();
  }, []);
  useEffect(() => {
    _getAllQueryquotation();
  }, [vendorID]);
  const _getProfileData = async () => {
    let config = {
      url: ApiUrl.getDetailsApi,
      method: "get",
    };
    await APIRequest(
      config,
      (res) => {
        setvendorID(res?.data?._id);
      },
      (err) => {
        if (err?.message) {
          console.error("Error fetching profile data:", err.message);
        }
      }
    );
  };
  const _getAllQueryquotation = () => {
    setLoading(true);
    let config = {
      url: ApiUrl.getAllQuotationsApi,
      method: "get",
    };
    APIRequest(
      config,
      (res) => {
        setGetAllQuotations(res?.data);
        // console.log('parmod,,,,,',res?.data )
        setLoading(false);
      },
      (err) => {
        console.error("_getAllQueryquotation Error:", err);
        setLoading(false);
        if (err?.message) {
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };
  const filteredData = getAllQuotations
    .filter((item) => item?.vendorId === vendorID)
    .filter(
      (item) =>
        item.advancesDetails?.status === "Paid" &&
        item.remainingBalance?.status === "Paid"
    );
  // page reload for updated data calling  focuse Api
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        _getAllQueryquotation();
        _getProfileData();
        return false;
      }
    );
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      _getAllQueryquotation();
      _getProfileData();
      Alert.alert("Confirm exit", "Do you want to go back?", [
        { text: "Cancel", style: "cancel", onPress: () => {} },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    });
    return () => {
      backHandler.remove();
      navigation.removeListener("beforeRemove");
    };
  }, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      _getAllQueryquotation();
      _getProfileData();
      return;
    }, [])
  );
  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      _getProfileData();
      _getAllQueryquotation();
      setIsRefreshing(false);
    }, 200);
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Text style={[styles.textQ, { fontSize: hp(2.2) }]}>
          Advance Payment{" "}
        </Text>
        <View
          style={{
            backgroundColor: Colors.RgbaWhite,
            paddingHorizontal: wp(2),
            paddingBottom: hp(1),
            marginTop: hp(0.5),
            borderRadius: wp(1.5),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: wp(1),
              borderRadius: wp(1),
              marginTop: hp(1),
            }}
          >
            <Text style={[styles.textQ, { width: "40%" }]} numberOfLines={2}>
              Advance Payment Time :
            </Text>
            <Text
              style={{
                color: Colors.Black,
                fontSize: hp(1.8),
                fontFamily: Fonts.LATO_BOLD700,
                alignSelf: "flex-end",
                marginTop: hp(1),
              }}
            >
              {" "}
              {moment(item?.advancesDetails?.createdAt).calendar()}{" "}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: wp(1),
              borderRadius: wp(1),
              marginTop: hp(1),
            }}
          >
            <Text style={[styles.textQ, { width: "40%" }]} numberOfLines={2}>
              Advance Payment ID :
            </Text>
            <Text
              style={[styles.textQ, styles.textA, { width: "40%" }]}
              numberOfLines={2}
            >
              {" "}
              {item?.advancesDetails?._id}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: wp(1),

              borderRadius: wp(1),
              marginTop: hp(1),
            }}
          >
            <Text style={styles.textQ}>Advance Payment : </Text>
            <Text
              style={[
                styles.textQ,
                styles.textA,
                { color: Colors.green029C0D },
              ]}
            >
              {" "}
              {item?.advancesDetails?.status}
            </Text>
          </View>
        </View>

        <Text style={[styles.textQ, { fontSize: hp(2.2), marginTop: hp(1) }]}>
          Remaining Payment{" "}
        </Text>

        <View
          style={{
            backgroundColor: Colors.RgbaWhite,
            paddingHorizontal: wp(2),
            paddingBottom: hp(1),
            marginTop: hp(0.5),
            borderRadius: wp(1.5),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: wp(1),
              borderRadius: wp(1),
              marginTop: hp(1),
            }}
          >
            <Text style={[styles.textQ, { width: "40%" }]} numberOfLines={2}>
              Remaining Payment Time :
            </Text>
            <Text
              style={{
                color: Colors.Black,
                fontSize: hp(1.8),
                fontFamily: Fonts.LATO_BOLD700,
                alignSelf: "flex-end",
                marginTop: hp(1),
              }}
            >
              {" "}
              {moment(item?.remainingBalance?.createdAt).calendar()}{" "}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: wp(1),
              borderRadius: wp(1),
              marginTop: hp(1),
            }}
          >
            <Text style={[styles.textQ, { width: "40%" }]} numberOfLines={2}>
              Remaining Payment ID :
            </Text>
            <Text
              style={[styles.textQ, styles.textA, { width: "40%" }]}
              numberOfLines={2}
            >
              {" "}
              {item?.remainingBalance?._id}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: wp(1),

              borderRadius: wp(1),
              marginTop: hp(1),
            }}
          >
            <Text style={styles.textQ}>Remaining Payment : </Text>
            <Text
              style={[
                styles.textQ,
                styles.textA,
                { color: Colors.green029C0D },
              ]}
            >
              {" "}
              {item?.remainingBalance?.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      {loading && (
        <ActivityIndicator
          color={Colors.btnColor}
          size="large"
          style={styles.loader}
        />
      )}
      <View>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={filteredData}
          keyExtractor={(_, index) => index?.toString()}
          renderItem={(item) => renderItem(item)}
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
                No Paid Status Found!
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Paid;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabColor,
    padding: wp(4),
    borderRadius: wp(1.5),
    marginVertical: hp(1),
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
  textQ: {
    color: Colors.Black,
    fontSize: hp(1.8),
    fontFamily: Fonts.LATO_BOLD700,
  },
  textA: { color: Colors[525252] },
});
