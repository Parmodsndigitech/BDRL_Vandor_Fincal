import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import AppWapper from "../../Components/AppWapper";
import Colors from "../../Utails/Colors";
import StatusBarr from "../../Components/StatusBarr";
import HeaderGoBack from "../../Components/HeaderGoBack";
import StringsName from "../../Utails/StringsName";
import { hp, wp } from "../../Utails/Responsive";
import Fonts from "../../Utails/Fonts";
import ButtonComboComp from "../../Components/ButtonComboComp";

// smoll componets
const DataCompoents = ({
  quotation,
  name,
  userInputName,
  contactNumber,
  contactInputNumber,
  emailAddress,
  emailInputAddress,
  companyName,
  companyInputName,
}) => {
  return (
    <View>
      <Text style={styles.requestQuotation}>{quotation}</Text>
      <View style={styles.requestQuotationContinaer}>
        <View style={styles.requestQuotationInner}>
          <Text style={styles.userNameQuiqe}>{name} </Text>
          <Text style={styles.userNameAns} numberOfLines={1}>
            {userInputName}{" "}
          </Text>
        </View>
        <View style={styles.requestQuotationInner}>
          <Text style={styles.userNameQuiqe}>{contactNumber}</Text>
          <Text style={styles.userNameAns} numberOfLines={1}>
            {contactInputNumber}
          </Text>
        </View>
        <View style={styles.requestQuotationInner}>
          <Text style={styles.userNameQuiqe}>{emailAddress}</Text>
          <Text style={styles.userNameAns} numberOfLines={1}>
            {emailInputAddress}
          </Text>
        </View>
        <View style={styles.requestQuotationInner}>
          <Text style={styles.userNameQuiqe}>{companyName}</Text>

          <Text style={styles.userNameAns} numberOfLines={1}>
            {companyInputName}{" "}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default function ApprovalDetials() {
  return (
    <AppWapper>
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={styles.headerGoBackContianer}>
        <HeaderGoBack title={StringsName.approval} />
      </View>
      {/* ######## HEADER ######  */}
      <ScrollView style={styles.container}>
        {/* requestQuotation */}
        <DataCompoents
          quotation={StringsName.requestQuotation}
          name={StringsName.name}
          userInputName={"Jamie Nilsson"}
          contactNumber={StringsName.contactNumber}
          contactInputNumber={"0932 555 9943 "}
          emailAddress={StringsName.emailAddress}
          emailInputAddress={"john@gmail.com "}
          companyName={StringsName.companyName}
          companyInputName={"Kappa - Kappa Corporation"}
        />
        {/* materialInformation */}
        <DataCompoents
          quotation={StringsName.materialInformation}
          name={StringsName.type}
          userInputName={"Cardboard"}
          contactNumber={StringsName.weight}
          contactInputNumber={"141.8 Kg"}
          emailAddress={StringsName.quantity}
          emailInputAddress={"530"}
          companyName={StringsName.specialHandling}
          companyInputName={"None"}
        />
        {/* pickupInformation */}
        <DataCompoents
          quotation={StringsName.pickupInformation}
          name={StringsName.address}
          userInputName={"8080 Railroad St."}
          contactNumber={StringsName.date}
          contactInputNumber={"October 31, 2017 "}
          emailAddress={StringsName.time}
          emailInputAddress={"5 hours ago"}
        />
        {/* vendorInfo */}
        <DataCompoents
          quotation={StringsName.vendorInfo}
          name={StringsName.companyName}
          userInputName={"Sudha Travels"}
          contactNumber={StringsName.contactNumber}
          contactInputNumber={"+91 7234569270"}
          emailAddress={StringsName.emailAddress}
          emailInputAddress={"sample@gamil.com"}
          companyName={StringsName.contactPersonName}
          companyInputName={"Kappa - Kappa Corporation"}
        />
        {/* deliveryInforamaction */}
        <DataCompoents
          quotation={StringsName.deliveryInforamaction}
          name={StringsName.address}
          userInputName={"7529 E. Pecan St."}
          contactNumber={StringsName.date}
          contactInputNumber={"February 28,2018"}
          emailAddress={StringsName.time}
          emailInputAddress={"7:30 am "}
        />
        {/* suggestedRequirement */}
        <DataCompoents
          quotation={StringsName.suggestedRequirement}
          name={StringsName.type}
          userInputName={"Environmental"}
          contactNumber={StringsName.mode}
          contactInputNumber={"...................."}
          emailAddress={StringsName.additionalService}
          emailInputAddress={"7:30 am"}
        />

        <DataCompoents
          quotation={StringsName.quotationDetails}
          name={StringsName.buget}
          userInputName={"10,00,000"}
          contactNumber={StringsName.paymentMethod}
          contactInputNumber={"Check"}
        />
        {/* inputContianer */}
        <Text style={styles.requestQuotation}>
          {StringsName.additionalInformaction}
        </Text>
        <View style={styles.inputContianer}>
          <TextInput
            style={styles.inputStyle}
            numberOfLines={4}
            multiline={true}
            placeholder="Note:"
          />
        </View>

        {/* ButtonComboComp  */}
        <View style={styles.ButtonComboContianer}>
          <ButtonComboComp
            titleleft={StringsName.decline}
            titleRight={StringsName.confirm}
          />
        </View>
      </ScrollView>
    </AppWapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(4),
    // marginVertical:hp(2)
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
  requestQuotation: {
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.4),
    color: Colors.textcolor1C274C,
    marginTop: hp(1),
  },
  requestQuotationContinaer: {
    backgroundColor: Colors.tabColor,
    padding: wp(2),
    borderRadius: wp(1.5),
    marginVertical: hp(1),
  },
  requestQuotationInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1.5),
  },
  userNameQuiqe: {
    color: Colors.textcolor1C274C,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(1.9),
  },
  userNameAns: {
    color: Colors.gray878787,
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(1.9),
    width: "60%",
    textAlign: "right",
  },
  inputContianer: {
    borderRadius: wp(1.5),
    marginVertical: hp(1.5),
    backgroundColor: Colors.tabColor,
    minHeight: hp(10),
    maxHeight: hp(20),
  },
  inputStyle: {
    textAlignVertical: "top",
    fontSize: hp(2),
    color: Colors.textcolor1C274C,
    fontFamily: Fonts.LATO_Regular600,
  },
  ButtonComboContianer: {
    marginBottom: hp(4),
  },
});
