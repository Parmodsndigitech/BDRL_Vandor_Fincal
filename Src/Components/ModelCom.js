import { useState } from "react";
import {
  Text,
  Modal,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import ImagePath from "../Utails/ImagePath";
const { height, width } = Dimensions.get("window");
const ModelCom = ({
  addmodel,
  closeModel,
  props,
  setaddress,
  addressModel,
}) => {
  const [address, setAddress] = useState({
    country: "",
    state: "",
    homeNo: "",
    street1: "",
    street2: "",
    city: "",
    postalCode: "",
  });
  const handleInputChange = (key, value) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [key]: value,
    }));
  };
  const validateFields = () => {
    if (
      !address.country ||
      !address.state ||
      !address.homeNo ||
      !address.street1 ||
      !address.city ||
      !address.postalCode
    ) {
      Alert.alert("Error", "All fields are required");
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (validateFields()) {
      setaddress(address);
      closeModel();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={addmodel}>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0,0,0.6)",
        }}
        activeOpacity={1}
      >
        <View
          style={{
            marginTop: height / 4,
            width: width / 1.19,
            height: height / 2.3,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 10,
            alignSelf: "center",
            backgroundColor: "green",
            backfaceVisibility: "visible",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>
              Add Address
            </Text>
            <TouchableOpacity style={{}} onPress={() => closeModel()}>
              <Image
                source={ImagePath.BottomActivity}
                style={{ height: 18, width: 18, tintColor: "green" }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 10, marginTop: 5 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "green" }}>
              Address
            </Text>

            <ScrollView
              style={{ height: 220 }}
              showsVerticalScrollIndicator={false}
            >
              {/ houseNo /}
              <View
                style={{
                  width: "100%",
                  height: 34,
                  borderWidth: 0.5,
                  borderRadius: 7,
                  backgroundColor: "#EEEEEE",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                    color: "green",
                  }}
                  placeholder="Apt No./House No"
                  placeholderTextColor={"green"}
                  maxLength={5}
                  keyboardType="numeric"
                  value={address.homeNo}
                  onChangeText={(value) => handleInputChange("homeNo", value)}
                />
              </View>
              {/ street1 /}
              <View
                style={{
                  width: "100%",
                  height: 34,
                  borderWidth: 0.5,
                  borderRadius: 7,
                  backgroundColor: "#EEEEEE",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                    color: "green",
                  }}
                  placeholder="Street1"
                  placeholderTextColor={"green"}
                  keyboardType="ascii-capable"
                  value={address.street1}
                  onChangeText={(value) => handleInputChange("street1", value)}
                />
              </View>
              {/ street2 /}
              <View
                style={{
                  width: "100%",
                  height: 34,
                  borderWidth: 0.5,
                  borderRadius: 7,
                  backgroundColor: "#EEEEEE",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                    color: "green",
                  }}
                  placeholder="Street2"
                  placeholderTextColor={"green"}
                  keyboardType="ascii-capable"
                  value={address.street2}
                  onChangeText={(value) => handleInputChange("street2", value)}
                />
              </View>
              {/ City /}
              <View
                style={{
                  width: "100%",
                  height: 34,
                  borderWidth: 0.5,
                  borderRadius: 7,
                  backgroundColor: "#EEEEEE",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                    color: "green",
                  }}
                  placeholder="City"
                  placeholderTextColor={"green"}
                  keyboardType="ascii-capable"
                  value={address.city}
                  onChangeText={(value) => handleInputChange("city", value)}
                />
              </View>
              {/ State /}
              <View
                style={{
                  width: "100%",
                  height: 34,
                  borderWidth: 0.5,
                  borderRadius: 7,
                  backgroundColor: "#EEEEEE",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                    color: "green",
                  }}
                  placeholder="State"
                  placeholderTextColor={"green"}
                  value={address.state}
                  onChangeText={(value) => handleInputChange("state", value)}
                />
              </View>
              {/ Country /}
              <View
                style={{
                  width: "100%",
                  height: 34,
                  borderWidth: 0.5,
                  borderRadius: 7,
                  backgroundColor: "#EEEEEE",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                    color: "green",
                  }}
                  placeholder="Country"
                  placeholderTextColor={"green"}
                  value={address.country}
                  onChangeText={(value) => handleInputChange("country", value)}
                />
              </View>
              {/* {/ Zip/Postal Code /} */}
              <View
                style={{
                  width: "100%",
                  height: 34,
                  borderWidth: 0.5,
                  borderRadius: 7,
                  backgroundColor: "#EEEEEE",
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                    color: "green",
                  }}
                  placeholder="Zip/Postal Code"
                  placeholderTextColor={"green"}
                  value={address.postalCode}
                  keyboardType="numeric"
                  maxLength={7}
                  onChangeText={(value) =>
                    handleInputChange("postalCode", value)
                  }
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={{
                borderRadius: 7,
                padding: 2,
                width: "35%",
                borderWidth: 1,
                borderColor: "green",
                alignSelf: "flex-end",
                marginTop: 10,
              }}
              onPress={() => handleSubmit()}
            >
              <Text
                style={{
                  color: "green",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModelCom;

const styles = StyleSheet.create({});
