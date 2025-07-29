import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Fonts from "../Utails/Fonts";
import Colors from "../Utails/Colors";
import { hp } from "../Utails/Responsive";
import { APIRequest, ApiUrl } from "../Constants/apiurl";
const GetRemainingPaymentModal = ({ modalVisible, setModalVisible, item }) => {
  const [loading, setLoading] = useState(false);
  // #################### get Payment Advance 70%
  const _getTakePaymentApi = () => {
    setLoading(true);
    let config = {
      url: ApiUrl.getTakePaymentApi,
      method: "post",
      body: {
        vendorId: item?.vendorId,
        quotationId: item?._id,
      },
    };
    APIRequest(
      config,
      (res) => {
        if (res?.success == true) {
          setModalVisible(false);
        }
        alert(res?.message);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        if (err?.message) {
          alert(
            "you are Allready send Request for this Payment, please wait for Approval"
          );
          setModalVisible(false);
        }
      }
    );
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        {loading && (
          <ActivityIndicator
            color={Colors.btnColor}
            size="large"
            style={styles.loader}
          />
        )}
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Get Remaining Advance</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => _getTakePaymentApi()}
          >
            <Text
              style={[
                styles.buttonText,
                { textAlign: "center", fontFamily: Fonts.LATO_BOLD700 },
              ]}
            >
              Request for{" "}
              <Text style={{ backgroundColor: Colors.Black }}></Text>
              Get Remaining Payment
            </Text>
          </TouchableOpacity>
          {/* Close Button */}
          <TouchableOpacity style={{}} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.Black,
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
  button: {
    backgroundColor: Colors.btnColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: hp(2),
  },
  closeText: {
    marginTop: 20,
    color: "red",
    fontSize: 18,
    fontFamily: Fonts.LATO_BOLD700,
  },
});

export default GetRemainingPaymentModal;
