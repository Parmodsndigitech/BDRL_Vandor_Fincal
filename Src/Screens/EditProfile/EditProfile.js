import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppWapper from "../../Components/AppWapper";
import StatusBarr from "../../Components/StatusBarr";
import Colors from "../../Utails/Colors";
import HeaderGoBack from "../../Components/HeaderGoBack";
import StringsName from "../../Utails/StringsName";
import { hp, wp } from "../../Utails/Responsive";
import ImagePath from "../../Utails/ImagePath";
import InputComp from "../../Components/InputComp";
import Fonts from "../../Utails/Fonts";
import ButtonComp from "../../Components/ButtonComp";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImageCropPicker from "react-native-image-crop-picker";
import { APIRequest, APIRequestWithFile, ApiUrl } from "../../Constants/apiurl";
import { ToastModel } from "../../Components/alert/ToastModel";

const EditProfile = () => {
  const [imageUri, setImageUri] = useState("");
  const [companyName, setComapnyName] = useState("");
  const [companyAddress, setComapnyAddress] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const _mobileAlert = () => {
    ToastModel({ type: "error", text2: "Sorry You can't changes Mobile No." });
  };
  // // Permissions START
  const chooseImageSource = () => {
    Alert.alert("Profile Gellary || Profile photo", "Choose Option.", [
      {
        text: "Camera",
        onPress: openCamera,
      },
      {
        text: "Gallery",
        onPress: openImagePicker,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };
  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        // if(image){
        setImageUri(image);
        // else return
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        // if(image){
        setImageUri(image);
        // }
        // else return
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  // // Permissions END
  useEffect(() => {
    _getProfileData();
  }, []);
  const _getProfileData = () => {
    setIsRefreshing(true);
    let config = {
      url: ApiUrl.getDetailsApi,
      method: "get",
    };
    APIRequest(
      config,
      (res) => {
        setComapnyName(res?.data?.companyName);
        setComapnyAddress(res?.data?.companyAddress);
        setGstNo(res?.data?.gstNumber);
        setContactNo(res?.data?.mobileNo);
        setEmail(res?.data?.email);
        setImageUri(res?.data?.image);
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
  const _updateVanderProfile = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append("companyName", companyName);
    fd.append("companyAddress", companyAddress);
    fd.append("mobileNo", contactNo);
    // if (!imageUri) {
    fd.append("image", {
      uri: imageUri?.path,
      type: imageUri?.mime,
      name: imageUri?.modificationDate,
    });
    // }
    let config = {
      url: ApiUrl.updateProfileApi,
      method: "put",
      body: fd,
    };
    APIRequestWithFile(
      config,
      (res) => {
        ToastModel({ type: "success", text2: res?.message });
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        ToastModel({ type: "error", text2: err?.message });
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
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.headerGoBackContianer}>
        <HeaderGoBack title={StringsName.profile} />
      </View>
      {/* HeaderGoBack END  */}
      <View style={[styles.container]}>
        <KeyboardAwareScrollView
          extraHeight={150}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={_getProfileData}
            />
          }
        >
          <View style={styles.profileContainer}>
            {/* User PROFILE IMG START */}
            {/* {console.log("................imageUri?.path.", imageUri?.path)}
            {console.log("................imageUri.", imageUri)} */}
            <View style={styles.profileInnerContainer}>
              {imageUri?.path || imageUri ? (
                <Image
                  source={{ uri: imageUri?.path || imageUri }}
                  style={styles.userProfileAvatar}
                />
              ) : (
                <Image
                  source={ImagePath.userProfileAvatar}
                  style={styles.userProfileAvatar}
                />
              )}

              <TouchableOpacity
                onPress={() => {
                  chooseImageSource();
                }}
                style={styles.userProfileCameraContianer}
              >
                <Image
                  source={ImagePath.userProfileCamera}
                  style={styles.userProfileCamera}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* User PROFILE IMG END */}

          {/* User PROFILE DETAILS START */}
          <View style={styles.userProdiceDetailsContinaer}>
            <View>
              <Text style={styles.companyName}>{StringsName.companyName}</Text>
              <InputComp
                placeholder={StringsName.kappaKappaCorporation}
                value={companyName}
                onChangeText={(text) => {
                  setComapnyName(text);
                }}
              />
            </View>
            <View>
              <Text style={styles.companyName}>
                {StringsName.companyAddress}
              </Text>
              <InputComp
                placeholder={StringsName.kappaKappaCorporation}
                value={companyAddress}
                onChangeText={(text) => {
                  setComapnyAddress(text);
                }}
              />
            </View>
            <View>
              <Text style={styles.companyName}>{StringsName.gstNumber}</Text>
              <InputComp
                placeholder={StringsName.gstNoPlaceholder}
                editable={false}
                value={gstNo}
                onChangeText={(text) => {
                  setGstNo(text);
                }}
              />
            </View>

            <View>
              <Text style={styles.companyName}>{StringsName.mobileNumber}</Text>
              {/* importent  */}
              {/* <InputComp
                containerStyle={{backgroundColor:'lightblue',width:'100%'}}
                placeholder={StringsName.mobilePlaceholder}
                keyboardType={true}
                maxLength={10}
                value={!contactNo?contactNo:'No contact No here..'}
                onChangeText={(text) => {
                  setContactNo(text);
                }}
              /> */}
              <Text
                onPress={_mobileAlert}
                style={{
                  backgroundColor: Colors.tabColor,
                  paddingHorizontal: wp(2),
                  height: hp(5.8),
                  borderRadius: wp(1.5),
                  verticalAlign: "middle",
                  color: Colors.textcolor1C274C,
                }}
              >
                (+91) {contactNo}
              </Text>
            </View>
            <View>
              <Text style={styles.companyName}>{StringsName.emailAddress}</Text>
              <InputComp
                placeholder={StringsName.kappaKappaCorporation}
                editable={false}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
            </View>
          </View>

          {/* User PROFILE DETAILS START */}
          {/* Save Change BUTTON  */}
        </KeyboardAwareScrollView>
        <View
          style={{
            position: "absolute",
            bottom: hp(4),
            width: "100%",
            alignSelf: "center",
          }}
        >
          <ButtonComp
            onPress={() => {
              _updateVanderProfile();
            }}
            title={StringsName.saveChange}
          />
        </View>
      </View>
    </AppWapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(4),
    paddingBottom: hp(12),
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
  profileContainer: {
    width: wp(42),
    height: wp(42),
    borderRadius: wp(42),
    borderWidth: wp(0.3),
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.btnColor,
    alignSelf: "center",
    marginVertical: hp(5),
  },
  profileInnerContainer: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(40),
    borderWidth: wp(0.3),
    borderColor: Colors.btnColor,
  },
  userProfileAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: wp(100),
    resizeMode: "cover",
  },
  userProfileCameraContianer: {
    alignSelf: "center",
    marginTop: hp(-4),
    marginLeft: wp(25),
    width: wp(10),
    height: wp(10),
    padding: wp(1),
  },
  userProfileCamera: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  userProdiceDetailsContinaer: {
    marginTop: hp(-2),
  },
  companyName: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.2),
    marginVertical: hp(1.8),
    marginLeft: wp(0.5),
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
});
