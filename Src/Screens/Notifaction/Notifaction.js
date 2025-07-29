import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import StatusBarr from "../../Components/StatusBarr";
import AppWapper from "../../Components/AppWapper";
import { hp, wp } from "../../Utails/Responsive";
import Colors from "../../Utails/Colors";
import StringsName from "../../Utails/StringsName";
import HeaderGoBack from "../../Components/HeaderGoBack";
import ImagePath from "../../Utails/ImagePath";
import Fonts from "../../Utails/Fonts";

export default function Notifaction() {
  return (
    <AppWapper>
      <View style={styles.container}>
        <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
        <View style={styles.headerGoBackContianer}>
          <HeaderGoBack title={StringsName.notifaction} />
        </View>
        <ScrollView
          style={{ marginBottom: hp(1) }}
          showsVerticalScrollIndicator={false}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
            <View key={option} style={styles.notifactionContainer}>
              <View style={styles.notifactionImgContainer}>
                <Image
                  source={ImagePath.userProfileAvatar}
                  style={styles.notifactionUserImg}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.txtContianer}>
                <Text style={styles.notifactionUserName} numberOfLines={1}>
                  Deelene Robertson
                </Text>
                <View style={styles.txtInnerContianer}>
                  <Text style={styles.notifactionUserDesc} numberOfLines={3}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam vestibulum ex ac mauris tristique finibus. Duis
                    auctor varius lacus. Etiam porta facilisis vestibulum.
                    Aenean placerat sem non risus volutpat, id rhoncus orci
                    venenatis. Sed facilisis quis ligula sit amet placerat.
                    Aliquam molestie malesuada sem, ut fringilla lorem sodales
                    sed. In quam massa, elementum sit amet libero eget,
                    imperdiet rutrum arcu. Morbi magna lacus, congue sit amet
                    semper ac, ullamcorper ac tortor. Duis fermentum justo vel
                    tempus consectetur. Proin commodo pharetra purus.
                  </Text>
                  <Text style={styles.notifactionUserDesc}>10 Hr</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </AppWapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
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
  notifactionContainer: {
    backgroundColor: Colors.tabColor,
    padding: wp(1),
    marginHorizontal: wp(2),
    borderRadius: wp(1.5),
    marginVertical: hp(1.5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notifactionImgContainer: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(15),
    borderWidth: wp(0.2),
    padding: wp(1),
  },
  notifactionUserImg: { width: "100%", height: "100%" },
  txtContianer: {
    flex: 1,
    paddingHorizontal: wp(2),
  },
  txtInnerContianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notifactionUserName: {
    color: Colors.textcolor1C274C,
    fontSize: hp(2),
    fontFamily: Fonts.LATO_Regular600,
    width: "80%",
  },
  notifactionUserDesc: {
    color: Colors.gray878787,
    fontSize: hp(1.7),
    fontFamily: Fonts.LATO_Regular600,
    width: "80%",
  },
});
