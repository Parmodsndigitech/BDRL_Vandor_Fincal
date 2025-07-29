import {
  ActivityIndicator,
  Modal,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import Colors from "../Utails/Colors";

export default function LoaderComp({ isLoader = true }) {
  if (isLoader) {
    return (
      <Modal>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.RgbaWhite}
          translucent={true}
        />
        <View style={styles.contianer}>
          <ActivityIndicator size={"large"} />
        </View>
      </Modal>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  contianer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: Colors.RgbaWhite,
  },
});
