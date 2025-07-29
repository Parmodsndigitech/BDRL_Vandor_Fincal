import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../Utails/Colors";
import { hp, wp } from "../Utails/Responsive";
import StringsName from "../Utails/StringsName";
import Fonts from "../Utails/Fonts";
import ImagePath from "../Utails/ImagePath";
import FastImage from "react-native-fast-image";
import { ToastModel } from "./alert/ToastModel";
import { APIRequest, ApiUrl } from "../Constants/apiurl";

const NeedHelpModel = ({ modalVisible, toggleModal }) => {
  const [first, setfirst] = useState(true);
  const [message, setmessage] = useState("");
  const [loading, setloading] = useState(false);

  const sendHelpQuery = () => {
    let config = {
      url: `${ApiUrl.supportApi}`,
      method: "post",
      body: {
        description: message,
      },
    };
    APIRequest(
      config,
      (res) => {
        ToastModel({ type: "success", text2: res?.message });
        setfirst(false);
        setmessage("");
      },
      (err) => {
        console.log("sendHelpQuery", err);
        if (err?.message) {
          ToastModel({ type: "error", text2: err?.message });
        }
      }
    );
  };

  const sendBack = () => {
    setfirst(true);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        {loading && (
          <ActivityIndicator
            color={Colors.btnColor}
            size="large"
            style={styles.loader}
          />
        )}
        <View style={styles.modalBackground}>
          <View style={styles.horizontalLineBlack} />

          {first ? (
            <View style={styles.modalContainer}>
              {/* needHelpContianer need Gif Container START  */}
              <View style={styles.needHelpContianer}>
                <Text style={styles.needHelpText}>{StringsName.needHelp}</Text>
                <View style={styles.needHelpGifContianer}>
                  <FastImage
                    source={ImagePath.needHelpGif}
                    style={styles.needHelpGifImg}
                    resizeMode="cover"
                  />
                </View>
                <Text style={[styles.needHelpText, { fontSize: hp(2) }]}>
                  {StringsName.emailSupport}
                </Text>
              </View>
              {/* needHelpContianer need Gif Container END  */}
              {/* descriptionInputContinaer START  */}
              <View style={styles.descriptionInputContinaer}>
                <Text style={styles.needHelpText}>
                  {StringsName.description}
                </Text>
                <View style={styles.inputContianer}>
                  <TextInput
                    placeholder={StringsName.writeDescription}
                    placeholderTextColor={Colors.textcolor1C274C}
                    style={styles.inputStyle}
                    numberOfLines={4}
                    onChangeText={(text) => setmessage(text)}
                    value={message}
                  />
                </View>
              </View>
              {/* descriptionInputContinaer END  */}
              <TouchableOpacity
                style={[
                  styles.sendBtn,
                  {
                    backgroundColor: message
                      ? Colors.btnColor
                      : Colors.gray878787,
                  },
                ]}
                onPress={() => sendHelpQuery()}
                disabled={message ? false : true}
              >
                <Text
                  style={{
                    fontSize: hp(2.5),
                    color: Colors.White,
                    fontFamily: Fonts.LATO_BOLD700,
                    textAlign: "center",
                  }}
                >
                  {StringsName.send}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.modalContainer}>
              {/* needHelpContianer need Gif Container START  */}
              <View style={styles.needHelpContianer}>
                <View
                  style={[
                    styles.needHelpGifContianer,
                    styles.needHelpDoneContianer,
                  ]}
                >
                  <FastImage
                    source={ImagePath.doneGif}
                    style={styles.needHelpGifImg}
                    resizeMode="cover"
                    alt="Done Img Gif"
                  />
                </View>
                <View style={styles.supportRequestContianer}>
                  <Text style={[styles.needHelpText, { fontSize: hp(2) }]}>
                    {StringsName.supportRequestsuccessfully}
                  </Text>
                  <Text style={[styles.needHelpText, { fontSize: hp(1.7) }]}>
                    {StringsName.ourteamwillsoon}
                  </Text>
                </View>
              </View>

              {/* backToHome BUTTON  START */}

              <Text
                style={[styles.sendBtn, { fontSize: hp(2.4) }]}
                onPress={() => sendBack()}
              >
                {StringsName.backToHome}
              </Text>
              {/* backToHome BUTTON  END */}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default NeedHelpModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  descriptionInputContinaer: {
    width: "100%",
    marginVertical: hp(2),
    marginBottom: hp(2.5),
  },
  sendBtn: {
    backgroundColor: Colors.btnColor,
    width: "80%",
    textAlign: "center",
    padding: wp(3),
    borderRadius: wp(1.5),
  },
  inputStyle: {
    padding: 0,
    width: "100%",
    height: "100%",
    textAlignVertical: "top",
    color: Colors.textcolor1C274C,
  },
  inputContianer: {
    backgroundColor: Colors.tabColor,
    height: hp(10),
    borderRadius: wp(1.5),
    padding: wp(2),
    marginVertical: hp(1),
  },
  horizontalLineBlack: {
    backgroundColor: Colors.Black,
    borderWidth: hp(0.2),
    width: "18%",
    borderRadius: wp(2),
    position: "relative",
    top: hp(1),
    zIndex: 999,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 999,
    alignSelf: "center",
    backgroundColor: Colors.RgbaWhite,
  },
  needHelpContianer: {
    alignItems: "center",
    marginVertical: hp(2),
  },
  needHelpText: {
    color: Colors.textcolor1C274C,
    fontFamily: Fonts.LATO_BOLD700,
    fontSize: hp(2.4),
  },
  needHelpGifContianer: {
    width: wp(30),
    height: hp(10),
    marginVertical: hp(1.5),
  },
  needHelpDoneContianer: {
    width: wp(40),
    height: hp(15),
    marginVertical: hp(1.5),
  },
  supportRequestContianer: {
    marginTop: hp(7),
    marginBottom: hp(3),
    alignItems: "center",
  },
  needHelpGifImg: { width: "100%", height: "100%" },
  modalContainer: {
    width: "100%",
    height: hp(60),
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    position: "absolute",
    bottom: hp(0),
  },
});
