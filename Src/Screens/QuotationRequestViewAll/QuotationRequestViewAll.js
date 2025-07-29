import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppWapper from "../../Components/AppWapper";
import StatusBarr from "../../Components/StatusBarr";
import HeaderGoBack from "../../Components/HeaderGoBack";
import Colors from "../../Utails/Colors";
import { hp, wp } from "../../Utails/Responsive";
import DropDown from "../../Components/DropDown";
import StringsName from "../../Utails/StringsName";
import Fonts from "../../Utails/Fonts";
import CountryQuotation from "../../Components/CountryQuotation";

const truchLengthData = [
  {
    id: 1,
    name: "10ft (6 Wheels) ",
  },
  {
    id: 2,
    name: "11ft (6 Wheels) ",
  },
  {
    id: 3,
    name: "12ft (6 Wheels) ",
  },
  {
    id: 4,
    name: "10ft (6 Wheels) ",
  },
  {
    id: 5,
    name: "13ft (6 Wheels) ",
  },
  {
    id: 6,
    name: "10ft (6 Wheels) ",
  },
  {
    id: 7,
    name: "16ft (6 Wheels) ",
  },
  {
    id: 8,
    name: "16ft (6 Wheels) ",
  },
  {
    id: 9,
    name: "10ft (6 Wheels) ",
  },
  {
    id: 10,
    name: "1ft (6 Wheels) ",
  },
];
const cityNameData = [
  {
    id: 1,
    name: "Delhi",
  },
  {
    id: 2,
    name: "Mumbai",
  },
  {
    id: 3,
    name: "Agra",
  },
  {
    id: 4,
    name: "Lucknow",
  },
  {
    id: 5,
    name: "Pune",
  },
  {
    id: 6,
    name: "Jaipur",
  },
  {
    id: 7,
    name: "Shadhara ",
  },
];
const QuotationRequestViewAll = () => {
  const [truckLength, setTruckLength] = useState("");
  const [cityName, setCityName] = useState("");

  const onCityName = (item) => {
    setCityName(item);
  };
  const onTruckLength = (item) => {
    setTruckLength(item);
  };
  return (
    <AppWapper>
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.headerGoBackContianer}>
        <HeaderGoBack />
      </View>
      <View style={styles.contianer}>
        <View style={styles.dropDownContainer}>
          <View style={styles.innerDropdownContianer}>
            <Text style={styles.innerDropdownTitle}>{StringsName.city}</Text>
            <DropDown
              ChooseOptions={StringsName.selectCity}
              data={cityNameData}
              value={cityName}
              onSelected={onCityName}
            />
          </View>
          <View style={styles.innerDropdownContianer}>
            <Text style={styles.innerDropdownTitle}>
              {StringsName.truchLenght}
            </Text>
            <DropDown
              ChooseOptions={StringsName.truchLenght}
              data={truchLengthData}
              value={truckLength}
              onSelected={onTruckLength}
            />
          </View>
        </View>
        <CountryQuotation countryTitle={"Delhi"} countryCount={"20"} />
      </View>
    </AppWapper>
  );
};

export default QuotationRequestViewAll;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: wp(4),
  },
  headerGoBackContianer: {
    borderBottomWidth: hp(0.1),
    borderColor: Colors.gray878787,
    paddingHorizontal: wp(4),
    backgroundColor: Colors.White,
  },
  dropDownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  innerDropdownContianer: { width: "48%" },
  innerDropdownTitle: {
    color: Colors[525252],
    fontFamily: Fonts.LATO_BOLD700,
    marginBottom: hp(1.5),
    fontSize: hp(2.4),
  },
});
