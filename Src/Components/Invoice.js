import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { APIRequest, ApiUrl } from "../Constants/apiurl";
import { hp, wp } from "../Utails/Responsive";
import { ToastModel } from "./alert/ToastModel";
import Colors from "../Utails/Colors";
import Fonts from "../Utails/Fonts";
import moment from "moment";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import RNFetchBlob from "rn-fetch-blob";
import ImagePath from "../Utails/ImagePath";
import FastImage from "react-native-fast-image";
import VectorIcon from "../Utails/VectorIcon";
import Collapsible from "react-native-collapsible";


const Invoice = () => {
  const navigation = useNavigation();
  const [getAllQuotations, setGetAllQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendorID, setvendorID] = useState("");
  const [dottedLoader, setDottedLoader] = useState(false);
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
    let config = {
      url: ApiUrl.getDetailsApi,
      method: "get",
    };
    await APIRequest(
      config,
      (res) => {
        // Set vendor ID for filtering
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

  const _getInvoice = async (dataItem) => {
    const { item } = dataItem;
    if (item?.queryId) {
      let config = {
        url: `${ApiUrl.generateInvoiceApi}`,
        // url: 'https://api.bhadaapp.com/api/generate/invoice',
        method: "post",
        body: {
          queryId: item?.queryId,
          role: "vendor",
        },
      };
      // setLoading(true);
      setDottedLoader(true);
      await APIRequest(
        config,
        (res) => {
          ToastModel({ type: "success", text2: res?.message });
          // downloadPdf();
          // setLoading(false);
          setDottedLoader(false);
          if (res?.data) {
            // Alert.alert('BDRL-Invoice download', 'BDRL-Invoice.pdf ', [
            //   {
            //     text: 'Cancel',
            //     onPress: () => console.log('Cancel Pressed'),
            //     style: 'cancel',
            //   },
            //   {text: 'OK', onPress: () =>
            downloadPdf(res?.data);
            //     },
            //   ]);
            // setLoading(false)
          }
        },

        (err) => {
          console.log(err?.message, "---err");
          setLoading(false);
          if (err?.message) {
            ToastModel({ type: "error", text2: err?.message });
          }
        }
      );
    } else {
      ToastModel({ type: "error", text2: "Something went wrong" });
    }
  };
  const downloadPdf = async (pdfHere) => {
    // console.log('pppppppppppp',pdfHere)
    setLoading(true);
    const { config, fs } = RNFetchBlob;
    const download = fs.dirs?.DownloadDir;

    // Check if the pdf URL is available
    if (!pdfHere) {
      alert("No PDF link available.");
      setLoading(false);
      return;
    }
    const filename = `BDRL-Invoice${Math.random()
      .toString(36)
      .substring(7)}.pdf`;
    const path = download + "/" + filename;
    const filePath = "file://" + path; // Add file:// to the path
    try {
      const res = await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: download + "/" + `BDRL-Invoice${Math.random()}` + ".pdf", // Save file with random name
          description: "Downloading PDF...",
        },
      }).fetch("GET", pdfHere);
      // console.log("File downloaded to:", res.path());
      alert("PDF Downloaded Successfully!");
    } catch (e) {
      console.log("Download error:", e);
      alert("Error downloading PDF.");
    } finally {
      setLoading(false);
    }
  };

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
      <View style={[styles.container,{
        marginHorizontal:wp(4),
          paddingVertical:isCollapsed==true? wp(2) :wp(4)
      }]}>
        <TouchableOpacity activeOpacity={.8} onPress={toggleExpanded} style={[styles.header,{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',}]}>
                  {/* {isCollapsed ? 'Show Details' : 'Hide Details'} */}
                  <Text
                      style={{
                        fontSize: hp(2),
                        color: Colors.Black,
                        fontFamily: Fonts.LATO_BOLD700,
                        padding:0
                      }}
                    >
                      {" "}
                      Invoice
                    </Text>
        
                  <VectorIcon
                      type={"MaterialIcons"}
                      name={isCollapsed?"keyboard-arrow-down":"keyboard-arrow-up"}
                      size={40}
                      color={Colors.TxtColor}
                    />
              </TouchableOpacity>
              {/* <Text  onPress={toggleExpanded} style={[styles.textQ, styles.textA, { color: Colors.Black,fontSize: hp(2),padding:0 ,position:'relative',top:hp(-1)}]}>
              {" "}
              QueryId: {item?.queryDetails?.queryId}
            </Text> */}
      




        <View style={{width:'100%'}}>
      <Collapsible collapsed={isCollapsed} style={{}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:hp(2),borderBottomWidth:.5,paddingBottom:hp(1),borderColor:'rgba(0,0,0,0.3)'}}>
      <Text style={[styles.textQ, styles.textA, { color: Colors.Black,fontSize: hp(2),}]}>
              {" "}
              QueryId:
            </Text>
            <Text style={[styles.textQ, styles.textA, { color: Colors.Black,fontSize: hp(2),}]}>
              {" "}
           {item?.queryDetails?.queryId}
            </Text>
      </View>
    
      <View style={{ alignSelf: "flex-start" }}>
          <Text
            style={[
              styles.modalTitle,
              {
                fontSize: hp(1.9),
                backgroundColor: Colors.tabColor,
                padding: wp(1),
                borderRadius: wp(0.5),
                fontSize: hp(2.2),
                textAlign: "center",
              },
            ]}
          >
            Your Advance Payment Details
          </Text>
          <Text
            style={{
              color: Colors.Black,
              fontSize: hp(1.8),
              fontFamily: Fonts.LATO_BOLD700,
              alignSelf: "flex-end",
              marginTop: hp(-2.2),
              marginBottom: hp(0.8),
            }}
          >
            {" "}
            {moment(item?.advancesDetails?.createdAt).calendar()}{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.textQ}>Your Bit Amount </Text>
            <Text style={[styles.textQ, styles.textA, { color: Colors.Black }]}>
              {" "}
              {item?.amount} Rs
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
                  fontFamily: Fonts.LATO_BOLD700,
                },
              ]}
            >
              <Text style={{ color: Colors.Black }}>₹</Text>{" "}
              {item?.queryDetails?.loadingCharge}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.textQ}>Advance Payment % </Text>
            <Text style={[styles.textQ, styles.textA, { color: Colors.Black }]}>
              {" "}
              {item?.advancesDetails?.takeAdvance}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.textQ}>Platform Fee </Text>
            <Text style={[styles.textQ, styles.textA, { color: Colors.Black }]}>
              {" "}
              {item?.advancesDetails?.platformFee} Rs
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.textQ}>Advance Payment </Text>
            <Text style={[styles.textQ, styles.textA, { color: Colors.Black }]}>
              {" "}
              {item?.advancesDetails?.advancePayment?Number(item?.advancesDetails?.advancePayment).toFixed(2):'0.00'} Rs
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.textQ}>Remaining Payment </Text>
            <Text style={[styles.textQ, styles.textA, { color: Colors.Black }]}>
              {" "}
              {item?.remainingBalance?.remainingBalance?Number(item?.remainingBalance?.remainingBalance).toFixed(2):'0.00'} Rs
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.textQ}>Advance Payment Status </Text>
            <Text
              style={[
                styles.textQ,
                styles.textA,
                { color: Colors.green029C0D },
              ]}
            >
              {" "}
              {item?.advancesDetails?.status}{" "}
              <Text style={{ color: Colors[525252], color: Colors.Black }}>
                Rs
              </Text>
            </Text>
          </View>
          <Text
            style={[
              styles.modalTitle,
              {
                fontSize: hp(2.2),
                marginTop: hp(3.5),
                backgroundColor: Colors.tabColor,
                textAlign: "center",
              },
            ]}
          >
            Your Remaining Payment Details
          </Text>
          <Text
            style={{
              color: Colors.Black,
              fontSize: hp(1.8),
              fontFamily: Fonts.LATO_BOLD700,
              alignSelf: "flex-end",
              marginTop: hp(-1.5),
            }}
          >
            {" "}
            {moment(item?.remainingBalance?.createdAt).calendar()}{" "}
          </Text>

          <View style={[styles.flexContainer, { marginTop: hp(1) }]}>
            <Text style={[styles.title, { color: Colors.Black }]}>
             Confirm Budget :
            </Text>
            <Text
              style={[
                styles.title,
                {
                  color: Colors.Black,
                  fontSize: hp(1.8),
                  fontFamily: Fonts.LATO_BOLD700,
                },
              ]}
            >
              {item?.amount} Rs
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.textQ}>Advance Payment </Text>
            <Text style={[styles.textQ, styles.textA, { color: Colors.Black }]}>
              {" "}
              {item?.remainingBalance?.advancePayment} Rs
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
                  fontFamily: Fonts.LATO_BOLD700,
                },
              ]}
            >
              <Text style={{ color: Colors.Black }}>₹</Text>{" "}
              {item?.queryDetails?.otherCharge}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.textQ}>Platform Fee </Text>
            <Text style={[styles.textQ, styles.textA, { color: Colors.Black }]}>
              {" "}
              {item?.remainingBalance?.platformFee} Rs
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.textQ}>Remaining Payment </Text>
            <Text style={[styles.textQ, styles.textA, { color: Colors.Black }]}>
              {" "}
              {item?.remainingBalance?.remainingBalance} Rs
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.textQ}>Remaining Payment Status </Text>
            <Text
              style={[
                styles.textQ,
                styles.textA,
                { color: Colors.green029C0D },
              ]}
            >
              {" "}
              {item?.remainingBalance?.status}{" "}
              <Text style={{ color: Colors[525252] }}>Rs</Text>
            </Text>
          </View>

          {/* <TouchableOpacity
            style={{}}
            // onPress={() => alert("invoice fetcher will be update in future")}
          >
            <Text
              onPress={() => _getInvoice({ item })}
              style={styles.closeText}
            >
              {" "}
              Download Invoice
            </Text>
          </TouchableOpacity> */}
        </View>

      </Collapsible>

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

      {dottedLoader && (
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 999,
          }}
        >
          <Text style={{ color: Colors.White }}>
            {/* Starting download... */}
            Invoice generating...
          </Text>
          <FastImage
            source={ImagePath.dittedLoader}
            style={{ width: wp(50), height: wp(10) }}
            resizeMode="center"
          />
        </View>
      )}

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
              No Invoice Found!
            </Text>
          </View>
        )}
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
        When remaining balance received successfully done, then Your will be
        generated successfully.
      </Text>
    </ScrollView>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabColor,
    padding: wp(4),
    borderRadius: wp(1.5),
    marginBottom: hp(1),
  },
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
    marginVertical: hp(0.3),
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

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.Black,
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
  button: {
    backgroundColor: Colors.btnColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: hp(2),
  },
  closeText: {
    marginTop: 20,
    color: "red",
    fontSize: 18,
    fontFamily: Fonts.LATO_BOLD700,
    alignSelf: "center",
    padding: wp(2),
  },
  textQ: {
    color: Colors.Black,
    fontSize: hp(1.8),
    fontFamily: Fonts.LATO_BOLD700,
  },
  textA: { color: Colors[525252] },
});
