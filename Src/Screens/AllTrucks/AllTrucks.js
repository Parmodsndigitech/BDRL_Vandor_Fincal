import {
  ActivityIndicator,
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
import AppWapper from "../../Components/AppWapper";
import StatusBarr from "../../Components/StatusBarr";
import Colors from "../../Utails/Colors";
import VectorIcon from "../../Utails/VectorIcon";
import StringsName from "../../Utails/StringsName";
import { hp, wp } from "../../Utails/Responsive";
import Fonts from "../../Utails/Fonts";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreensName from "../../Utails/ScreensName";
import { ToastModel } from "../../Components/alert/ToastModel";
import { APIRequest, ApiUrl } from "../../Constants/apiurl";
import FastImage from "react-native-fast-image";

const AllTrucks = () => {
  const navigation = useNavigation();
  const [getAllTruck, setGetAllTruck] = useState();
 const[truckCount,setTruckCount]= useState("")
  const [isRefreshing, setIsRefreshing] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    _getAllTrack();
  }, []);
  const _getAllTrack = () => {
    setIsRefreshing(true);
    let config = {
      url: ApiUrl.getAllTruckApi,
      method: "get",
    };
    APIRequest(
      config,
      (res) => {
        setGetAllTruck(res?.data);
        setTruckCount(res)
        setIsRefreshing(false);
      },
      (err) => {
        if (err?.message) {
          setIsRefreshing(false);
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        _getAllTrack();
        return false;
      }
    );
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      _getAllTrack();
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
      _getAllTrack();
      return;
    }, [])
  );
{
  {
                  }
}
  return (
    <AppWapper>
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      {/* Header START  */}
      <View style={styles.headerGoBackContianer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <VectorIcon
              type={"AntDesign"}
              name={"arrowleft"}
              size={30}
              color={Colors.textcolor1C274C}
            />
          </TouchableOpacity>
          <Text style={styles.trucksTxt}>{StringsName.trucks}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreensName.ADDNEWTRUCK);
          }}
        >
          <VectorIcon
            type={"Ionicons"}
            name={"add-circle"}
            size={30}
            color={Colors.textcolor1C274C}
          />
        </TouchableOpacity>
      </View>
      {/* Header END  */}

      <View style={styles.container}>
<Text style={{
  fontFamily:Fonts.LATO_BOLD700,
  color:Colors.btnColor,
  fontSize:hp(2),
  fontWeight:'700',
  marginHorizontal:wp(4),
  marginTop:hp(2)
}}>Total Truck No :<Text style={{color:Colors.Black}}>{truckCount?.count}</Text> </Text>
        <View style={{ marginVertical: hp(2),marginBottom:hp(5) }}>
          <FlatList 
          showsVerticalScrollIndicator={false}
            data={getAllTruck}
            keyExtractor={(item) => item._id}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={_getAllTrack}
              />
            }
            renderItem={({ item }) => (
              <View key={item} style={styles.truchContainer}>
                <View style={styles.truchContainerNo}>
                  
                  <Text style={styles.title}>{item?.truckNumber}</Text>
                  <Text
                    style={[
                      styles.title,
                      { color: Colors.redF01919, fontSize: hp(1.8) },
                    ]}
                  >
                    {capitalizeFirstLetter(item?.status)}
                  </Text>
                </View>
                <Text style={styles.subTitle}>
                  {item?.truckLength} {getAllTruck?.vehicleType}
                  {/* |<Text>6 Ton</Text> */}
                </Text>
              </View>
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
                    // color: Colors.Gray,
                    color: Colors.textcolor1C274C,
                  }}
                >
                  No Truck add's !
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </AppWapper>
  );
};

export default AllTrucks;

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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
    backgroundColor: Colors.White,
    paddingVertical: hp(1),
    borderBottomWidth: wp(0.3),
    borderColor: "lightgray",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  trucksTxt: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.5),
    marginLeft: wp(2),
  },
  container: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  truchContainer: {
    backgroundColor: Colors.tabColor,
    margin: wp(4),
    marginVertical: hp(1),
    borderRadius: wp(1.5),
    padding: wp(4),
  },
  truchContainerNo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: Colors[525252],
    fontSize: hp(2),
    fontFamily: Fonts.LATO_BOLD700,
  },
  subTitle: {
    color: Colors[525252],
    fontSize: hp(1.7),
    marginTop: hp(1),
    fontFamily: Fonts.LATO_BOLD700,
  },
});
