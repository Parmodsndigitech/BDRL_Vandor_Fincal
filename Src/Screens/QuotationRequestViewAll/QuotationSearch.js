// packages
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  Linking,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
// Utails
import { hp, wp } from "../../Utails/Responsive";
import Colors from "../../Utails/Colors";
import StringsName from "../../Utails/StringsName";
import Fonts from "../../Utails/Fonts";
import ScreensName from "../../Utails/ScreensName";
// Components
import AppWapper from "../../Components/AppWapper";
import HeaderGoBack from "../../Components/HeaderGoBack";
import StatusBarr from "../../Components/StatusBarr";
import moment from "moment";
import VectorIcon from "../../Utails/VectorIcon";

const QuotationSearch = ({ route }) => {
  const { filterSaveData } = route?.params;

  // console.log('pamrod.....9999..',filterSaveData)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [getAllQuotationFilter, setGetAllQuotationFilter] = useState(false);
  const [filterBranch, setfilterBranch] = useState([]);
  const [currentData, setCurrentData] = useState(filterSaveData);
  const filteredData = filterSaveData.filter(
    (item) => item.branchName === filterBranch
  );
  const _onSelectCompayType = (filterBranch) => {
    setfilterBranch(filterBranch);
    setGetAllQuotationFilter(false);
    applyFilter();
    setCurrentData(filteredData);
    // console.log('inside daaaa....filteredData.',filteredData)
    console.log('inside daaaa....currentData.',currentData)
  };
  const applyFilter = () => {
    setCurrentData(filteredData);
  };
  const toggleFilterViewRemove = () => {
    setCurrentData(filterSaveData);
    setGetAllQuotationFilter(false);
  };
  // console.log('parmoddd..filteredData.',filteredData)
  // console.log('parmoddd..currentData.',currentData)
  const _refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 200);
  };
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };

  // #################################################### 

  
  // ###########################################################

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate(ScreensName.QUOTATIONCONFIRM, {
            getAllQuotationData: item,
          })
        }
        style={styles.loadContianer}
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
        >
          {moment(item?.createdAt).calendar()}
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
            {capitalizeFirstLetter(item?.queryId)}
          </Text>
        </View>

        <View style={styles.productTpyeContainer}>
          <Text
            style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
          >
            Budget
          </Text>
          <Text
            style={[styles.txtmachine, { width: "60%", textAlign: "right" }]}
            numberOfLines={2}
          >
            <Text style={{ color: Colors.Black }}>₹</Text> {item?.budget}
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
              const phoneNumber = `tel:${item?.clientMobile}`;
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
            (+91) {item?.clientMobile}
          </Text>
        </View>

        <View style={[styles.toContianer, { marginTop: hp(1) }]}>
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
            {capitalizeFirstLetter(item?.pickup?.location)}
          </Text>
        </View>

        <View style={styles.toContianer}>
          <View
            style={[styles.toOuterCircle, { borderColor: Colors.redF01919 }]}
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
            {capitalizeFirstLetter(item?.drop?.location)}
          </Text>
        </View>

        <View>
          <View style={styles.productTpyeContainer}>
            <Text
              style={[styles.productTpye, { fontFamily: Fonts.LATO_BOLD700 }]}
            >
              Material Category
            </Text>
            <Text
              style={[styles.txtmachine, { width: "60%", textAlign: "right" }]}
              numberOfLines={2}
            >
              {capitalizeFirstLetter(item?.materialCategory)}
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
              {capitalizeFirstLetter(item?.materialWeight)}
              {StringsName.ton}
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
              {capitalizeFirstLetter(item?.vehicleType)} Body
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
              {item?.truckLength}
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
              {capitalizeFirstLetter(item?.materialDescription)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View
        style={[
          styles.headerGoBackContianer,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <HeaderGoBack />
        <Text
          style={{ fontSize: hp(2), color: Colors.Black, fontWeight: "600" }}
        >
          Filter Queries
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: wp(4),
          height: "100%",
        }}
      >
        {/* {
          currentData.length > 0 ? */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setGetAllQuotationFilter(true)}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.btnColor,
            alignSelf: "flex-end",
            marginVertical: hp(2),
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
        {/* :null
        } */}

        <FlatList
          // // data={filterSaveData}
          // data={filteredData}
          data={currentData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: wp(20) }}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={_refresh} />
          }
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
                  fontSize: hp(2.2),
                  marginTop: hp(1),
                  fontFamily: Fonts.InterMedium500,
                  color: Colors.textcolor1C274C,
                }}
              >
                No filter Queries Found! 🔍
              </Text>
            </View>
          )}
        />

        {/* Model for Filtr Branch View   */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={getAllQuotationFilter}
          style={{ margin: 0 }}
          // onRequestClose={() => setGetAllQuotationFilter()}
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
                {
                  console.log('parmod...',filterSaveData)
                }
                Filter By Branch Name{" "}
              </Text>
              <FlatList
                // data={FiltergroupedByBranch}
                data={currentData}
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
    </AppWapper>
  );
};

export default QuotationSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(4),
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
    borderBottomWidth: hp(0.1),
    borderColor: Colors.gray878787,
    paddingHorizontal: wp(4),
    backgroundColor: Colors.White,
  },
  dropDownContainer: {
    marginVertical: hp(3),
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  innerDropdownContianer: { width: "48%" },
  innerDropdownTitle: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    marginBottom: hp(1.5),
    fontSize: hp(2.4),
  },
  loadContianer: {
    backgroundColor: Colors.tabColor,
    marginVertical: hp(0.5),
    padding: wp(4),
    borderRadius: wp(1.5),
  },
  truchTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(2),
  },
  truckContianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  nameLabel: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: Colors.Black,
    textAlign: "center",
    marginVertical: hp(1),
  },
});
