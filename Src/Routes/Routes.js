import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "../Screens/Splash/Splash";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/Slice/LoginSlice";

const Stack = createNativeStackNavigator();
const Routes = () => {
  const dispatch = useDispatch();
  const isLogIn = useSelector((state) => state.isLogin?.isLogin);
  const [loarding, setloarding] = useState(true);
  const GetToken = async () => {
    const token = await AsyncStorage.getItem("token").catch((err) =>
      console.log(err, "----- token err")
    );
    console.log("token@", token);
    if (token) {
      dispatch(setLogin(true));
    }
  };
  useEffect(() => {
    GetToken();
    setTimeout(() => {
      setloarding(false);
    }, 6000);
  }, []);

  return (
    <NavigationContainer fallback={<Text>Loading...</Text>}>
      {loarding ? (
        <>
          <Splash />
        </>
      ) : (
        <Stack.Navigator>
          {isLogIn ? MainStack(Stack) : AuthStack(Stack)}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
