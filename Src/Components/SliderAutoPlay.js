import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ImagePath from "../Utails/ImagePath";
import { hp, wp } from "../Utails/Responsive";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function SliderAutoPlay() {
  const data = [
    {
      id: 1,
      title: "Slide 1",
      image: ImagePath.sliderImg01,
    },
    {
      id: 2,
      title: "Slide 2",
      image: ImagePath.sliderImg01,
    },
    {
      id: 3,
      title: "Slide 3",
      image: ImagePath.sliderImg01,
    },
    {
      id: 4,
      title: "Slide 4",
      image: ImagePath.sliderImg01,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const autoRotate = () => {
    const nextIndex = (currentIndex + 1) % data.length;
    flatListRef?.current?.scrollToIndex({
      animated: true,
      index: nextIndex,
    });
    setCurrentIndex(nextIndex);
  };
  useEffect(() => {
    const interval = setInterval(autoRotate, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentIndex(index);
    }
  });
  const viewConfigRef = useRef({
    waitForInteraction: false,
    viewAreaCoveragePercentThreshold: 50,
  });
  const renderItems = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image
        source={item.image}
        style={styles.sliderImg}
        // resizeMode='
      />
    </View>
  );

  return (
    <View style={styles.contianer}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.innerContainer}>
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: currentIndex == index ? 30 : 8,
                height: 8,
                borderRadius: 10,
                backgroundColor:
                  currentIndex == index ? "rgba(04,14,12,0.9)" : "#fff",
                margin: wp(1),
                marginTop: -hp(6),
              }}
            ></View>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contianer: {
    width: "100%",
    alignSelf: "center",
  },
  innerContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
  },
  carouselItem: {
    width: windowWidth,
    marginTop: hp(0.7),
    marginBottom: hp(1),
    justifyContent: "center",
    alignSelf: "center",
  },
  sliderImg: {
    width: "92%",
    height: hp(15),
    borderRadius: wp(2),
  },
});
