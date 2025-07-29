import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { hp, wp } from "../../Utails/Responsive";
import StatusBarr from "../../Components/StatusBarr";
import Colors from "../../Utails/Colors";
import ImagePath from "../../Utails/ImagePath";

const B = () => {
  const [b, setB] = useState("");
  useEffect(() => {
    setTimeout(() => {
      let B = "B";
      setB(B);
    }, 1000);
  }, []);
  return (
    <View>
      <Text style={styles.BDRL}>{b}</Text>
    </View>
  );
};
const D = () => {
  const [d, setD] = useState("");
  useEffect(() => {
    setTimeout(() => {
      let D = "D";
      setD(D);
    }, 2000);
  }, []);
  return (
    <View>
      <Text style={[styles.BDRL, { color: Colors.btnColor }]}>{d}</Text>
    </View>
  );
};
const R = () => {
  const [r, setR] = useState("");
  useEffect(() => {
    setTimeout(() => {
      let R = "R";
      setR(R);
    }, 3000);
  }, []);
  return (
    <View>
      <Text style={styles.BDRL}>{r}</Text>
    </View>
  );
};
const L = () => {
  const [l, setL] = useState("");
  useEffect(() => {
    setTimeout(() => {
      let L = "L";
      setL(L);
    }, 4000);
  }, []);
  return (
    <View>
      <Text style={[styles.BDRL, { color: Colors.btnColor }]}>{l}</Text>
    </View>
  );
};
const Splash = () => {
  const [splashImg, setSplashImg] = useState("");

  useEffect(() => {
    setTimeout(() => {
      _imageShow();
    }, 5000);
  });
  const _imageShow = () => {
    setSplashImg(ImagePath.splashLogo);
  };

  return (
    <View style={styles.contianer}>
      <StatusBarr backgroundColor={Colors.White} barStyle={"dark-content"} />
      <View style={{ flexDirection: "row" }}>
        <B />
        <D />
        <R />
        <L />
      </View>
      <View style={{ width: wp(40), height: hp(7.5) }}>
        <Image
          source={splashImg}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
export default Splash;
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.White,
  },
  BDRL: { fontSize: hp(4), color: Colors.Black, fontWeight: "600" },
});
