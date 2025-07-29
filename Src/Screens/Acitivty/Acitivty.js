// packages
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
// Utails
import Colors from "../../Utails/Colors";
import { hp, wp } from "../../Utails/Responsive";
// Components
import AppWapper from "../../Components/AppWapper";
import HeaderGoBack from "../../Components/HeaderGoBack";
import StatusBarr from "../../Components/StatusBarr";
import TabButtonCom from "../../Components/TabButtonCom";

const Acitivty = () => {
  const navigation = useNavigation();
  return (
    <AppWapper>
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.headerGoBackContianer}>
        <HeaderGoBack title={"Trips"} />
      </View>
      <View style={styles.container}>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        > */}
        <TabButtonCom />
        {/* </ScrollView> */}
      </View>
    </AppWapper>
  );
};

export default Acitivty;

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
});
