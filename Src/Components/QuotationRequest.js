// packages
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
// Utails
import Colors from "../Utails/Colors";
import { hp, wp } from "../Utails/Responsive";
import StringsName from "../Utails/StringsName";
import ScreensName from "../Utails/ScreensName";
import Fonts from "../Utails/Fonts";
// components
import DropDown from "./DropDown";
import ButtonComp from "./ButtonComp";
import { ToastModel } from "./alert/ToastModel";
import { APIRequest, ApiUrl } from "../Constants/apiurl";
export default function QuotationRequest() {
  const navigation = useNavigation();
  const [truckLength, setTruckLength] = useState("");
  const [allTruckLength, setAllTruckLength] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getAllQuotations, setGetAllQuotations] = useState([]);
  const [filterSaveData, setSaveFilterData] = useState([]);
  const onTruckLength = (item) => {
    setTruckLength(item);
    let removeFt = item?.name.replace("ft", "");
    const filtered = getAllQuotations.filter(
      (item) => item.truckLength == removeFt
    );
    setSaveFilterData(filtered);
  };
  // const filteredData = getAllQuotations.filter(
  //   // (item) => item.truckLength == truckLength?.value
   
  //   (item) => 
  //     item.truckLength == truckLength?.names
  //    && 
  //    item.status === "Open",
  //   // console.log()
  // );

  // console.log(';;;;;;;........',getAllQuotations[0]?.truckLength)
  // console.log(';;;;;;;........',filterSaveData)

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
        // console.log("_getAllQuotation", err);
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
        // console.log('dataaa......',re)
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
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          color={Colors.btnColor}
          size="large"
          style={styles.loader}
        />
      )}
      <View style={styles.viewAllContinaer}>
        <Text style={styles.quotationRequest}>
          {StringsName.quotationRequest}
        </Text>
      </View>
      <Text
        onPress={() => {
          Alert.alert("kkk");
        }}
        style={styles.truchLenght}
      >
        {StringsName.truchLenght}
      </Text>
      <DropDown
        btnContianerStyle={styles.dropDownContianer}
        ChooseOptions={StringsName.truchLenght}
        data={allTruckLength}
        value={truckLength}
        onSelected={onTruckLength}
      />
      <ButtonComp
        disabled={!truckLength ? true : false}
        title={StringsName.search}
        containerStyle={{
          backgroundColor: !truckLength
            ? "rgba(118, 118, 122, 0.5)"
            : Colors.btnColor,
        }}
        onPress={() => {
          setLoading(true);
          setTimeout(() => {
            navigation.navigate(ScreensName.QUOTATIONSEARCH, {
              // filterSaveData: filteredData,
              filterSaveData: filterSaveData,
            });
            setLoading(false);
          }, 2000);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabColor,
    padding: wp(4),
    borderRadius: wp(1.5),
  },
  viewAllContinaer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quotationRequest: {
    color: Colors.TxtColor,
    fontSize: hp(2.2),
    fontFamily: Fonts.LATO_BOLD700,
  },
  btnViewAll: {
    color: Colors.btnColor,
    fontSize: hp(2.1),
    fontFamily: Fonts.LATO_BOLD700,
  },
  truchLenght: {
    color: Colors.gray878787,
    marginVertical: hp(1.5),
    fontSize: hp(2.1),
    fontFamily: Fonts.LATO_BOLD700,
  },
  dropDownContianer: {
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
    paddingTop: hp(2.5),
  },
});
