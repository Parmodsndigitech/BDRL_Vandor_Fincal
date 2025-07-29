import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  RefreshControl,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Utails/Colors";
import Fonts from "../Utails/Fonts";
import { hp, wp } from "../Utails/Responsive";
import GetAdvancePaymentModal from "./GetAdvancePaymentModal";
import { APIRequest, ApiUrl } from "../Constants/apiurl";
import { ToastModel } from "./alert/ToastModel";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import VectorIcon from "../Utails/VectorIcon";
import DocumentPicker from "react-native-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
// modle calling for get UploadPODModel Details
const UploadPODModel = ({ visible, onClose, promodkaData }) => {
  const [loading, setLoading] = useState(false);
  const [uploadLR, setUploadLR] = useState("");
  const [podUnLoadingCharge, setPodUnLoadingCharge] = useState(0);
  const [podDentationCharge, setPodDentationCharge] = useState(0);
  const [podOtherCharge, setPodOtherCharge] = useState(0);
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
  // upload LR APi
  const _uploadLR = async () => {
    const fd = new FormData();
    fd.append("queryId", promodkaData?.queryDetails?._id);
    fd.append("unloadingCharge", podUnLoadingCharge);
    fd.append("dentationCharge", podDentationCharge);
    fd.append("otherCharge", podOtherCharge);
    fd.append("uploadPOD", {
      uri: uploadLR?.uri,
      name: uploadLR?.name,
      type: uploadLR?.type,
    });
    let token = await AsyncStorage.getItem("token").catch((err) =>
      console.log(err)
    );
    try {
      setLoading(true);
      const response = await fetch(ApiUrl.uploadPodApi, {
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
      // console.log('datataa Pod ..Pamrod.', result)
      if (result?.success == true) {
        onClose();
        ToastModel({ type: "success", text2: result?.message });
      }
      setLoading(false);
      setUploadLR("");
    } catch (error) {
      setLoading(false);
      console.error(error);
      ToastModel({ type: "error", text2: result?.message });
    }
  };
  const _CloseMtData = () => {
    onClose();
    setUploadLR("");
    setPodUnLoadingCharge("");
    setPodDentationCharge("");
    setPodOtherCharge("");
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
          onPress={() => _CloseMtData()}
          activeOpacity={1}
          style={[styles.modalOverlay, {}]}
        >
          {loading && (
            <ActivityIndicator
              color={Colors.btnColor}
              size="large"
              style={styles.loader}
            />
          )}
          <View style={styles.modalContent}>
            <View style={{ marginBottom: hp(1), alignItems: "center" }}>
              <VectorIcon
                type={"Entypo"}
                name={"upload-to-cloud"}
                size={50}
                color={Colors.btnColor}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
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
                {uploadLR?.name ? uploadLR?.name : "No Uploaded POD"}
              </Text>
              <VectorIcon
                type={"Entypo"}
                name={"upload"}
                size={25}
                color={Colors.btnColor}
              />
            </TouchableOpacity>

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
              UnLoading Charges
            </Text>

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
                  setPodUnLoadingCharge(filteredText);
                }}
                value={podUnLoadingCharge}
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
              Dentation Charges
            </Text>

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
                  setPodDentationCharge(filteredText);
                }}
                value={podDentationCharge}
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
              Other Charges
            </Text>

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
                  setPodOtherCharge(filteredText);
                }}
                value={podOtherCharge}
              />
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
const ApproveLR = () => {
  const navigation = useNavigation();
  const [getAllQuotations, setGetAllQuotations] = useState([]);
  const [vendorID, setvendorID] = useState("");
  const [loading, setLoading] = useState(true);
  // for payment Modle useState
  const [
    modalVisibleGetAdvancePaymentModal,
    setmodalVisibleGetAdvancePaymentModal,
  ] = useState(false);
  const [modalVisibleGetPODModal, setmodalVisibleGetPODModal] = useState(false);
  const [getQueryId, setQueryId] = useState();
  const [getQueryIdPOD, setQueryIdPOD] = useState();
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
  const filteredDataPODAndAdvance = getAllQuotations
    .filter((item) => item?.vendorId == vendorID)
    .filter(
      (item) =>
        item?.contactDetails &&
        item.queryDetails &&
        item?.queryDetails?.LRApproval === "Approve" &&
        item?.advancesDetails === null
    );

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      _getProfileData();
      _getAllQueryquotation();
      setIsRefreshing(false);
    }, 200);
  };
  // page reload for updated data calling focuse Api
  const setModalVisibleee = (data) => {
    const { item } = data;
    setmodalVisibleGetAdvancePaymentModal(true);
    setQueryId(item);
  };

  const setModalVisibleeePOD = (data) => {
    const { item } = data;
    setmodalVisibleGetPODModal(true);
    setQueryIdPOD(item);
  };
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
  const renderItem = ({ item }) => {
    return (
      <View key={item?.vendorID} style={styles.container}>
        <View style={styles.flexContainer}>
          <Text style={[styles.title, { color: Colors.Black }]}>queryId :</Text>
          <Text
            style={[
              styles.title,
              {
                color: Colors.Black,
                fontSize: hp(1.8),
                padding: wp(1),
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
                padding: wp(1),
                borderRadius: wp(0.5),
                fontFamily: Fonts.LATO_BOLD700,
              },
            ]}
          >
            {capitalizeFirstLetter(item?.queryDetails?.branchName)}
          </Text>
        </View>
        <View style={styles.flexContainer}>
          <Text style={[styles.title, { color: Colors.Black }]}>Confirm Budget :</Text>
          <Text
            style={[
              styles.title,
              {
                color: Colors.Black,
                fontSize: hp(1.8),
                paddingVertical: wp(1),

                borderRadius: wp(0.5),
                fontFamily: Fonts.LATO_BOLD700,
              },
            ]}
          >
            <Text style={{ color: Colors.Black }}>₹</Text> {item?.amount}
          </Text>
        </View>

        <View style={styles.flexContainer}>
          <Text style={[styles.title, { color: Colors.Black }]}>
            Loading Charge :
          </Text>
          <Text
            style={[
              styles.title,
              {
                color: Colors.Black,
                fontSize: hp(1.8),
                paddingVertical: wp(1),

                borderRadius: wp(0.5),
                fontFamily: Fonts.LATO_BOLD700,
              },
            ]}
          >
            <Text style={{ color: Colors.Black }}>₹</Text>{" "}
            {item?.queryDetails?.loadingCharge}
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
                paddingVertical: wp(1),
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
                paddingVertical: wp(1),
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
                paddingVertical: wp(1),

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
            LR States :
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
            {capitalizeFirstLetter(item?.queryDetails?.LRApproval)}
          </Text>
        </View>
        {item?.queryDetails?.PODApproval == "" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                styles.vanderTrackName,
                {
                  color: Colors.Black,
                  fontFamily: Fonts.LATO_BOLD700,
                  marginLeft: wp(2),
                },
              ]}
            >
              {" "}
              POD Approval{" "}
            </Text>
            <Text
              style={[
                styles.vanderTrackName,
                {
                  color: "red",
                  fontFamily: Fonts.LATO_BOLD700,
                  textAlign: "right",
                  marginRight: wp(2),
                },
              ]}
            >
              {capitalizeFirstLetter(
                item?.queryDetails?.LRApproval &&
                  item?.queryDetails?.PODApproval
              )}
            </Text>
          </View>
        )}

        <View style={styles.flexContainer}>
          <Text style={[styles.title, { color: Colors.Black }]}>
            View LR here :
          </Text>
          <TouchableOpacity
            style={{
              padding: wp(1),
              borderRadius: wp(0.5),
            }}
            onPress={() => Linking.openURL(`${item?.queryDetails?.imageLR}`)}
          >
            <Text
              style={{
                color: "red",
                fontFamily: Fonts.LATO_BOLD700,
                fontSize: hp(1.8),
              }}
            >
              View LR
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
        {/* modle Work Payment And Upload POD  */}
        <View style={{}}>
          <View style={{ alignSelf: "center" }}>
            {item?.queryDetails?.LRApproval == "Approve" ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  backgroundColor: Colors.btnColor,
                  padding: wp(2),
                  borderRadius: wp(1),
                  alignSelf: "center",
                  marginTop: hp(2),
                }}
                onPress={() => setModalVisibleee({ visible: true, item })}
              >
                <Text
                  style={{
                    color: Colors.White,
                    fontFamily: Fonts.LATO_Regular600,
                    fontSize: hp(2),
                    textAlign: "center",
                  }}
                  numberOfLines={1}
                >
                  {"Get Advance Payment"}
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: Colors.btnColor,
                    padding: wp(2),
                    borderRadius: wp(1),
                    alignSelf: "center",
                    marginTop: hp(2),
                  }}
                  onPress={() => setModalVisibleeePOD({ visible: true, item })}
                >
                  <Text
                    style={{
                      color: Colors.White,
                      fontFamily: Fonts.LATO_Regular600,
                      fontSize: hp(2),
                      textAlign: "center",
                    }}
                    numberOfLines={1}
                  >
                    {"Upload POD"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
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
            width: "40%",
            textAlign: "left",
          }}
          numberOfLines={2}
        >
          Advance Payment{" "}
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
          Total Approved LR No:{""}
          <Text style={{ color: "red" }}>
            {filteredDataPODAndAdvance?.length}{" "}
          </Text>
        </Text>
      </View>
      <FlatList
        scrollEnabled={false}
        data={filteredDataPODAndAdvance}
        keyExtractor={(item) => item._id}
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
              No ApprovedLR's Found!
            </Text>
          </View>
        )}
      />
      <UploadPODModel
        visible={modalVisibleGetPODModal}
        onClose={() => setmodalVisibleGetPODModal(false)}
        promodkaData={getQueryIdPOD}
      />
      <GetAdvancePaymentModal
        modalVisible={modalVisibleGetAdvancePaymentModal}
        setModalVisible={setmodalVisibleGetAdvancePaymentModal}
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
        When the LR (Load Receipt) is approved, you become eligible to receive
        an advance payment. After that, once the products reach the destination,
        you need to upload the POD (Proof of Delivery) to receive the remaining
        balance.
      </Text>
    </ScrollView>
  );
};
export default ApproveLR;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabColor,
    padding: wp(4),
    borderRadius: wp(1.5),
    marginVertical: hp(1),
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
    // marginVertical: hp(.2),
  },
  title: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(1.8),
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

  vanderLocationAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(0.5),
    marginLeft: wp(0.5),
  },
  vanderLocationAddressTxt: {
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(1.8),
    color: Colors.textcolor1C274C,
    marginLeft: wp(2),
    width: "90%",
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
});
