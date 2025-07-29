import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import VectorIcon from "../Utails/VectorIcon";
import Colors from "../Utails/Colors";
import { hp, wp } from "../Utails/Responsive";
import Fonts from "../Utails/Fonts";

export default function DropDown({
  data = [],
  value = {},
  ChooseOptions,
  btnContianerStyle,
  containerStyle,
  btnInnerStyle,
  onSelected = () => {},
}) {
  // Add this Line here .......... SART
  const [modalVisible, setModalVisible] = useState(false);
  const onSelectedItem = (item) => {
    setModalVisible(false);
    onSelected(item);
  };
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        style={{ ...styles.btnContianer, ...btnContianerStyle }}
      >
        <Text style={styles.optionTxt}>
          {!!value ? value?.name : ChooseOptions}
        </Text>
        <VectorIcon
          type={"MaterialIcons"}
          name={"keyboard-arrow-down"}
          size={30}
          color={Colors.gray878787}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            {data.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ ...styles.btnInner, ...btnInnerStyle }}
                  key={String(index)}
                  onPress={() => onSelectedItem(item)}
                >
                  <View style={styles.cricle} />
                  <Text style={styles.optionTxt}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  btnContianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.tabColor,
    borderRadius: wp(1.5),
    padding: wp(2),
    paddingHorizontal: wp(4),
  },
  optionTxt: {
    color: Colors.gray878787,
    fontFamily: Fonts.LATO_Regular600,
    fontSize: hp(2.2),
  },
  btnInnerContianer: {
    backgroundColor: Colors.tabColor,
    maxHeight: hp(30),
    paddingBottom: hp(2),
    borderBottomLeftRadius: wp(1.5),
    borderBottomRightRadius: wp(1.5),
    paddingHorizontal: wp(2),
  },
  cricle: {
    width: wp(5.5),
    height: wp(5.5),
    marginRight: wp(2),
    borderRadius: wp(5.5),
    borderWidth: wp(0.3),
  },
  btnInner: {
    borderBottomWidth: wp(0.1),
    borderColor: Colors.gray878787,
    padding: wp(2),
    flexDirection: "row",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
});
