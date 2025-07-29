import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { hp, wp } from "../../Utails/Responsive";
import Colors from "../../Utails/Colors";
import AppWapper from "../../Components/AppWapper";
import HeaderGoBack from "../../Components/HeaderGoBack";
import StatusBarr from "../../Components/StatusBarr";
import StringsName from "../../Utails/StringsName";
import Fonts from "../../Utails/Fonts";
import InputComp from "../../Components/InputComp";
import DropDown from "../../Components/DropDown";
import { useNavigation } from "@react-navigation/native";
import DocumentPicker from "react-native-document-picker";
import VectorIcon from "../../Utails/VectorIcon";
import ButtonComp from "../../Components/ButtonComp";
import { APIRequest, APIRequestWithFile, ApiUrl } from "../../Constants/apiurl";
import { ToastModel } from "../../Components/alert/ToastModel";
import { useDispatch } from "react-redux";
import { setTruckData } from "../../redux/Slice/LoginSlice";
import ScreensName from "../../Utails/ScreensName";
const AddNewTruck = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [truckNo, setTruckNo] = useState("");
  const [driverNo, setDriverNo] = useState("");
  const [getAllQuotations, setGetAllQuotations] = useState([]);
  const [truckLength, setTruckLength] = useState("");
  const [selectedVehicalBody, setSelectedVehicalBody] = useState("");
  const [rc, setRC] = useState("");
  const [allTruckLength, setAllTruckLength] = useState([]);
  const [filterSaveData, setSaveFilterData] = useState([]);

  const _pickRCDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setRC(res[0]);
      dispatch(setTruckData(res));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the picker");
      } else {
        console.error("DocumentPicker Error: ", err);
      }
    }
  };
  // _addTruck APi
  const _addTruck = () => {
    const fd = new FormData();
    fd.append("truckNumber", truckNo);
    fd.append("driverNumber", driverNo);
    fd.append("truckLength", truckLength?.name);
    fd.append("vehicleType", selectedVehicalBody);
    fd.append("rcPdf", {
      uri: rc?.uri,
      name: rc?.name,
      type: rc?.type,
    });
    // console.log('dataaaaaaaaa.a.a.aa.a..Add New Truck.',fd )
    let config = {
      url: ApiUrl.addTruckApi,
      method: "post",
      body: fd,
    };
    setLoading(true);
    APIRequestWithFile(
      config,
      (res) => {
        ToastModel({ type: "success", text2: res?.message });
        setLoading(false);
        navigation.navigate(ScreensName.HOME);

      },
      (err) => {
        setLoading(false);
        ToastModel({ type: "error", text2: err?.data?.message });
      }
    );
  };
  const onTruckLength = (item) => {
    setTruckLength(item);
    let removeFt = item?.name.replace("ft", "");
    const filtered = getAllQuotations.filter(
      (item) => item.truckLength == removeFt
    );
    setSaveFilterData(filtered);
  };
  useEffect(() => {
    _getAllTruckLenght();
    _getAllQueryquotation();
  }, []);
  const _getAllTruckLenght = () => {
    let config = {
      url: ApiUrl.getAllTruchLengthApi,
      method: "get",
    };
    APIRequest(
      config,
      (res) => {
        if (res?.data) {
          const formattedData = res?.data?.map((item, index) => ({
            id: index + 1,
            name: item?.trukLength,
            value: item?.value,
          }));
          setAllTruckLength(formattedData);
        }
      },
      (err) => {
        console.log("_getAllQuotation", err);
        if (err?.message) {
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };
  // Fetch All Quotations Data
  const _getAllQueryquotation = () => {
    setLoading(true);
    let config = {
      url: ApiUrl.getAllQuery,
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
  return (
    <AppWapper>
      {loading && (
        <ActivityIndicator
          color={Colors.btnColor}
          size="large"
          style={styles.loader}
        />
      )}
      <View style={styles.container}>
        <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
        <View style={styles.headerGoBackContianer}>
          <HeaderGoBack title={StringsName.truckNewAdd} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.innerContianer}
        >
          <View style={styles.inputContianer}>
            <Text style={styles.title}>
              {StringsName.truckNumber}{" "}
              <Text style={{ color: Colors.redF01919 }}>*</Text>
            </Text>
            <InputComp
              placeholder={StringsName.enterTruckNo}
              value={truckNo}
              onChangeText={(text) => {
                setTruckNo(text);
              }}
              inputStyleInner={{ textTransform: "uppercase" }}
            />
          </View>
          <View style={styles.inputContianer}>
            <Text style={styles.title}>
              {/* {StringsName.driverNumber}{" "} */}
              Driver Mob No
              <Text style={{ color: Colors.redF01919 }}>*</Text>
            </Text>
            <InputComp
              placeholder={StringsName.enterDrivingNo}
              maxLength={10}
              keyboardType={true}
              value={driverNo}
              onChangeText={(text) => {
                setDriverNo(text);
              }}
            />
          </View>

          <Text style={styles.title}>{StringsName.truchLenght}</Text>
          <DropDown
            btnContianerStyle={styles.dropDownContianer}
            ChooseOptions={StringsName.truchLenght}
            data={allTruckLength}
            value={truckLength}
            onSelected={onTruckLength}
          />
          {/* Vehicle Body Type START */}
          <View style={{ marginVertical: hp(3) }}>
            <Text style={styles.vehicleBodyType}>
              {StringsName.vehicleBodyType}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {["open"].map((item) => (
                <View key={item} style={[styles.vehicleBodyTypeContainer]}>
                  <TouchableOpacity
                    onPress={() => setSelectedVehicalBody(item)}
                    style={styles.outerCricleBtn}
                  >
                    {selectedVehicalBody == item && (
                      <View style={styles.innerCricleBtn} />
                    )}
                  </TouchableOpacity>
                  <Text
                    onPress={() => setSelectedVehicalBody(item)}
                    style={styles.vehicleBodyTxt}
                  >
                    {item}
                  </Text>
                </View>
              ))}
              <View style={{ marginHorizontal: wp(2) }} />
              {["close"].map((item) => (
                <View key={item} style={styles.vehicleBodyTypeContainer}>
                  <TouchableOpacity
                    onPress={() => setSelectedVehicalBody(item)}
                    style={styles.outerCricleBtn}
                  >
                    {selectedVehicalBody == item && (
                      <View style={styles.innerCricleBtn} />
                    )}
                  </TouchableOpacity>
                  <Text
                    onPress={() => setSelectedVehicalBody(item)}
                    style={styles.vehicleBodyTxt}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {/* Vehicle Body Type END */}
          {/* Upload RC Card Btn START here .. */}
          <TouchableOpacity
            style={styles.fileBtnContianer}
            onPress={_pickRCDocument}
          >
            <View style={{ flex: 1, height: hp(5) }}>
              {rc?.name ? (
                <Text
                  style={[styles.fileTxt, { width: "100%", flex: 1 }]}
                  numberOfLines={1}
                >
                  {rc?.name}
                </Text>
              ) : (
                <Text style={styles.fileTxt}>File: RC </Text>
              )}
              <Text
                style={[
                  styles.fileTxt,
                  {
                    color: Colors.gray878787,
                    fontSize: hp(1.8),
                    marginTop: hp(0.2),
                  },
                ]}
              >
                Size: 1.00 MB
              </Text>
            </View>
            <Text style={{ color: Colors.gray878787, fontSize: hp(1.3) }}>
              <Text style={{ color: Colors.Black }}></Text>JPEG, JPG, PNG
            </Text>
            <VectorIcon
              type={"Feather"}
              name={"more-vertical"}
              color={Colors.Black}
              size={20}
            />
          </TouchableOpacity>
          {/* Upload RC Card Btn END here .. */}

          <View style={styles.infoContainer}>
            <VectorIcon
              type={"Feather"}
              name={"info"}
              color={Colors.Black}
              size={25}
            />
            <Text style={styles.infoTxt}>
              The name on the RC must match the company name.
            </Text>
          </View>

          {/* button START */}
          <View style={styles.btnContianer}>
            <ButtonComp
              disabled={
                truckNo && driverNo && truckLength && selectedVehicalBody && rc
                  ? false
                  : true
              }
              onPress={() => {
                _addTruck();
                setDriverNo("");
                setTruckNo("");
                setTruckLength("");
                setSelectedVehicalBody("");
                setRC("");
              }}
              title={'Add Truck'}
              // title={StringsName.send}
              containerStyle={{
                width: "60%",
                alignSelf: "center",
                backgroundColor:
                  truckNo &&
                  driverNo &&
                  truckLength &&
                  selectedVehicalBody &&
                  rc
                    ? Colors.btnColor
                    : Colors.lightGray,
              }}
            />
          </View>
          {/* button END */}
        </ScrollView>
      </View>
    </AppWapper>
  );
};

export default AddNewTruck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
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
  innerContianer: {
    paddingHorizontal: wp(4),
  },
  inputContianer: {
    marginVertical: hp(1),
  },
  title: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.2),
    marginVertical: hp(1),
  },
  vehicleBodyType: {
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.1),
    color: Colors.TxtColor,
    marginLeft: hp(0.5),
    marginBottom: hp(1),
  },

  vehicleBodyTypeContainer: { flexDirection: "row", alignItems: "center" },
  outerCricleBtn: {
    borderWidth: wp(0.33),
    borderColor: Colors[525252],
    width: wp(6),
    height: wp(6),
    borderRadius: wp(6),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(1),
  },
  innerCricleBtn: {
    width: wp(4.5),
    height: wp(4.5),
    borderRadius: wp(4.5),
    backgroundColor: Colors.btnColor,
  },
  vehicleBodyTxt: {
    color: Colors.textcolor1C274C,
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(2.2),
  },
  btnNxtContianer: {
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    bottom: wp(6),
    borderRadius: wp(1.5),
  },
  fileBtnContianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(1.5),
    alignItems: "center",
  },
  fileTxt: {
    color: Colors.Black,
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(2),
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
    marginVertical: hp(4),
  },
  infoTxt: {
    color: Colors.Black,
    width: "90%",
    marginLeft: wp(2),
    fontSize: hp(2),
    lineHeight: hp(2),
    fontFamily: Fonts.LATO_Regular600,
  },
  btnContianer: { marginTop: hp(10), marginBottom: hp(5) },
});
