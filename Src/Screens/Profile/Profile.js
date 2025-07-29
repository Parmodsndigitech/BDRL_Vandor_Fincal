// packages
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// Utails
import Colors from "../../Utails/Colors";
import StringsName from "../../Utails/StringsName";
import { hp, wp } from "../../Utails/Responsive";
import Fonts from "../../Utails/Fonts";
import ImagePath from "../../Utails/ImagePath";
import ScreensName from "../../Utails/ScreensName";
// Components
import AppWapper from "../../Components/AppWapper";
import StatusBarr from "../../Components/StatusBarr";
import HeaderGoBack from "../../Components/HeaderGoBack";
import NeedHelpModel from "../../Components/NeedHelpModel";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLogin } from "../../redux/Slice/LoginSlice";
// vars
const activeOpacity = 0.8;
// small Components
const ProfileButton = ({
  headeingTitle,
  iconImg,
  profileName,
  iconImgBottom,
  profileNameBottom,
  onPressTop,
  onPressBottom,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.account}>{headeingTitle}</Text>
      <View style={styles.profileBtnWapper}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onPressTop}
          style={styles.profileBtnContianer}
        >
          <View style={styles.iconContianer}>
            <Image
              source={iconImg}
              style={styles.iconImg}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.titleTxt}>{profileName}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onPressBottom}
          style={styles.profileBtnContianer}
        >
          <View style={styles.iconContianer}>
            <Image
              source={iconImgBottom}
              style={styles.iconImg}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.titleTxt}>{profileNameBottom}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const _logout = () => {
    Alert.alert("Alert Logout", "Are you sure you want to logout", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setLoading(true);
          setTimeout(() => {
            AsyncStorage.removeItem("token");
            dispatch(setLogin(false));
            setLoading(false);
          }, 3000);
        },
      },
    ]);
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
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileButton
            headeingTitle={StringsName.account}
            iconImg={ImagePath.profileUser}
            profileName={StringsName.editProfile}
            iconImgBottom={ImagePath.profileLock}
            profileNameBottom={StringsName.privacy}
            onPressTop={() => {
              navigation.navigate(ScreensName.EDITPROFIEL);
            }}
            onPressBottom={() => {
              navigation.navigate(ScreensName.PRICACYPOLICEY);
            }}
          />
          <ProfileButton
            headeingTitle={StringsName.supportAbout}
            iconImg={ImagePath.profielhelpSupport}
            profileName={StringsName.helpSupport}
            iconImgBottom={ImagePath.profileTermcondition}
            profileNameBottom={StringsName.tremsAndConditions}
            onPressTop={() => toggleModal()}
            onPressBottom={() => {
              navigation.navigate(ScreensName.TERMANDCONDITIONS);
            }}
          />
          <NeedHelpModel
            modalVisible={modalVisible}
            toggleModal={toggleModal}
          />
          <Text style={styles.account}>{StringsName.action}</Text>
          <View style={styles.profileBtnWapper}>
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={_logout}
              style={styles.profileBtnContianer}
            >
              <View style={styles.iconContianer}>
                <Image
                  source={ImagePath.profielLogout}
                  style={styles.iconImg}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.titleTxt}>{StringsName.logOut}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </AppWapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
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
  account: {
    color: Colors.TxtColor,
    fontSize: hp(2.5),
    marginVertical: hp(1),
    fontFamily: Fonts.LATO_BOLD700,
  },
  profileBtnWapper: {
    backgroundColor: Colors.tabColor,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.5),
    marginVertical: hp(1),
    borderRadius: wp(1.5),
  },
  profileBtnContianer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContianer: {
    width: wp(8),
    height: hp(5),
    padding: wp(1),
    marginRight: wp(3),
  },
  iconImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  titleTxt: {
    color: Colors.TxtColor,
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(2.2),
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
