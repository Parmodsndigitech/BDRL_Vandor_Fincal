import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../Utails/Colors";
import Fonts from "../../Utails/Fonts";
import { hp, wp } from "../../Utails/Responsive";
import AppWapper from "../../Components/AppWapper";
import StatusBarr from "../../Components/StatusBarr";
import HeaderGoBack from "../../Components/HeaderGoBack";
import StringsName from "../../Utails/StringsName";
import Collapsible from "react-native-collapsible";
import { ToastModel } from "../../Components/alert/ToastModel";
import DocumentPicker from "react-native-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiUrl } from "../../Constants/apiurl";
import NeedHelpModel from "../../Components/NeedHelpModel";

const PodScreen = ({ route }) => {
  const navigation = useNavigation();
  const [isUploadCollapsed, setUploadCollapsed] = useState(true);
  const [uploadLR, setUploadLR] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadPOD, setUploadPOD] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  let { data } = route?.params;
  // console.log('datamvldmvlkdfmvldfnvfdlk', data?.item?.queryId?._id)
  const uploadToggleCollapse = () => {
    if (uploadPOD && uploadLR) {
      if (uploadPOD) {
        _uploadPOD();
        // console.log('Function data..uploadPOD.', uploadPOD)
      }
      if (uploadLR) {
        _uploadLR();
        // console.log('Function data..uploadLR.', uploadLR)
        // setUploadCollapsed(isUploadCollapsed);
      }
    } else {
      setUploadCollapsed(!isUploadCollapsed);
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
  const _pickPodDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // console.log('data is here...',res[0]?.name)
      setUploadPOD(res[0]);
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
    // console.log('dataaaaaaaaa.a.a.aa.a.. Register Page fd...', fd)
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
      // console.log('data is hree...', result)
      setTimeout(() => {
        ToastModel({ type: "success", text2: result?.message });
      }, 500);
      setLoading(false);
    } catch (error) {
      console.error(error);
      ToastModel({ type: "error", text2: result?.message });
    }
  };

  const _uploadPOD = async () => {
    const fd = new FormData();
    fd.append("queryId", data?.item?.queryId?._id);
    fd.append("uploadPOD", {
      uri: uploadPOD?.uri,
      name: uploadPOD?.name,
      type: uploadPOD?.type,
    });
    // console.log('dataaaaaaaaa.a.a.aa.a.. Register Page fd...', fd)
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
      // console.log('data is hree...', result)
      setTimeout(() => {
        ToastModel({ type: "success", text2: result?.message });
      }, 2000);
      setLoading(false);
    } catch (error) {
      console.error(error);
      ToastModel({ type: "error", text2: result?.message });
    }
  };
  useEffect(() => {
    if (uploadLR && uploadPOD) setUploadCollapsed(isUploadCollapsed);
  });
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
        <HeaderGoBack title={StringsName.pod} />
      </View>
      <View style={{ flex: 1, backgroundColor: Colors.White }}>
        <View
          style={[
            styles.outerContianer,
            { marginHorizontal: wp(4), marginVertical: hp(2) },
          ]}
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
            <Text style={styles.vanderLocationAddressTxt} numberOfLines={1}>
              {data?.item?.queryId?.pickup?.location}
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
            <Text style={styles.vanderLocationAddressTxt} numberOfLines={1}>
              {data?.item?.queryId?.drop?.location}
            </Text>
          </View>
          <Text style={styles.delveryDate}>
            30 Jul 2024 {" | "} 6.5 Ton {" | "} {data?.item?.status}
          </Text>

          <Text style={styles.posStaus}>
            POD Pending <Text>2 Days</Text>
          </Text>
          <View style={styles.flexContainer}>
            <Text style={[styles.title, { fontSize: hp(2) }]}>Payments</Text>
          </View>
          <View style={styles.flexContainer}>
            <Text style={styles.title}>Advance Payment</Text>
            <Text
              style={[
                styles.title,
                { color: Colors.gray878787, fontSize: hp(1.7) },
              ]}
            >
              ₹ 300
            </Text>
          </View>
          <View style={styles.flexContainer}>
            <Text style={styles.title}>Balance Payment</Text>
            <Text
              style={[
                styles.title,
                { color: Colors.gray878787, fontSize: hp(1.7) },
              ]}
            >
              ₹ 900
            </Text>
          </View>
        </View>

        {/* <Button title="lndflvfd" onPress={()=>_uploadLR()}/> */}
        <View style={styles.uploadBtnBrowerConainer}>
          <Collapsible collapsed={isUploadCollapsed}>
            <Text
              onPress={() => _pickLRDoc()}
              style={[
                styles.uploadBtnBrower,
                { backgroundColor: uploadLR ? "green" : Colors.lightGray },
              ]}
            >
              {uploadLR ? "Upload LR Done" : "Upload LR"}
            </Text>
            <Text
              onPress={() => _pickPodDoc()}
              style={[
                styles.uploadBtnBrower,
                { backgroundColor: uploadPOD ? "green" : Colors.lightGray },
              ]}
            >
              {uploadPOD ? "Upload POD Done" : "Upload POD"}
            </Text>
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
            {uploadLR && uploadPOD ? null : <Text style={styles.add}>+</Text>}
            <Text style={{ marginHorizontal: wp(1) }} />
            <Text style={[styles.btnTitle, { color: Colors.White }]}>
              {/* {StringsName.ulpoad} */}
              {uploadLR && uploadPOD ? (
                <Text style={{ fontSize: hp(2.3), letterSpacing: wp(0.5) }}>
                  {"Submit"}
                </Text>
              ) : (
                "Upload"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppWapper>
  );
};

export default PodScreen;

const styles = StyleSheet.create({
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
    paddingHorizontal: wp(4),
    backgroundColor: Colors.tabColor,
    paddingVertical: hp(2),
    borderRadius: wp(1.5),
  },
  container: {
    backgroundColor: Colors.tabColor,
    padding: wp(4),
    borderRadius: wp(1.5),
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
    marginHorizontal: wp(2),
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
    width: "43%",
  },
  uploadBtnBrower: {
    backgroundColor: Colors.lightGray,
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
