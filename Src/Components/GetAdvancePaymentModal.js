// GetAdvancePaymentModal.js
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
const GetAdvancePaymentModal = ({ modalVisible, setModalVisible, item }) => {
  const [advancepayment70, setAdvancePayment70] = useState("70%");
  const [advancepayment80, setAdvancePayment80] = useState("80%");
  const [advancepayment90, setAdvancePayment90] = useState("90%");
  const [loading, setLoading] = useState(false);
  // console.log('data .....vendorId',item?.vendorId)
  // console.log('data .....item?._id',item?._id)
  _getAdvancePayment70Fun = async () => {
    setAdvancePayment70;
    _getAdvancePayment70Api();
  };
  _getAdvancePayment80Fun = async () => {
    setAdvancePayment80;
    _getAdvancePayment80Api();
  };
  _getAdvancePayment90Fun = async () => {
    setAdvancePayment90;
    _getAdvancePayment90Api();
  };
  //  get Payment Advance 70%
  const _getAdvancePayment70Api = () => {
    setLoading(true);
    let config = {
      url: ApiUrl.getAdvancePaymentApi,
      method: "post",
      body: {
        takeAdvance: advancepayment70,
        vendorId: item?.vendorId,
        quotationId: item?._id,
      },
    };
    APIRequest(
      config,
      (res) => {
        // console.log(
        //   "without filter data is hereee.......====================================",
        //   res?.data
        // );
        if (res?.success == true) {
          setModalVisible(false);
        }
        // ToastModel({ type: "success", text2: res?.message });
        alert(res?.message);
        setLoading(false);
      },
      (err) => {
        console.log("_getAllQueryquotation", err);
        setLoading(false);
        if (err?.message) {
          // ToastModet({ type: "error", text2: err?.message });
          alert("you are Allready send Advance Payment Request Please wait for Approval");
          setModalVisible(false);
        }
      }
    );
  };
  //  get Payment Advance 80%
  const _getAdvancePayment80Api = () => {
    setLoading(true);
    let config = {
      url: ApiUrl.getAdvancePaymentApi,
      method: "post",
      body: {
        takeAdvance: advancepayment80,
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
        console.log("_getAllQueryquotation", err);
        setLoading(false);
        if (err?.message) {
          alert("you are Allready send Advance Payment Request Please wait for Approval");
          setModalVisible(false);
        }
      }
    );
  };
  //  get Payment Advance 90%
  const _getAdvancePayment90Api = () => {
    setLoading(true);
    let config = {
      url: ApiUrl.getAdvancePaymentApi,
      method: "post",
      body: {
        takeAdvance: advancepayment90,
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
        console.log("_getAllQueryquotation", err);
        setLoading(false);
        if (err?.message) {
          // ToastModet({ type: "error", text2: err?.message });
          alert("you are Allready send Advance Payment Request Please wait for Approval");
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
          <Text style={styles.modalTitle}>Get Payment Advance</Text>

          {/* Three Buttons Inside Modal 70 */}
          {/* advancepayment70 */}
          {advancepayment70 && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => _getAdvancePayment70Fun()}
            >
              <Text
                style={[
                  styles.buttonText,
                  { textAlign: "center", fontFamily: Fonts.LATO_BOLD700 },
                ]}
              >
                {" "}
                Request for{" "}
                <Text style={{ backgroundColor: Colors.Black }}>
                  {" "}
                  70%{" "}
                </Text>{" "}
                Payment Advance
              </Text>
            </TouchableOpacity>
          )}
          {/* advancepayment80 */}
          {advancepayment80 && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => _getAdvancePayment80Fun()}
            >
              <Text
                style={[
                  styles.buttonText,
                  { textAlign: "center", fontFamily: Fonts.LATO_BOLD700 },
                ]}
              >
                {" "}
                Request for{" "}
                <Text style={{ backgroundColor: Colors.Black }}>
                  {" "}
                  80%{" "}
                </Text>{" "}
                Payment Advance
              </Text>
            </TouchableOpacity>
          )}
          {/* advancepayment90 */}
          {advancepayment90 && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => _getAdvancePayment90Fun()}
            >
              <Text
                style={[
                  styles.buttonText,
                  { textAlign: "center", fontFamily: Fonts.LATO_BOLD700 },
                ]}
              >
                {" "}
                Request for{" "}
                <Text style={{ backgroundColor: Colors.Black }}>
                  {" "}
                  90%{" "}
                </Text>{" "}
                Payment Advance
              </Text>
            </TouchableOpacity>
          )}

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
export default GetAdvancePaymentModal;
