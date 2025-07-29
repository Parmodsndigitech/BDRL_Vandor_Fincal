import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Utails/Colors";
import Fonts from "../Utails/Fonts";
import { hp, wp } from "../Utails/Responsive";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { APIRequest, ApiUrl } from "../Constants/apiurl";
import GetRemainingPaymentModal from "./GetRemainingPaymentModal";
import VectorIcon from "../Utails/VectorIcon";
import Collapsible from "react-native-collapsible";

const Pod = () => {
  const navigation = useNavigation();
  const [getAllQuotations, setGetAllQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendorID, setvendorID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [getQueryId, setQueryId] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleExpanded = () => {
    setIsCollapsed(!isCollapsed);
  };
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
    setIsRefreshing(true);
    let config = {
      url: ApiUrl.getDetailsApi,
      method: "get",
    };
    await APIRequest(
      config,
      (res) => {
        setvendorID(res?.data?._id);
        setIsRefreshing(false);
      },
      (err) => {
        setIsRefreshing(false);
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
        item.queryDetails &&
        item.queryDetails.PODApproval === "Approve" &&
        item.advancesDetails?.status === "Paid" &&
        item?.remainingBalance === null
    );
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
  const setModalVisibleee = (data) => {
    const { item } = data;
    setModalVisible(true);
    setQueryId(item);
  };
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
        <View style={styles.flexContainer}>
          <Text style={[styles.title, { color: Colors.Black }]}>queryId :</Text>
          <Text
            style={[
              styles.title,
              {
                color: Colors.Black,
                fontSize: hp(1.8),
                borderRadius: wp(0.5),
                fontFamily: Fonts.LATO_BOLD700,
              },
            ]}
          >
            {capitalizeFirstLetter(item?.queryDetails?.queryId)}
          </Text>
        </View>
        <View style={styles.flexContainer}>
          <Text style={[styles.title, { color: Colors.Black }]}>
            Branch Name :
          </Text>
          <Text
            style={[
              styles.title,
              {
                color: Colors.Black,
                fontSize: hp(1.8),
                borderRadius: wp(0.5),
                fontFamily: Fonts.LATO_BOLD700,
              },
            ]}
          >
            {capitalizeFirstLetter(item?.queryDetails?.branchName)}
          </Text>
        </View>
        {/* ####################################  */}

        <View style={styles.flexContainer}>
          <Text style={[styles.title, { color: Colors.Black }]}>Confirm Budget :</Text>
          <Text
            style={[
              styles.title,
              {
                color: Colors.Black,
                fontSize: hp(1.8),
                borderRadius: wp(0.5),
                fontFamily: Fonts.LATO_BOLD700,
              },
            ]}
          >
            {item?.amount}
          </Text>
        </View>

        <View style={styles.flexContainer}>
          <Text style={[styles.title, { color: Colors.Black }]}>
            UnLoading Charge :
          </Text>
          <Text
            style={[
              styles.title,
              {
                color: Colors.Black,
                fontSize: hp(1.8),
                borderRadius: wp(0.5),
                fontFamily: Fonts.LATO_BOLD700,
              },
            ]}
          >
            <Text style={{ color: Colors.Black }}>₹</Text>{" "}
            {item?.queryDetails?.unloadingCharge}
          </Text>
        </View>
        <View style={styles.flexContainer}>
          <Text style={[styles.title, { color: Colors.Black }]}>
            Dentation Charge :
          </Text>
          <Text
            style={[
              styles.title,
              {
                color: Colors.Black,
                fontSize: hp(1.8),
                borderRadius: wp(0.5),
                fontFamily: Fonts.LATO_BOLD700,
              },
            ]}
          >
            <Text style={{ color: Colors.Black }}>₹</Text>{" "}
            {item?.queryDetails?.dentationCharge}
          </Text>
        </View>

        <View style={styles.flexContainer}>
          <Text style={[styles.title, { color: Colors.Black }]}>
            Other Charge :
          </Text>
          <Text
            style={[
              styles.title,
              {
                color: Colors.Black,
                fontSize: hp(1.8),
                borderRadius: wp(0.5),
                fontFamily: Fonts.LATO_BOLD700,
              },
            ]}
          >
            <Text style={{ color: Colors.Black }}>₹</Text>{" "}
            {item?.queryDetails?.otherCharge}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleExpanded}
          style={[
            styles.header,
            {
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: hp(1),
            },
          ]}
        >
          {/* {isCollapsed ? 'Show Details' : 'Hide Details'} */}
          <Text
            style={{
              fontSize: hp(2),
              color: Colors.Black,
              fontFamily: Fonts.LATO_BOLD700,
              marginBottom: hp(0.5),
            }}
          >
            {" "}
            {"  "}
            Picker Details
          </Text>

          <VectorIcon
            type={"MaterialIcons"}
            name={isCollapsed ? "keyboard-arrow-down" : "keyboard-arrow-up"}
            size={40}
            color={Colors.TxtColor}
          />
        </TouchableOpacity>

        <Collapsible collapsed={isCollapsed} style={{}}>
          <View>
            <View
              style={[
                styles.vanderLocationAddress,
                { justifyContent: "space-between" },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.outerCricel}>
                  <View style={styles.innerCricle} />
                </View>
                <Text
                  style={{
                    fontFamily: Fonts.LATO_BOLD700,
                    color: Colors.green029C0D,
                  }}
                >
                  {" "}
                  Pickup:
                </Text>
              </View>

              <View>
                <Text
                  style={[styles.vanderLocationAddressTxt]}
                  numberOfLines={1}
                >
                  {item?.queryDetails?.pickup?.location}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.vanderLocationAddress,
                { justifyContent: "space-between" },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={[
                    styles.outerCricel,
                    { borderColor: Colors.redF01919 },
                  ]}
                >
                  <View
                    style={[
                      styles.innerCricle,
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
                  {" "}
                  Drop:
                </Text>
              </View>

              <View>
                <Text style={styles.vanderLocationAddressTxt} numberOfLines={1}>
                  {item?.queryDetails?.drop?.location}
                </Text>
              </View>
            </View>

            <View style={styles.flexContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: hp(1.8),
                    borderRadius: wp(0.5),
                    fontFamily: Fonts.LATO_BOLD700,
                  },
                ]}
              >
                Client Contact
              </Text>
              <Text
                onPress={() => {
                  const phoneNumber = `tel:${item?.queryDetails?.clientMobile}`;
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
                (+91) {item?.queryDetails?.clientMobile}
              </Text>
            </View>

            <View style={styles.flexContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: hp(1.8),
                    borderRadius: wp(0.5),
                    fontFamily: Fonts.LATO_BOLD700,
                  },
                ]}
              >
                Driver Contact
              </Text>
              <Text
                onPress={() => {
                  const phoneNumber = `tel:${item?.contactDetails?.driverContact}`;
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
                (+91) {item?.contactDetails?.driverContact}
              </Text>
            </View>

            <View style={styles.flexContainer}>
              <Text style={[styles.title, { color: Colors.Black }]}>
                POD States :
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.redF01919,
                    fontSize: hp(1.8),
                    borderRadius: wp(0.5),
                    fontFamily: Fonts.LATO_BOLD700,
                  },
                ]}
              >
                {capitalizeFirstLetter(item?.queryDetails?.PODApproval)}
              </Text>
            </View>

            <View style={styles.flexContainer}>
              <Text style={[styles.title, { color: Colors.Black }]}>
                View POD here :
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: wp(0.5),
                }}
                onPress={() =>
                  Linking.openURL(`${item?.queryDetails?.imagePOD}`)
                }
              >
                <Text
                  style={{
                    color: Colors.redF01919,
                    fontFamily: Fonts.LATO_BOLD700,
                    fontSize: hp(1.8),
                  }}
                >
                  View POD
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.flexContainer}>
              <Text style={[styles.title, { color: Colors.Black }]}>
                Advance Payment status :
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.redF01919,
                    fontSize: hp(1.8),
                    padding: wp(1),
                    borderRadius: wp(0.5),
                    fontFamily: Fonts.LATO_BOLD700,
                  },
                ]}
              >
                {item.advancesDetails ? item.advancesDetails.status : "UnPaid"}
              </Text>
            </View>

            <View style={styles.flexContainer}>
              <Text style={[styles.title, { color: Colors.Black }]}>
                Remaining Payment status :
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: wp(0.5),
                }}
                onPress={() =>
                  Linking.openURL(`${item?.queryDetails?.imagePOD}`)
                }
              >
                <Text
                  style={{
                    color: Colors.redF01919,
                    fontFamily: Fonts.LATO_BOLD700,
                    fontSize: hp(1.8),
                  }}
                >
                  {item.remainingBalance
                    ? item.remainingBalance.status
                    : "UnPaid"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Collapsible>

        {/* for get Advance Payment  #########################*/}
        {filteredData && (
          <Text
            onPress={() => setModalVisibleee({ visible: true, item })}
            style={[
              styles.title,
              {
                marginTop: hp(1),
                color: Colors.btnColor,
                fontSize: hp(1.8),
                backgroundColor: Colors.btnColor,
                padding: wp(2),
                borderRadius: wp(0.5),
                color: Colors.White,
                fontFamily: Fonts.LATO_Regular600,
                alignSelf: "center",
              },
            ]}
          >
            Remaining Payment
          </Text>
        )}
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
          style={[styles.loader, { marginTop: hp(5) }]}
        />
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: Colors.Black,
            textAlign: "right",
            fontSize: hp(2),
            fontWeight: "700",
            marginBottom: hp(1),
          }}
        >
          Get Remaining Payment{" "}
        </Text>
        <Text
          style={{
            color: Colors.Black,
            textAlign: "right",
            fontSize: hp(2),
            fontWeight: "700",
            marginBottom: hp(1),
            width: "40%",
          }}
          numberOfLines={2}
        >
          Total Approved POD No:{""}
          <Text style={{ color: "red" }}>{filteredData?.length} </Text>
        </Text>
      </View>

      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={filteredData}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={isRefreshing}
        //     onRefresh={_getProfileData}
        //   />
        // }
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
              Pod Not Found!
            </Text>
          </View>
        )}
      />
      <GetRemainingPaymentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={getQueryId}
      />
      <Text
        style={{
          alignSelf: "center",
          fontSize: hp(1.6),
          textAlign: "justify",
          color: Colors[525252],
          fontFamily: Fonts.LATO_BOLD700,
          width: "90%",
          marginTop: hp(-2),
          marginBottom: hp(10),
        }}
      >
        <Text style={{ color: Colors.redF01919, fontSize: hp(1.8) }}>
          Note:{" "}
        </Text>
        When POD (Proof of Delivery) will Approve successfully, then you will
        eligible for Get remaining balance.
      </Text>
    </ScrollView>
  );
};

export default Pod;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabColor,
    padding: wp(4),
    borderRadius: wp(1.5),
    marginBottom: hp(1),
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(2),
    marginVertical: hp(0.5),
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
    bottom: hp(-20),
    zIndex: 999,
  },
  btnTitle: {
    color: Colors.btnColor,
    textAlign: "center",
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2),
  },
  delveryDate: {
    color: Colors[525252],
    fontSize: hp(1.8),
    marginLeft: wp(1.5),
    fontFamily: Fonts.LATO_Regular600,
    marginVertical: hp(1),
  },
  posStaus: {
    color: "orange",
    fontSize: hp(1.8),
    fontFamily: Fonts.LATO_BOLD700,
    marginLeft: wp(1.5),
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "0%",
    zIndex: 999,
    alignSelf: "center",
    backgroundColor: Colors.RgbaWhite,
  },
});
