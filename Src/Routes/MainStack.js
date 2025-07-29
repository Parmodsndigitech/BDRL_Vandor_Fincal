import { StyleSheet } from "react-native";
import React from "react";
import ScreensName from "../Utails/ScreensName";
import BottomTabs from "./BottomTabs";
import ApprovalDetials from "../Screens/Approval/ApprovalDetials";
import EditProfile from "../Screens/EditProfile/EditProfile";
import PricacyPolicey from "../Screens/PricacyPolicey/PricacyPolicey";
import HelpSupport from "../Screens/HelpSupport/HelpSupport";
import TremsConditions from "../Screens/TremsConditions/TremsConditions";
import RefreshPage from "../Screens/RefreshPage";
import PageNotFound from "../Screens/PageNotFound";
import Notifaction from "../Screens/Notifaction/Notifaction";
import QuotationRequestViewAll from "../Screens/QuotationRequestViewAll/QuotationRequestViewAll";
import QuotationConfirm from "../Screens/QuotationRequestViewAll/QuotationConfirm";
import QuotationSearch from "../Screens/QuotationRequestViewAll/QuotationSearch";
import AddNewTruck from "../Screens/AddNewTruck/AddNewTruck";
import AllTrucks from "../Screens/AllTrucks/AllTrucks";
import InvoiceScreen from "../Screens/InvoiceScreen/InvoiceScreen";
import AllOrderScreen from "../Screens/AllOrderScreen/AllOrderScreen";
import PodScreen from "../Screens/PodScreen/PodScreen";
import BalanceScreen from "../Screens/BalanceScreen/BalanceScreen";
import PaidScreen from "../Screens/PaidScreen/PaidScreen";
import TransitOrderScreen from "../Screens/TransitOrderScreen/TransitOrderScreen";
import ApproveLR from "../Screens/ApproveLR/ApproveLR";

const headerShown = false;
const animation = "slide_from_right";
const MainStack = (Stack) => {
  return (
    <>
      <Stack.Screen
        name={ScreensName.BOTTOMTABS}
        component={BottomTabs}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.NOTIFACTION}
        component={Notifaction}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.EDITPROFIEL}
        component={EditProfile}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.QUOTATIONREQUESTVIEWALL}
        component={QuotationRequestViewAll}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.QUOTATIONSEARCH}
        component={QuotationSearch}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.QUOTATIONCONFIRM}
        component={QuotationConfirm}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.ADDNEWTRUCK}
        component={AddNewTruck}
        options={{ animation: animation,headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.ALLTRUCKS}
        component={AllTrucks}
        options={{ headerShown: headerShown,lazy: true }}
      />
      <Stack.Screen
        name={ScreensName.INVOICESCREEN}
        component={InvoiceScreen}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.ALLORDERSCREEN}
        component={AllOrderScreen}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.PODSCREEN}
        component={PodScreen}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.BALANCESCREEN}
        component={BalanceScreen}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.PAIDSCREEN}
        component={PaidScreen}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.TRANSITORDERSCREEN}
        component={TransitOrderScreen}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.APPROVALDETAILS}
        component={ApprovalDetials}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.PRICACYPOLICEY}
        component={PricacyPolicey}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.HELPANDSUPPORT}
        component={HelpSupport}
        options={{ headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.TERMANDCONDITIONS}
        component={TremsConditions}
        options={{ headerShown: headerShown }}
      />
      {/* Add New Screen Required Client */}
      <Stack.Screen
        name={ScreensName.APPROVELR}
        component={ApproveLR}
        options={{ headerShown: headerShown }}
      />
      {/* Server pages ................ */}
      <Stack.Screen
        name={ScreensName.REFRESHPAGE}
        component={RefreshPage}
        options={{ headerShown: headerShown }}

      />
      <Stack.Screen
        name={ScreensName.PAGENOTFOUND}
        component={PageNotFound}
        options={{ headerShown: headerShown }}
      />
    </>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
