import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { hp, wp } from "../Utails/Responsive";
import Colors from "../Utails/Colors";
import Fonts from "../Utails/Fonts";
import TransitOrder from "./TransitOrder";
import AllBits from "./AllBits";
import Invoice from "./Invoice";
import Pod from "./Pod";
import Paid from "./Paid";
import ApproveLR from "./ApproveLR";
import ApproveAdvance from "./ApproveAdvance";

const tabsData = [
  {
    id: 0,
    name: "All Bid",
  },
  {
    id: 1,
    name: "Transit",
  },
  {
    id: 2,
    name: "LR",
  },
  {
    id: 3,
    name: "Advance",
  },
  {
    id: 4,
    name: "POD",
  },
  {
    id: 5,
    name: "Invoice",
  },
  // {
  //   id: 6,
  //   name: "Paid",
  // },
];
const TabButtonCom = () => {
  const [isTabBution, setIsTabButton] = useState([0]);
  const renderItem = ({ item, index }) => {
    return (
      <View 
      key={index} 
        keyExtractor={item?.id}
      >
        <TouchableOpacity
           key={index} 
           keyExtractor={item?.id}
          onPress={() => {
            setIsTabButton(index);
          }}
          activeOpacity={0.7}
          style={[
            styles.tabBtnContainer,
            {
              borderColor:
                isTabBution == index ? Colors.btnColor : Colors.tabColor,
            },
          ]}
        >
          <Text
            style={[
              styles.tabBtnContainerText,
              {
                color:
                  isTabBution == index ? Colors.btnColor : Colors.gray878787,
              },
            ]}
          >
            {item?.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.contianer}>
      <View>
      <FlatList
        data={tabsData}
        renderItem={renderItem}
        // keyExtractor={(item) => item?.id}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      </View>
      {isTabBution == 0 ? <AllBits /> : null}
      {isTabBution == 1 ? <TransitOrder /> : null}
      {/*it is LR  not Invoice */}
      {isTabBution == 2 ? <ApproveLR /> : null}
      {isTabBution == 3 ? <ApproveAdvance /> : null}
      {isTabBution == 4 ? <Pod /> : null}
      {isTabBution == 5 ? <Invoice /> : null}
      {/* {isTabBution == 6 ? <Paid /> : null} */}
    </View>
  );
};

export default TabButtonCom;

const styles = StyleSheet.create({
  contianer: {
    width: "100%",
  },
  tabBtnContainer: {
    borderWidth: wp(0.3),
    marginRight: wp(5),
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.8),
    backgroundColor: Colors.tabColor,
    borderRadius: wp(2),
    width: wp(50),
    marginBottom: hp(2),
  },
  tabBtnContainerText: {
    textAlign: "center",
    color: Colors.Black,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.2),
  },
});
