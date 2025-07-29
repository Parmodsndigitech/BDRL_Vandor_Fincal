import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../Utails/Colors";
import Fonts from "../Utails/Fonts";
import ButtonComp from "./ButtonComp";
import Modal from "react-native-modal";
import InputComp from "./InputComp";
import { hp, wp } from "../Utails/Responsive";
import StringsName from "../Utails/StringsName";
import DocumentPicker from "react-native-document-picker";
// Model small components
const ModelBankDetials = ({
  modalVisible,
  setModalVisible,
  bankName,
  setBankAcNo,
  setBankName,
  bankAcNo,
  bankIfsc,
  setBankIfsc,
  bankCenclledCheque,
  setBankCenclledCheque,
}) => {
  const chooseImageSource = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setBankCenclledCheque(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the picker");
      } else {
        console.error("DocumentPicker Error: ", err);
      }
    }
  };

  return (
    <View style={{ position: "absolute", bottom: hp(0) }}>
      <Modal
        animationType="slide"
        transparent={true}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.horizontal}
              />
            </TouchableOpacity>
            <ScrollView>
              <Text style={styles.titleTxt}>{StringsName.bankName}</Text>
              <InputComp
                placeholder={StringsName.enterBankName}
                containerStyle={styles.containerStyle}
                // keyboardType={true}
                value={bankName}
                onChangeText={(txt) => {
                  setBankName(txt);
                }}
              />
              <Text style={styles.titleTxt}>{StringsName.bankAcNo}</Text>
              <InputComp
                placeholder={StringsName.enterBankAcNo}
                containerStyle={styles.containerStyle}
                keyboardType={true}
                value={bankAcNo}
                onChangeText={(txt) => {
                  setBankAcNo(txt);
                }}
              />
              <Text style={styles.titleTxt}>{StringsName.BankIfsc}</Text>
              <InputComp
                placeholder={StringsName.enterBankIfsc}
                containerStyle={styles.containerStyle}
                inputStyleInner={{ textTransform: "uppercase" }}
                value={bankIfsc}
                onChangeText={(txt) => {
                  setBankIfsc(txt);
                }}
              />
              <View>
                <Text style={styles.titleTxt}>
                  {StringsName.cencelledCheckPhoto}
                </Text>
                <TouchableOpacity
                  onPress={chooseImageSource}
                  style={[
                    styles.addBankDetailsBtn,
                    { backgroundColor: Colors.tabColor },
                  ]}
                >
                  <View>
                    {bankCenclledCheque?.name ? (
                      <Text
                        style={[
                          styles.enterBankDetailsBntTxt,
                          { width: "90%" },
                        ]}
                        numberOfLines={1}
                      >
                        {bankCenclledCheque?.path}
                        {bankCenclledCheque?.name}
                      </Text>
                    ) : (
                      <Text style={styles.enterBankDetailsBntTxt}>
                        {StringsName.uploadCencelledCheckPhoto}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={{color:Colors.gray878787,fontSize:hp(1.4)}}><Text style={{color:Colors.Black}}>accpeted format: </Text>JPEG, JPG, PNG</Text>
              </View>

              <View style={styles.btnContianer}>
                <ButtonComp
                  disabled={
                    bankName && bankAcNo && bankIfsc && bankCenclledCheque
                      ? false
                      : true
                  }
                  onPress={() => setModalVisible(!modalVisible)}
                  title={"Save"}
                  containerStyle={{
                    width: "60%",
                    alignSelf: "center",
                    backgroundColor:
                      bankName && bankAcNo && bankIfsc && bankCenclledCheque
                        ? Colors.btnColor
                        : Colors.lightGray,
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ModelBankDetials;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },

  modalContent: {
    position: "absolute",
    bottom: hp(0),
    height: hp(60),
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  btnContianer: {
    backgroundColor: Colors.White,
    flex: 0.3,
    paddingTop: hp(2),
  },
  enterBankDetailsBntTxt: {
    color: Colors.gray878787,
    fontSize: hp(1.8),
    fontFamily: Fonts.LATO_BOLD700,
  },
  titleTxt: {
    color: Colors[525252],
    fontSize: hp(2.2),
    fontFamily: Fonts.LATO_BOLD700,
    marginVertical: hp(0.5),
    marginTop: hp(1.5),
  },
  horizontal: {
    alignSelf: "center",
    width: "15%",
    height: hp(0.5),
    backgroundColor: Colors.Black,
    borderRadius: wp(10),
  },
  addBankDetailsBtn: {
    borderColor: Colors[525252],
    borderRadius: wp(1.5),
    height: hp(6),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(3),
  },
});
