// packages
import React from "react";
// Utails
import ScreensName from "../Utails/ScreensName";
// Screens
import Login from "../Screens/Login/Login";
import OnboardingOne from "../Screens/OnboardingScreen/OnboardingOne";
import OnboardingTwo from "../Screens/OnboardingScreen/OnboardingTwo";
import OnboardingThree from "../Screens/OnboardingScreen/OnboardingThree";
import LoginPhoneNo from "../Screens/Login/LoginPhoneNo";
import RegisterDoc from "../Screens/Register/RegisterDoc";
import Register from "../Screens/Register/Register";
import Congratulations from "../Screens/Congratulations";
import ForgotPassword from "../Screens/ForgotPassword/ForgotPassword";
import CreatePassword from "../Screens/ForgotPassword/CreatePassword";
import OtpScreen from "../Screens/OtpScreen";
import PricacyPoliceyAuth from "../Components/PricacyPoliceyAuth";
import TermsConditionsAuth from "../Components/TermsConditionsAuth";
const animation = "slide_from_right";
const headerShown = false;
export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={ScreensName.ONBOARDINGSCREENONE}
        component={OnboardingOne}
        options={{ animation: animation, headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.ONBOARDINGSCREENTWO}
        component={OnboardingTwo}
        options={{ animation: animation, headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.ONBOARDINGSCREENTHREE}
        component={OnboardingThree}
        options={{ animation: animation, headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.LOGIN}
        component={Login}
        options={{ animation: animation, headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.FORGOTPASSWORD}
        component={ForgotPassword}
        options={{ animation: animation, headerShown: headerShown }}
      />

      <Stack.Screen
        name={ScreensName.CREATEPASSWORD}
        component={CreatePassword}
        options={{ animation: animation, headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.REGISTER}
        component={Register}
        options={{ animation: animation, headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.REGISTERDOC}
        component={RegisterDoc}
        options={{ animation: animation, headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.LOGINPONE}
        component={LoginPhoneNo}
        options={{ animation: animation, headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.OTPSCREEN}
        component={OtpScreen}
        options={{ animation: animation, headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.CONGRATULATIONS}
        component={Congratulations}
        options={{ animation: animation, headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.PRICACYPOLICEYAUTH}
        component={PricacyPoliceyAuth}
        options={{ animation: animation,headerShown: headerShown }}
      />
      <Stack.Screen
        name={ScreensName.TERMCONDITIONSAUTH}
        component={TermsConditionsAuth}
        options={{ animation: animation,headerShown: headerShown }}
      />
    </>
  );
}
