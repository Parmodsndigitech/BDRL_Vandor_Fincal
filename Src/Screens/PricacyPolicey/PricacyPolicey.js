import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppWapper from "../../Components/AppWapper";
import StatusBarr from "../../Components/StatusBarr";
import HeaderGoBack from "../../Components/HeaderGoBack";
import StringsName from "../../Utails/StringsName";
import Colors from "../../Utails/Colors";
import { hp, wp } from "../../Utails/Responsive";
import Fonts from "../../Utails/Fonts";
export default function PricacyPolicey() {
  return (
    <AppWapper>
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.headerGoBackContianer}>
        <HeaderGoBack title={StringsName.activity} />
      </View>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {/* introduction  START*/}
          <View>
            <Text style={styles.policyIntroduction}>
              {StringsName.policyIntroduction}
            </Text>
            <View style={styles.policyInnerContianer}>
              <Text style={styles.policyWelcome}>
                {StringsName.policyWelcome}
              </Text>
              <Text
                style={[
                  styles.policyIntroduction,
                  { fontSize: hp(1.8), marginVertical: hp(1) },
                ]}
              >
                {StringsName.policeWeCollect}
              </Text>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police01}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.policeInfoamction01}
                </Text>
              </View>
              <View
                style={[styles.weCollectContianer, { marginVertical: hp(0.5) }]}
              >
                <Text style={styles.policyWelcome}>{StringsName.police02}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.policeInfoamction02}
                </Text>
              </View>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police03}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.policeInfoamction03}
                </Text>
              </View>
            </View>
          </View>
          {/* introduction  END*/}

          {/* How We Use Your Information  START*/}
          <View>
            <Text style={styles.policyIntroduction}>
              {StringsName.howWeUseYourInformation}
            </Text>
            <View style={styles.policyInnerContianer}>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police01}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.useInformaction01}
                </Text>
              </View>

              <View
                style={[styles.weCollectContianer, { marginVertical: hp(0.5) }]}
              >
                <Text style={styles.policyWelcome}>{StringsName.police02}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.useInformaction02}
                </Text>
              </View>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police03}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.useInformaction03}
                </Text>
              </View>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police04}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.useInformaction04}
                </Text>
              </View>
            </View>
          </View>
          {/* How We Use Your Information  END*/}

          {/* Data Sharing and Disclosure  START*/}
          <View>
            <Text style={styles.policyIntroduction}>
              {StringsName.dataSharingDisclosure}
            </Text>
            <View style={styles.policyInnerContianer}>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police01}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.dataSharingDisclosure01}
                </Text>
              </View>

              <View
                style={[styles.weCollectContianer, { marginVertical: hp(0.5) }]}
              >
                <Text style={styles.policyWelcome}>{StringsName.police02}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.dataSharingDisclosure02}
                </Text>
              </View>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police03}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.dataSharingDisclosure03}
                </Text>
              </View>
            </View>
          </View>
          {/* Data Sharing and Disclosure  END*/}

          {/* Data Security  START*/}
          <View>
            <Text style={styles.policyIntroduction}>
              {StringsName.dataSecurity}
            </Text>
            <View style={styles.policyInnerContianer}>
              <Text style={styles.policyWelcome}>
                {StringsName.dataSecurityWeEmploy}
              </Text>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police01}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.dataSecurity01}
                </Text>
              </View>
              <View
                style={[styles.weCollectContianer, { marginVertical: hp(0.5) }]}
              >
                <Text style={styles.policyWelcome}>{StringsName.police02}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.dataSecurity02}
                </Text>
              </View>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police03}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.dataSecurity03}
                </Text>
              </View>
              <Text
                style={[
                  styles.policyIntroduction,
                  { fontSize: hp(1.8), marginVertical: hp(1) },
                ]}
              >
                {StringsName.ChangesThisPrivacyPolicy}
              </Text>

              <Text style={styles.policyWelcome}>
                {StringsName.updatethisPrivacyPolicy}
              </Text>
            </View>
          </View>
          {/* Data Security  END*/}

          {/* Data Security  START*/}
          <View>
            <Text style={styles.policyIntroduction}>
              {StringsName.contactUs}
            </Text>
            <View style={styles.policyInnerContianer}>
              <Text style={styles.policyWelcome}>
                {StringsName.ifEmailSupport}
              </Text>
            </View>
          </View>
          {/* Data Security  END*/}
        </ScrollView>
      </View>
    </AppWapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
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
  policyIntroduction: {
    color: Colors.textcolor1C274C,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.5),
  },
  policyInnerContianer: {
    backgroundColor: Colors.tabColor,
    padding: wp(2),
    borderRadius: wp(1.5),
    marginVertical: hp(2),
  },
  weCollectContianer: {
    flexDirection: "row",
  },
  policyWelcome: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(1.7),
    marginRight: wp(1),
  },
});
