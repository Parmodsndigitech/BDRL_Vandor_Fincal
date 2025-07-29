import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppWapper from "../../Components/AppWapper";
import StatusBarr from "../../Components/StatusBarr";
import HeaderGoBack from "../../Components/HeaderGoBack";
import StringsName from "../../Utails/StringsName";
import Colors from "../../Utails/Colors";
import { hp, wp } from "../../Utails/Responsive";
import Fonts from "../../Utails/Fonts";

export default function TremsConditions() {
  return (
    <AppWapper>
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.headerGoBackContianer}>
        <HeaderGoBack title={StringsName.tremsAndConditions} />
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
                {StringsName.tremConditionsWelcome}
              </Text>
            </View>
          </View>
          {/* introduction  END*/}

          {/* Use of the App  START*/}
          <View>
            <Text style={styles.policyIntroduction}>
              {StringsName.usetheApp}
            </Text>
            <View style={styles.policyInnerContianer}>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police01}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.usetheApp01}
                </Text>
              </View>

              <View
                style={[styles.weCollectContianer, { marginVertical: hp(0.5) }]}
              >
                <Text style={styles.policyWelcome}>{StringsName.police02}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.usetheApp02}
                </Text>
              </View>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police03}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.usetheApp03}
                </Text>
              </View>
            </View>
          </View>
          {/* How We Use Your Information  END*/}

          {/* Service  START*/}
          <View>
            <Text style={styles.policyIntroduction}>{StringsName.service}</Text>
            <View style={styles.policyInnerContianer}>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police01}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.service01}
                </Text>
              </View>

              <View
                style={[styles.weCollectContianer, { marginVertical: hp(0.5) }]}
              >
                <Text style={styles.policyWelcome}>{StringsName.police02}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.service02}
                </Text>
              </View>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police03}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.service03}
                </Text>
              </View>
            </View>
          </View>
          {/* Service  END*/}

          {/* User Conduct  START*/}
          <View>
            <Text style={styles.policyIntroduction}>
              {StringsName.userConduct}
            </Text>
            <View style={styles.policyInnerContianer}>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police01}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.userConduct01}
                </Text>
              </View>
              <View
                style={[styles.weCollectContianer, { marginVertical: hp(0.5) }]}
              >
                <Text style={styles.policyWelcome}>{StringsName.police02}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.userConduct02}
                </Text>
              </View>
            </View>
          </View>
          {/* Data Security  END*/}

          {/* Limitation of Liability  START*/}
          <View>
            <Text style={styles.policyIntroduction}>
              {StringsName.limitationOfLiability}
            </Text>
            <View style={styles.policyInnerContianer}>
              <View style={styles.weCollectContianer}>
                <Text style={styles.policyWelcome}>{StringsName.police01}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.limitationOfLiability01}
                </Text>
              </View>
              <View
                style={[styles.weCollectContianer, { marginVertical: hp(0.5) }]}
              >
                <Text style={styles.policyWelcome}>{StringsName.police02}</Text>
                <Text style={styles.policyWelcome}>
                  {StringsName.limitationOfLiability02}
                </Text>
              </View>
            </View>
          </View>
          {/* Limitation of Liability  END*/}

          {/* introduction  START*/}
          <View>
            <Text style={styles.policyIntroduction}>
              {StringsName.termination}
            </Text>
            <View style={styles.policyInnerContianer}>
              <Text style={styles.policyWelcome}>
                {StringsName.terminationWelcome}
              </Text>
            </View>
          </View>
          {/* introduction  END*/}

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
    // paddingBottom: hp(5),
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
