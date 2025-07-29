import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  Image,
  Linking,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImagePath from "../Utails/ImagePath";
import { hp, wp } from "../Utails/Responsive";
import Colors from "../Utails/Colors";
import Fonts from "../Utails/Fonts";
import StringsName from "../Utails/StringsName";
import VectorIcon from "../Utails/VectorIcon";
import Collapsible from "react-native-collapsible";
import { APIRequest, ApiUrl } from "../Constants/apiurl";
import { ToastModel } from "./alert/ToastModel";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import DocumentPicker from "react-native-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const UploadLRModel = ({ visible, onClose, promodkaData }) => {
  const [loading, setLoading] = useState(false);
  const [uploadLR, setUploadLR] = useState("");
  const [loadingCharge, setLoadingCharge] = useState(0);
  const [otherCharge, setOtherCharge] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isCollapsed02, setIsCollapsed02] = useState(true);

  const toggleExpanded = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleExpanded02 = () => {
    setIsCollapsed02(!isCollapsed02);
  };
  const _pickLRDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setUploadLR(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the picker");
      } else {
        console.error("DocumentPicker Error: ", err);
      }
    }
  };
  const _uploadLR = async () => {
    const fd = new FormData();
    fd.append("queryId", promodkaData?.queryDetails?._id);
    fd.append("loadingCharge", loadingCharge);
    fd.append("otherChargeLR", otherCharge);
    fd.append("uploadLr", {
      uri: uploadLR?.uri,
      name: uploadLR?.name,
      type: uploadLR?.type,
    });
    let token = await AsyncStorage.getItem("token").catch((err) =>
      console.log(err)
    );
    try {
      setLoading(true);
      const response = await fetch(ApiUrl.uploadLrApi, {
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
      // console.log("Lr Ok Pamord ...", result);
      if (result?.success == true) {
        onClose();
        ToastModel({ type: "success", text2: result?.message });
      }
      setLoading(false);
      setUploadLR(" ");
      setLoadingCharge("");
    } catch (error) {
      setLoading(false);
      console.error(error);
      ToastModel({ type: "error", text2: result?.message });
    }
  };
  const _CloseMtData = () => {
    onClose();
    setUploadLR("");
    setLoadingCharge("");
    setOtherCharge("");
  };
  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => _CloseMtData()}
          style={[styles.modalOverlay, {}]}
        >
          {loading && (
            <ActivityIndicator
              color={Colors.btnColor}
              size="large"
              style={styles.loader}
            />
          )}
          <View style={[styles.modalContent]}>
            <View style={{ marginBottom: hp(1), alignItems: "center" }}>
              <VectorIcon
                type={"Entypo"}
                name={"upload-to-cloud"}
                size={50}
                color={Colors.btnColor}
              />
            </View>
            <Text
              style={{
                fontSize: hp(2),
                color: Colors.Black,
                width: "100%",
                fontFamily: Fonts.LATO_BOLD700,
                marginBottom: hp(0.5),
              }}
            >
              {" "}
              Upload LR
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.input,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
              onPress={() => _pickLRDoc()}
            >
              <Text
                style={{
                  color: !uploadLR?.name ? Colors.gray878787 : Colors.btnColor,
                  fontFamily: Fonts.LATO_Regular600,
                  width: "80%",
                }}
                numberOfLines={1}
              >
                {uploadLR?.name ? uploadLR?.name : "No Uploaded LR"}
              </Text>
              <VectorIcon
                type={"Entypo"}
                name={"upload"}
                size={25}
                color={Colors.btnColor}
              />
            </TouchableOpacity>
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
                Loading Charges
              </Text>

              {isCollapsed ? (
                <VectorIcon
                  type={"MaterialIcons"}
                  name={"keyboard-arrow-down"}
                  size={30}
                  color={Colors.TxtColor}
                />
              ) : (
                <VectorIcon
                  type={"MaterialIcons"}
                  name={"keyboard-arrow-up"}
                  size={30}
                  color={Colors.TxtColor}
                />
              )}
            </TouchableOpacity>

            <View style={{ width: "100%" }}>
              <Collapsible collapsed={isCollapsed} style={{}}>
                <View style={[styles.input, {}]}>
                  <TextInput
                    style={{
                      padding: 0,
                      color: Colors.Black,
                    }}
                    placeholder="0"
                    placeholderTextColor={Colors.gray878787}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      const filteredText = text.replace(/[^0-9]/g, "");
                      setLoadingCharge(filteredText);
                    }}
                    value={loadingCharge}
                  />
                </View>
              </Collapsible>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleExpanded02}
              // style={[styles.header, styles.chargesTxtButton]}
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
                Other Charges
              </Text>
              <VectorIcon
                type={"MaterialIcons"}
                name={
                  isCollapsed02 ? "keyboard-arrow-down" : "keyboard-arrow-up"
                }
                size={30}
                color={Colors.TxtColor}
              />
            </TouchableOpacity>
            <View style={{ width: "100%" }}>
              <Collapsible collapsed={isCollapsed02} style={{}}>
                <View style={styles.input}>
                  <TextInput
                    style={{
                      padding: 0,
                      color: Colors.Black,
                    }}
                    placeholder="0"
                    placeholderTextColor={Colors.gray878787}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      const filteredText = text.replace(/[^0-9]/g, "");
                      setOtherCharge(filteredText);
                    }}
                    value={otherCharge}
                  />
                </View>
              </Collapsible>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={!uploadLR ? true : false}
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      uploadLR == "" ? Colors.gray878787 : Colors.btnColor,
                  },
                ]}
                onPress={_uploadLR}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
export default function TransitOrder() {
  const navigation = useNavigation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [getAllQuotations, setGetAllQuotations] = useState([]);
  const [vendorID, setvendorID] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [savedData, setSavedData] = useState({ input1: "", input2: "" });
  const [getQueryId, setQueryId] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleSave = (input1, input2) => {
    setSavedData({ input1, input2 });
  };
  const setModalVisiblee = (data) => {
    const { visible, item } = data;
    setModalVisible(true);
    // console.log(visible, item?.item);
    setQueryId(item?.item);
  };
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };
  const toggleCollapse = (index) => {
    setIsCollapsed((prevId) => (prevId === index ? null : index));
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
  useEffect(() => {
    _getAllQueryquotation();
  }, []);
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
  const filteredDat = getAllQuotations
    .filter((item) => item?.vendorId === vendorID)
    .filter((item) => item?.contactDetails !== null)
    .filter((item) => item?.queryDetails?.imageLR === "");

  // ******************************************************
  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      _getProfileData();
      _getAllQueryquotation();
      setIsRefreshing(false);
    }, 200);
  };
  // page refress
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
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        key={item?.index}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={[
              styles.vanderTrackName,
              {
                color: Colors.Black,
                fontFamily: Fonts.LATO_BOLD700,
              },
            ]}
          >
            Status:{" "}
            <Text
              style={[
                styles.vanderTrackName,
                { color: "red", fontFamily: Fonts.LATO_BOLD700 },
              ]}
            >
              {item?.item?.status}
            </Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              marginBottom: hp(1),
            }}
          >
            <Text
              style={[
                styles.vanderTrackName,
                {
                  color: Colors.Black,
                  fontFamily: Fonts.LATO_BOLD700,
                  alignSelf: "flex-end",
                },
              ]}
            >
              {" "}
              LR Approval{" "}
            </Text>
            <Text
              style={[
                styles.vanderTrackName,
                { color: "red", fontFamily: Fonts.LATO_BOLD700 },
              ]}
            >
              {capitalizeFirstLetter(
                item?.item?.queryDetails?.LRApproval
                  ? item?.item?.queryDetails?.LRApproval
                  : "No status Found"
              )}
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={[
              styles.feetTxt,
              {
                color: Colors.Black,
                fontFamily: Fonts.LATO_BOLD700,
                alignSelf: "flex-end",
                marginVertical: hp(0.5),
              },
            ]}
          >
            {moment(item?.item?.createdAt).calendar()}
          </Text>
        </View>

        <Text style={styles.vanderVehicleNumber}>
          <Text style={{ color: Colors.Black, fontFamily: Fonts.LATO_BOLD700 }}>
            Vehicle No :
          </Text>
          <Text style={{}}>
            {" "}
            {!item?.item?.contactDetails?.truckNumber
              ? "No Truck No.."
              : item?.item?.contactDetails?.truckNumber}
          </Text>
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
            {capitalizeFirstLetter(item?.item?.queryDetails?.queryId)}
          </Text>
        </View>
        <View
          style={[
            styles.productTpyeContainer,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <Text
            style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
          >
            Branch Name
          </Text>
          <Text
            style={[styles.txtmachine, { width: "60%", textAlign: "right" }]}
            numberOfLines={2}
          >
            {capitalizeFirstLetter(item?.item?.queryDetails?.branchName)}
          </Text>
        </View>

        <View style={styles.productTpyeContainer}>
          <Text
            style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
          >
            Confirm Budget
          </Text>
          <Text
            style={[styles.txtmachine, { width: "60%", textAlign: "right" }]}
            numberOfLines={2}
          >
            <Text style={{ color: Colors.Black }}>₹</Text> {item?.item?.amount}
          </Text>
        </View>

        <View style={styles.productTpyeContainer}>
          <Text
            style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
          >
            Client Contact
          </Text>
          <Text
            onPress={() => {
              const phoneNumber = `tel:${item?.item?.queryDetails?.clientMobile}`;
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
            (+91) {item?.item?.queryDetails?.clientMobile}
          </Text>
        </View>

        <View style={styles.productTpyeContainer}>
          <Text
            style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
          >
            Driver Contact
          </Text>
          <Text
            onPress={() => {
              const phoneNumber = `tel:${item?.item?.contactDetails?.driverContact}`;
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
            (+91) {item?.item?.contactDetails?.driverContact}
          </Text>
        </View>

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
            <Text style={[styles.vanderLocationAddressTxt]} numberOfLines={1}>
              {item?.item?.queryDetails?.pickup?.location}
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
              {item?.item?.queryDetails?.drop?.location}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => toggleCollapse(item?.index)}
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
          {isCollapsed !== item.index ? (
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

        <Collapsible collapsed={isCollapsed !== item.index}>
          {/* tel: */}
          <View style={styles.driverDettalsContianer}>
            <View
              style={[styles.driverDettalsContianer, { marginTop: hp(-0.5) }]}
            >
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
                    {capitalizeFirstLetter(item?.item?.materialCategory)}
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
                    style={[styles.txtmachine, { textAlign: "right" }]}
                    numberOfLines={2}
                  >
                    {item?.item?.materialWeight} Ton
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
                    style={[styles.txtmachine, { textAlign: "right" }]}
                    numberOfLines={2}
                  >
                    {capitalizeFirstLetter(
                      item?.item?.queryDetails?.vehicleType
                    )}{" "}
                    Body
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
                    style={[styles.txtmachine, { textAlign: "right" }]}
                    numberOfLines={2}
                  >
                    {item?.item?.queryDetails?.truckLength} Ft
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
                      item?.item?.queryDetails?.materialDescription
                    )}
                  </Text>
                </View>
              </View>

              {/* PoD Button   */}

              {item?.item?.queryDetails?.LRApproval == "Approve" ? (
                <TouchableOpacity
                  disabled={
                    item?.item?.queryDetails?.LRApproval == "Approve"
                      ? true
                      : false
                  }
                  style={{
                    backgroundColor:
                      item?.item?.queryDetails?.LRApproval == "Approve"
                        ? Colors.gray878787
                        : Colors.btnColor,
                    padding: wp(2),
                    borderRadius: wp(1),
                    alignSelf: "center",
                    marginTop: hp(2),
                  }}
                  onPress={() => setModalVisiblee({ visible: true, item })}
                >
                  <Text
                    style={{
                      color: Colors.White,
                      fontFamily: Fonts.LATO_Regular600,
                      fontSize: hp(2),
                    }}
                  >
                    {"Upload LR"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.btnColor,
                    padding: wp(2),
                    borderRadius: wp(1),
                    alignSelf: "center",
                    marginTop: hp(2),
                  }}
                  onPress={() => setModalVisiblee({ visible: true, item })}
                >
                  <Text
                    style={{
                      color: Colors.White,
                      fontFamily: Fonts.LATO_Regular600,
                      fontSize: hp(2),
                    }}
                  >
                    {"Upload LR "}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Collapsible>
      </TouchableOpacity>
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
            Upload LR{" "}
          </Text>
          <Text
            style={{
              color: Colors.Black,
              textAlign: "right",
              fontSize: hp(2),
              fontWeight: "700",
              marginBottom: hp(1),
              width: "60%",
            }}
            numberOfLines={2}
          >
            Total Confirmed Truck & Driver No:
            <Text style={{ color: "red" }}> {filteredDat?.length} </Text>
          </Text>
        </View>
      </View>
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={filteredDat}
        renderItem={renderItem}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={isRefreshing}
        //     onRefresh={_getProfileData}
        //   />
        // }
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
              No data Found!
            </Text>
          </View>
        )}
      />

      <UploadLRModel
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        promodkaData={getQueryId}
        _getAllQueryquotation={_getAllQueryquotation}
      />
      <Text
        style={{
          alignSelf: "center",
          fontSize: hp(1.6),
          textAlign: "center",
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
        When Driver No & Truck No is done then need to Upload LR , & When LR
        will Approve By Admin then you will go to LR for Next.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.F7F7F7,
    padding: wp(4),
    borderRadius: wp(1),
    marginBottom: hp(1.5),
  },
  vanderTrackContianer: {
    flexDirection: "row",
    alignItems: "center",
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
  containerr: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.Black,
  },
  input: {
    width: "100%",
    padding: wp(2),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  header: {
    fontSize: hp(2.2),
    color: Colors.Black,
    fontWeight: "700",
  },
  picker: {
    backgroundColor: Colors.F7F7F7,
    borderRadius: wp(3),
    marginVertical: hp(1),
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: Colors[525252],
    color: "red",
  },
  productTpyeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: hp(0.5),
  },
  txtmachine: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(1.8),
  },
});
