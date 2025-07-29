import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Collapsible from "react-native-collapsible";
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
import DocumentPicker from "react-native-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastModel } from "../../Components/alert/ToastModel";
import { ApiUrl } from "../../Constants/apiurl";
import { useNavigation } from "@react-navigation/native";
import ScreensName from "../../Utails/ScreensName";

export default function TransitOrderScreen({ route }) {
  const navigation = useNavigation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isUploadCollapsed, setUploadCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadLR, setUploadLR] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadPOD, setUploadPOD] = useState("");
  let { data } = route?.params;
  // console.log('data is parod ',data)
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const uploadToggleCollapse = () => {
    // if (uploadPOD && uploadLR) {
    //   if (uploadPOD) {
    //     _uploadPOD();
    //   }
    //   if (uploadLR) {
    //     _uploadLR();
    //   }
    // } else {
    setUploadCollapsed(!isUploadCollapsed);
    // }
  };

  // Uploade LR Stating here...
  const _uploadLRFun = () => {
    if (!uploadLR) {
      _pickLRDoc();
    } else {
      _uploadLR();
    }
  };
  const _pickLRDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
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
    fd.append("queryId", data?.item?.queryId?._id);
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
      if (result?.success == true) {
        // navigation.navigate(ScreensName.APPROVAL, { dataLR: result });
        // navigation.navigate(ScreensName.INVOICESCREEN ,{ dataLR: result })
        // <Invoice />
        // console.log('data is hreee..', result)
      }
      // setTimeout(() => {
      // console.log('data for LR', result)
      ToastModel({ type: "success", text2: result?.message });
      // }, 500);

      setLoading(false);
      // _collapsedCls();
      setUploadLR("");
    } catch (error) {
      console.error(error);
      ToastModel({ type: "error", text2: result?.message });
    }
  };
  // Uploade LR Ending hree...

  // ######################## POD Part START ############
  const _uploadPODFun = () => {
    if (!uploadPOD) {
      _pickPodDoc();
    } else {
      _uploadPOD();
    }
  };
  const _pickPodDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setUploadPOD(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the picker");
      } else {
        console.error("DocumentPicker Error: ", err);
      }
    }
  };
  // upload POD APi
  const _uploadPOD = async () => {
    const fd = new FormData();
    fd.append("queryId", data?.item?.queryId?._id);
    fd.append("uploadPOD", {
      uri: uploadPOD?.uri,
      name: uploadPOD?.name,
      type: uploadPOD?.type,
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
      if (result?.success == true) {
        navigation.navigate(ScreensName.APPROVAL, { dataPOD: result });
      }
      // setTimeout(() => {
      ToastModel({ type: "success", text2: result?.message });
      // }, 2000);
      setLoading(false);
      // _collapsedCls();
      setUploadPOD("");
    } catch (error) {
      console.error(error);
      ToastModel({ type: "error", text2: result?.message });
    }
  };
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  // ######################## POD Part END ############
  return (
    <AppWapper>
      {loading && (
        <ActivityIndicator
          color={Colors.btnColor}
          size="large"
          style={styles.loader}
        />
      )}
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.headerGoBackContianer}>
        <HeaderGoBack />
      </View>
      <View style={styles.outerContianer}>
        <View style={styles.container}>
          <View style={styles.vanderLocationAddress}>
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
            <Text style={styles.vanderLocationAddressTxt} numberOfLines={1}>
              {capitalizeFirstLetter(data?.item?.queryId?.pickup?.location)}
            </Text>
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
              style={{
                fontFamily: Fonts.LATO_BOLD700,
                color: Colors.green029C0D,
              }}
            >
              {" "}
              Drop:
            </Text>
            <Text style={styles.vanderLocationAddressTxt} numberOfLines={1}>
              {capitalizeFirstLetter(data?.item?.queryId?.drop?.location)}
            </Text>
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
              {/*  add patymen Method End  */}
            </View>
          </Collapsible>
        </View>
        <View style={styles.uploadBtnBrowerConainer}>
          <Collapsible collapsed={isUploadCollapsed}>
            {uploadLR ? (
              <TouchableOpacity
                onPress={() => _uploadLRFun()}
                style={{
                  backgroundColor: Colors.green029C0D,
                  borderRadius: wp(2),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  paddingHorizontal: wp(5),
                  paddingVertical: hp(0.6),
                }}
              >
                <VectorIcon
                  type={"MaterialCommunityIcons"}
                  name={"arrow-right-bold-hexagon-outline"}
                  size={30}
                  color={Colors.White}
                />
                <Text
                  style={{
                    color: Colors.White,
                    fontSize: hp(2.3),
                    fontFamily: Fonts.LATO_BOLD700,
                  }}
                >
                  GO TO
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                onPress={() => _uploadLRFun()}
                style={[
                  styles.uploadBtnBrower,
                  { backgroundColor: uploadLR ? "green" : Colors.lightGray },
                ]}
              >
                {uploadLR ? "Upload LR Done" : "Upload LR"}
              </Text>
            )}
            {uploadPOD ? (
              <TouchableOpacity
                onPress={() => _uploadPODFun()}
                style={{
                  backgroundColor: Colors.green029C0D,
                  borderRadius: wp(2),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  paddingHorizontal: wp(5),
                  paddingVertical: hp(0.6),
                }}
              >
                <VectorIcon
                  type={"MaterialCommunityIcons"}
                  name={"arrow-right-bold-hexagon-outline"}
                  size={30}
                  color={Colors.White}
                />
                <Text
                  style={{
                    color: Colors.White,
                    fontSize: hp(2.3),
                    fontFamily: Fonts.LATO_BOLD700,
                  }}
                >
                  GO TO
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                onPress={() => _uploadPODFun()}
                style={[
                  styles.uploadBtnBrower,
                  { backgroundColor: uploadPOD ? "green" : Colors.lightGray },
                ]}
              >
                {uploadPOD ? "Upload POD Done" : "Upload POD"}
              </Text>
            )}
          </Collapsible>
        </View>
        <View style={styles.btnContianer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleModal()}
            style={styles.btn}
          >
            <Text style={styles.btnTitle}>{StringsName.help}</Text>
          </TouchableOpacity>
          <NeedHelpModel
            modalVisible={modalVisible}
            toggleModal={toggleModal}
          />
          <TouchableOpacity
            onPress={uploadToggleCollapse}
            activeOpacity={0.8}
            style={[styles.btn, styles.btnUpload]}
          >
            <Text style={styles.add}>+</Text>
            <Text style={{ marginHorizontal: wp(1) }} />
            <Text style={[styles.btnTitle, { color: Colors.White }]}>
              {StringsName.ulpoad}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            alignSelf: "center",
            fontSize: hp(1.6),
            textAlign: "center",
            color: Colors[525252],
            fontFamily: Fonts.LATO_BOLD700,
            width: "90%",
          }}
        >
          <Text style={{ color: Colors.redF01919, fontSize: hp(1.8) }}>
            Note:{" "}
          </Text>
          When the Loods are loaded, the LR (Lorry Receipt) needs to be
          uploaded, and when the Loods are delivered, the POD (Proof of
          Delivery) needs to be uploaded.
        </Text>
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
});
