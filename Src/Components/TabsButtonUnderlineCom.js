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
import AllOrder from "./AllOrder";
import Invoice from "./Invoice";
import Pod from "./Pod";
import Balance from "./Balance";
import Paid from "./Paid";
const tabsData = [
  {
    id: 1,
    name: "All Orders",
  },
  {
    id: 2,
    name: "Transit",
  },
  {
    id: 3,
    name: "POD",
  },
  {
    id: 4,
    name: "Balance",
  },
  {
    id: 5,
    name: "Paid",
  },
];
const TabsButtonUnderlineCom = ({ filteredConfirmData }) => {
  const [isTabUnderlineBution, setIsTabUnderlineButton] = useState([0]);
  // console.log('sending this data to LR by props', filteredConfirmData)
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setIsTabUnderlineButton(index);
          }}
          activeOpacity={0.7}
          style={[
            styles.tabBtnContainer,
            {
              borderBottomWidth: isTabUnderlineBution == index ? wp(0.8) : null,
              borderColor:
                isTabUnderlineBution == index
                  ? Colors.btnColor
                  : Colors.tabColor,
            },
          ]}
        >
          <Text
            style={[
              styles.tabBtnContainerText,
              {
                color:
                  isTabUnderlineBution == index
                    ? Colors.btnColor
                    : Colors.gray878787,
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
      <FlatList
        data={tabsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {isTabUnderlineBution == 0 ? <AllOrder /> : null}

      {isTabUnderlineBution == 1 ? (
        <Invoice filteredConfirmData={filteredConfirmData} />
      ) : null}
      {isTabUnderlineBution == 2 ? <Pod /> : null}
      {isTabUnderlineBution == 3 ? <Balance /> : null}
      {isTabUnderlineBution == 4 ? (
        <View>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
            <Paid key={option} />
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default TabsButtonUnderlineCom;

const styles = StyleSheet.create({
  contianer: {
    width: "100%",
  },

  tabBtnContainer: {
    marginRight: wp(5),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
  },
  tabBtnContainerText: {
    textAlign: "center",
    color: Colors.Black,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.2),
  },
});
