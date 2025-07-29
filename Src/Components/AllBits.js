import {
  ActivityIndicator,
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
import moment from "moment";
import ScreensName from "../Utails/ScreensName";

// Truck List Modal START
export const TruckListModal = ({
  visible,
  truckNumbers,
  onSelect,
  onClose,
}) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onClose()}
        style={[styles.modalOverlay, { backgroundColor: "rgba(0,0,0,.5)" }]}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Truck Number </Text>
          {truckNumbers ? (
            <FlatList
              data={truckNumbers}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.truckItem}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <Text style={[styles.truckText, { color: Colors[525252] }]}>
                    {item}{" "}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: hp(2), color: Colors.Black }}>
                No Truck Found 🔍
              </Text>
              <Text
                onPress={() => navigation.navigate(ScreensName.ADDNEWTRUCK)}
                style={{
                  fontSize: hp(2.2),
                  marginTop: hp(2),
                  color: Colors.btnColor,
                  fontFamily: Fonts.LATO_BOLD700,
                }}
              >
                Add Truck
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
// Truck List Modal END

// modle calling for get Driver Details START
const AddDriverDetails = ({
  visible,
  onClose,
  promodkaData,
  _getAllQueryquotation,
}) => {
  const [input1, setInput1] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTruckNumber, setSelectedTruckNumber] = useState("");
  const [saveAllTruckList, setSaveAllTruckList] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    _getAllTrack();
  }, []);
  useEffect(() => {
    _getAllTrack();
  }, [saveAllTruckList]);
  const _getAllTrack = () => {
    let config = {
      url: ApiUrl.getAllTruckApi,
      method: "get",
    };
    APIRequest(
      config,
      (res) => {
        const approvedTrucks = res?.data?.filter(
          (truck) => truck.status === "approved"
        );
        const SavetruckNumbers = approvedTrucks.map(
          (truck) => truck.truckNumber
        );
        setSaveAllTruckList(SavetruckNumbers);
        // console.log('parmod.....',res?.data)
      },
      (err) => {
        if (err?.message) {
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };
  const handleSelectTruck = (truckNumber) => {
    setSelectedTruckNumber(truckNumber);
  };
  const truckNumbers = saveAllTruckList;
  const _getDriverDetials = () => {
    setLoading(true);
    let config = {
      url: `${ApiUrl.getDriverDetialsApi}`,
      method: "post",
      body: {
        driverContact: input1,
        truckNumber: selectedTruckNumber,
        quotationId: promodkaData?.item?._id,
      },
    };
    APIRequest(
      config,
      (res) => {
        if (res?.success == true) {
          onClose();
          setLoading(false);
          _getAllQueryquotation();
          setInput1("");
          setSelectedTruckNumber("");
          ToastModel({ type: "success", text2: res?.message });
        }
      },
      (err) => {
        setLoading(false);
        if (err?.message) {
          alert(err?.message);
        }
      }
    );
  };
  const _CloseMtData = () => {
    onClose();
    setInput1("");
    setSelectedTruckNumber("");
  };
  return (
    <View style={{ flex: 1 }}>
      <TruckListModal
        visible={modalVisible}
        truckNumbers={truckNumbers}
        onSelect={handleSelectTruck}
        onClose={() => setModalVisible(false)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => _CloseMtData()}
          style={[styles.modalOverlay, { backgroundColor: "rgba(0,0,0,.5)" }]}
        >
          {loading && (
            <ActivityIndicator
              color={Colors.btnColor}
              size="large"
              style={styles.loader}
            />
          )}
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { color: Colors.Black }]}>
              Enter Driver Information
            </Text>
            <Text
              style={{
                color: Colors[525252],
                fontFamily: Fonts.LATO_BOLD700,
                fontSize: hp(2),
                padding: wp(1),
              }}
            >
              Driver Mob No
            </Text>
            <TextInput
              placeholderTextColor={Colors.Black}
              style={[styles.input, { color: Colors.Black }]}
              placeholder="Enter Driver No"
              value={input1}
              maxLength={10}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setInput1(text);
              }}
            />
            <Text
              style={{
                color: Colors[525252],
                fontFamily: Fonts.LATO_BOLD700,
                fontSize: hp(2),
                padding: wp(1),
              }}
            >
              Select Truck
            </Text>
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
              onPress={() => setModalVisible(true)}
            >
              <Text
                style={{
                  color: Colors.Black,
                  fontFamily: Fonts.LATO_Regular600,
                  width: "80%",
                }}
                numberOfLines={1}
              >
                {selectedTruckNumber
                  ? selectedTruckNumber
                  : "No selected Truck No"}
              </Text>
              <VectorIcon
                type={"MaterialIcons"}
                name={"keyboard-arrow-up"}
                size={30}
                color={Colors.TxtColor}
              />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={input1.length == 10 ? false : true}
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      input1.length == 10 ? Colors.btnColor : Colors.gray878787,
                  },
                ]}
                onPress={_getDriverDetials}
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
export default function AllBits() {
  const navigation = useNavigation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [getAllQuotations, setGetAllQuotations] = useState([]);
  const [vendorID, setvendorID] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [savedData, setSavedData] = useState({ input1: "", input2: "" });
  const [modalVisiblee, setModalVisiblee] = useState(false);
  const [selectedTruckNumber, setSelectedTruckNumber] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const truckNumbers = selectedTruckNumber;
  const handleSave = (input1, input2) => {
    setSavedData({ input1, input2 });
  };
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };
  const handleSelectTruck = (truckNumber) => {
    setSelectedTruckNumber(truckNumber);
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
        if (err?.message) {
          setIsRefreshing(false);
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
        setLoading(false);
        if (err?.message) {
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };
  const filteredData = getAllQuotations
    .filter((item) => item?.vendorId === vendorID)
    .filter((item) => item?.status === "Confirmed")
    .filter((item) => item?.contactDetails === null);
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
  const renderItem = (item, index) => {
    return (
      <View style={styles.container}>
        <View style={styles.vanderTrackContianer}>
          <AddDriverDetails
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            promodkaData={item}
            onSave={handleSave}
            _getAllQueryquotation={_getAllQueryquotation}
          />
          <TruckListModal
            visible={modalVisiblee}
            truckNumbers={truckNumbers}
            onSelect={handleSelectTruck}
            onClose={() => setModalVisiblee(false)}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
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
            ></Text>
            <Text
              style={[
                styles.vanderTrackName,
                { color: Colors.Black, fontFamily: Fonts.LATO_BOLD700 },
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
          </View>
        </View>

        <View>
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
            {moment(item?.item?.createdAt).calendar()}
          </Text>
        </View>
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
            Client Mobile
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
                {capitalizeFirstLetter(item?.item?.materialCategory)}
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
                {item?.item?.materialWeight} Ton
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
                {capitalizeFirstLetter(item?.item?.queryDetails?.vehicleType)}{" "}
                Body
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

          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: Colors.btnColor,
                padding: wp(2),
                borderRadius: wp(1),
                alignSelf: "center",
                marginTop: hp(2),
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text
                style={{
                  color: Colors.White,
                  fontFamily: Fonts.LATO_Regular600,
                  fontSize: hp(2),
                }}
              >
                Add Driver No{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </Collapsible>
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
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: hp(2),
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
          Add Driver No & Truck{" "}
        </Text>
        <Text
          style={{
            color: Colors.Black,
            textAlign: "right",
            fontSize: hp(2),
            fontWeight: "700",
            marginBottom: hp(1),
          }}
        >
          Total Confirm Bits:
          <Text style={{ color: "red" }}>{filteredData?.length} </Text>
        </Text>
      </View>
      <FlatList
        scrollEnabled={false} // Important line!
        showsVerticalScrollIndicator={false}
        data={filteredData}
        keyExtractor={(item) => item?._id}
        renderItem={(item) => renderItem(item)}
        contentContainerStyle={{ paddingBottom: hp(0) }}
        ListFooterComponent={() => (
          <View style={{ marginBottom: hp(4) }}></View>
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
              No Bits Found!
            </Text>
          </View>
        )}
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
        When your Bid amount is Confirmed, then need to upload Driver No & Truck
        No ,
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
  vanderTrackInnerContianer: {
    width: wp(6),
    height: hp(3),
    marginRight: wp(3),
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

  // modle css
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

  // ##### truck
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  truckItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  truckText: {
    fontSize: 16,
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
  productTpye: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2),
  },
});
