import {
  ActivityIndicator,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  FlatList,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Utails/Colors";
import { hp, wp } from "../Utails/Responsive";
import VectorIcon from "../Utails/VectorIcon";
import Fonts from "../Utails/Fonts";
import StringsName from "../Utails/StringsName";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreensName from "../Utails/ScreensName";
import { APIRequest, ApiUrl } from "../Constants/apiurl";
import { ToastModel } from "./alert/ToastModel";
import moment from "moment";
const ITEM_HEIGHT = hp(4);
export default function CountryQuotation({ refreshData }) {
  const navigation = useNavigation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [getAllQuotation, setAllQuotation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getAllQuotationFilter, setGetAllQuotationFilter] = useState(false);
  const [filterBranch, setfilterBranch] = useState([]);

  const toggleFilterViewRemove = () => {
    setfilterBranch("");
    setGetAllQuotationFilter(false);
  };
  const toggleCollapse = (index) => {
    setIsCollapsed((prevIndex) => (prevIndex === index ? null : index));
  };
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };
  const _onSelectCompayType = (filterBranch) => {
    setfilterBranch(filterBranch);
    setGetAllQuotationFilter(false);
  };
  const filteredData = getAllQuotation.filter(
    (item) => item.branchName === filterBranch
  );
  useEffect(() => {
    _getAllQuotation();
  }, []);
  const _getAllQuotation = () => {
    setLoading(true);
    let config = {
      url: ApiUrl.getAllQuery,
      method: "get",
    };
    APIRequest(
      config,
      (res) => {
        if (res?.data) {
          setAllQuotation(res?.data);
          setLoading(false);
        }
      },
      (err) => {
        // console.log("_getAllQuotation", err);
        setLoading(false);
        if (err?.message) {
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };
  const groupedByBranch = Object.entries(
    getAllQuotation.reduce((acc, item) => {
      if (item.status === "Open") {
        const branch = item.branchName;
        if (!acc[branch]) {
          acc[branch] = [];
        }
        acc[branch].push(item);
      }
      return acc;
    }, {})
  ).map(([branchName, items]) => ({
    branchName,
    data: items,
  }));
  const FiltergroupedByBranch = Object.entries(
    getAllQuotation.reduce((acc, item) => {
      if (item.status === "Open") {
        const branch = item.branchName;
        if (!acc[branch]) {
          acc[branch] = [];
        }
        acc[branch].push(item);
      }
      return acc;
    }, {})
  ).map(([branchName, items]) => ({
    branchName,
    data: items,
  }));
  const filteredDataa = Object.entries(
    filteredData.reduce((acc, item) => {
      if (item.status === "Open") {
        const branch = item.branchName;
        if (!acc[branch]) {
          acc[branch] = [];
        }
        acc[branch].push(item);
      }
      return acc;
    }, {})
  ).map(([branchName, items]) => ({
    branchName,
    data: items,
  }));
  // page reload for updated data calling  focuse Api
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        _getAllQuotation();
        return false;
      }
    );
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      _getAllQuotation();
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
      _getAllQuotation();
      return;
    }, [])
  );

  // Refresh data when `refreshData` is called (passed from HomeScreen)
  useEffect(() => {
    if (refreshData) {
      _getAllQuotation(); // Re-fetch data when refresh is triggered
    }
  }, [refreshData]);

  return (
    <View>
      {loading && (
        <ActivityIndicator
          color={Colors.btnColor}
          size="large"
          style={styles.loader}
        />
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setGetAllQuotationFilter(true)}
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.btnColor,
          alignSelf: "flex-end",
          marginTop: hp(2),
          right: wp(1),
          zIndex: 999,
          flexDirection: "row",
          borderRadius: wp(1),
          padding: wp(2),
        }}
      >
        <VectorIcon
          type={"MaterialCommunityIcons"}
          name={"filter"}
          size={25}
          color={Colors.White}
        />
        <Text
          style={{
            color: Colors.White,
            fontSize: hp(2),
            fontWeight: "500",
            right: wp(1),
          }}
        >
          {" "}
          Filter By Branch
        </Text>
      </TouchableOpacity>
      <>
        {(filteredDataa && filteredDataa.length > 0
          ? filteredDataa
          : groupedByBranch
        )?.map((branch, index) => (
          <View key={branch?._id}>
            <TouchableOpacity
              onPress={() => toggleCollapse(index)}
              activeOpacity={0.8}
              style={styles.contianer}
            >
              <View style={styles.innerContianer}>
                <Text style={styles.countryCount}>{branch?.data?.length}</Text>
                <Text style={styles.countryName}>{branch?.branchName}</Text>
              </View>
              {isCollapsed === index ? (
                <VectorIcon
                  type={"MaterialIcons"}
                  name={"keyboard-arrow-down"}
                  size={30}
                  color={Colors.gray878787}
                />
              ) : (
                <VectorIcon
                  type={"MaterialIcons"}
                  name={"keyboard-arrow-left"}
                  size={30}
                  color={Colors.gray878787}
                />
              )}
            </TouchableOpacity>
            {isCollapsed === index ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.loadOuterContianer}
              >
                {branch?.data ? (
                  branch?.data
                    .slice()
                    .reverse()
                    .map((option, subIndex) => (
                      <TouchableOpacity
                        key={subIndex}
                        activeOpacity={0.8}
                        onPress={() =>
                          navigation.navigate(ScreensName.QUOTATIONCONFIRM, {
                            getAllQuotationData: option,
                          })
                        }
                        style={styles.loadContianer}
                      >
                        {/* Don't need to show this part END*/}
                        <Text
                          style={[
                            styles.feetTxt,
                            {
                              marginBottom: hp(1),
                              color: Colors.Black,
                              fontFamily: Fonts.LATO_BOLD700,
                              alignSelf: "flex-end",
                            },
                          ]}
                        >
                          {moment(option?.createdAt).calendar()}
                        </Text>
                        <View style={styles.productTpyeContainer}>
                          <Text
                            style={[
                              styles.productTpye,
                              { fontFamily: Fonts.LATO_BOLD700 },
                            ]}
                          >
                            Query Id
                          </Text>
                          <Text
                            style={[
                              styles.txtmachine,
                              { width: "60%", textAlign: "right" },
                            ]}
                            numberOfLines={2}
                          >
                            {capitalizeFirstLetter(option?.queryId)}
                          </Text>
                        </View>

                        <View style={styles.productTpyeContainer}>
                          <Text
                            style={[
                              styles.productTpye,
                              { fontFamily: Fonts.LATO_BOLD700 },
                            ]}
                          >
                            Budget
                          </Text>
                          <Text
                            style={[
                              styles.txtmachine,
                              { width: "60%", textAlign: "right" },
                            ]}
                            numberOfLines={2}
                          >
                            <Text style={{ color: Colors.Black }}>₹</Text>{" "}
                            {option?.advanceClient}
                          </Text>
                        </View>
                        <View style={styles.productTpyeContainer}>
                          <Text
                            style={[
                              styles.productTpye,
                              { fontFamily: Fonts.LATO_BOLD700 },
                            ]}
                          >
                            Client Mobile
                          </Text>
                          <Text
                            onPress={() => {
                              const phoneNumber = `tel:${option?.clientMobile}`;
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
                            (+91) {option?.clientMobile}
                          </Text>
                        </View>
                        <View
                          style={[styles.toContianer, { marginTop: hp(1) }]}
                        >
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
                            {capitalizeFirstLetter(option?.pickup?.location)}
                            {`    `}
                          </Text>
                        </View>

                        <View style={styles.toContianer}>
                          <View
                            style={[
                              styles.toOuterCircle,
                              { borderColor: Colors.redF01919 },
                            ]}
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
                            {capitalizeFirstLetter(option?.drop?.location)}
                          </Text>
                        </View>
                        <View>
                          <View style={styles.productTpyeContainer}>
                            <Text
                              style={[
                                styles.productTpye,
                                { fontFamily: Fonts.LATO_BOLD700 },
                              ]}
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
                              {capitalizeFirstLetter(option?.materialCategory)}
                              {`   `}
                            </Text>
                          </View>
                          <View style={styles.productTpyeContainer}>
                            <Text
                              style={[
                                styles.productTpye,
                                { fontFamily: Fonts.LATO_BOLD700 },
                              ]}
                            >
                              {StringsName.materialWeight}
                            </Text>
                            <Text
                              style={[
                                styles.txtmachine,
                                { textAlign: "right" },
                              ]}
                              numberOfLines={2}
                            >
                              {capitalizeFirstLetter(option?.materialWeight)}
                              {StringsName.ton}
                            </Text>
                          </View>

                          <View style={styles.productTpyeContainer}>
                            <Text
                              style={[
                                styles.productTpye,
                                { fontFamily: Fonts.LATO_BOLD700 },
                              ]}
                            >
                              Vehicle Body
                            </Text>
                            <Text
                              style={[
                                styles.txtmachine,
                                { textAlign: "right" },
                              ]}
                              numberOfLines={2}
                            >
                              {capitalizeFirstLetter(option?.vehicleType)} Boby
                            </Text>
                          </View>

                          <View style={styles.productTpyeContainer}>
                            <Text
                              style={[
                                styles.productTpye,
                                { fontFamily: Fonts.LATO_BOLD700 },
                              ]}
                            >
                              Vehicle Length
                            </Text>
                            <Text
                              style={[
                                styles.txtmachine,
                                { textAlign: "right" },
                              ]}
                              numberOfLines={2}
                            >
                              {option?.truckLength}
                               {/* Ft */}
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
                                option?.materialDescription
                              )}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      color: Colors.Black,
                      fontSize: hp(2),
                    }}
                  >
                    Loading...
                  </Text>
                )}
              </ScrollView>
            ) : null}
          </View>
        ))}
      </>

      {/* Model for Filtr Branch View   */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={getAllQuotationFilter}
        style={{ margin: 0 }}
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
              Filter By Branch Name{" "}
            </Text>
            <FlatList
              data={FiltergroupedByBranch}
              keyExtractor={(item) => item._id}
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
                    Found!🔍 No Data for Filter
                  </Text>
                </View>
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => _onSelectCompayType(item?.branchName)}
                >
                  <Text
                    key={item._id}
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
                    {capitalizeFirstLetter(item?.branchName)}
                  </Text>
                </TouchableOpacity>
              )}
              getItemLayout={(item, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
            />
            <TouchableOpacity
              style={[styles.closeButton, { marginTop: hp(2) }]}
              onPress={() => toggleFilterViewRemove()}
            >
              <Text
                style={[
                  styles.buttonText,
                  { textAlign: "center", fontSize: hp(2.5), color: "red" },
                ]}
              >
                Show All Branch
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Model for Filter Branch View   */}
    </View>
  );
}

const styles = StyleSheet.create({
  contianer: {
    backgroundColor: Colors.tabColor,
    marginVertical: hp(2),
    marginBottom: hp(1),
    borderRadius: wp(1.5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerContianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countryCount: {
    backgroundColor: Colors.btnColor,
    padding: wp(4),
    borderRadius: wp(1.5),
    fontFamily: Fonts.LATO_BOLD700,
    color: Colors.White,
    marginRight: wp(2),
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
    paddingTop: hp(2.5),
  },
  countryName: {
    color: Colors.TxtColor,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.2),
  },
  loadContianer: {
    backgroundColor: Colors.tabColor,
    marginVertical: hp(0.5),
    padding: wp(4),
    borderRadius: wp(1.5),
  },
  truckContianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  truchTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(2),
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
    width: wp(5),
    height: wp(5),
    borderRadius: wp(5),
    borderWidth: wp(0.3),
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(1),
  },
  toInnerCircle: {
    backgroundColor: "green",
    width: wp(4),
    height: wp(4),
    borderRadius: wp(4),
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
    fontSize: hp(2),
  },
  txtmachine: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(1.8),
  },
  filterByBtn: {
    borderWidth: 1,
    color: Colors.gray878787,
    marginTop: hp(2),
    fontWeight: "500",
    alignSelf: "flex-end",
    padding: wp(1.8),
    fontSize: hp(1.7),
    borderRadius: wp(1),
    borderColor: Colors.gray878787,
  },
  nameLabel: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: Colors.Black,
    textAlign: "center",
    marginVertical: hp(1),
  },
});
