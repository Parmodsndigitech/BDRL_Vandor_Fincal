import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import StringsName from "../Utails/StringsName";
import { hp, wp } from "../Utails/Responsive";
import Colors from "../Utails/Colors";
import Fonts from "../Utails/Fonts";
import HeaderGoBack from "./HeaderGoBack";
export default function TermsConditionsAuth() {
  return (
    <View
      style={{
        paddingHorizontal: wp(4),
        backgroundColor: Colors.White,
        flex: 1,
      }}
    >
        <View style={{flexDirection:'row',alignItems:'center',marginLeft:wp(-1)}}>
        <HeaderGoBack title={""} />
        <Text style={[styles.policyIntroduction,{fontSize:hp(2.8),textAlignVertical:'bottom'}]}>
            {'Terms Conditions'}
          </Text>
        </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
          <Text style={styles.policyIntroduction}>{StringsName.usetheApp}</Text>
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
              <Text style={styles.policyWelcome}>{StringsName.service01}</Text>
            </View>
            <View
              style={[styles.weCollectContianer, { marginVertical: hp(0.5) }]}
            >
              <Text style={styles.policyWelcome}>{StringsName.police02}</Text>
              <Text style={styles.policyWelcome}>{StringsName.service02}</Text>
            </View>
            <View style={styles.weCollectContianer}>
              <Text style={styles.policyWelcome}>{StringsName.police03}</Text>
              <Text style={styles.policyWelcome}>{StringsName.service03}</Text>
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
          <Text style={styles.policyIntroduction}>{StringsName.contactUs}</Text>
          <View style={styles.policyInnerContianer}>
            <Text style={styles.policyWelcome}>
              {StringsName.ifEmailSupport}
            </Text>
          </View>
        </View>
        {/* Data Security  END*/}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
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
