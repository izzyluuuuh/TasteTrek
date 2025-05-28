import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoryData } from "../constants";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // className="space-x-4"
        contentContainerStyle={{
          paddingHorizontal: 7,
          flexDirection: "row",
          columnGap: 12,
        }}
      >
        {categories.map((category, index) => {
          // let isActive = category.strCategory == activeCategory;
          // let activeButtonClass = isActive ? "bg-[#f64e32] " : "bg-black/10";
          let isActive = category.strCategory === activeCategory;
          let activeButtonStyle = {
            backgroundColor: isActive ? "#EEB902" : "rgba(0,0,0,0.8)",
            borderRadius: 12,
            padding: 6,
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(category.strCategory)}
              // className="flex items-center space-y-1"
              style={{
                alignItems: "center",
                marginRight: index === categories.length - 1 ? 0 : 16, // optional spacing between buttons
              }}
            >
              <View style={activeButtonStyle}>
              {/* <View className={"rounded-xl p-[6px] " + activeButtonClass}> */}
                <Image
                  source={{
                    uri: category.strCategoryThumb,
                  }}
                  style={{
                    width: hp(6),
                    height: hp(6),
                    borderRadius: hp(6) / 2,
                  }}
                  // className="rounded-full"
                />
              </View>
              <Text
                // className="text-neutral-800 "
                style={{
                  color: "#1f2937",
                  fontSize: hp(1.6),
                  marginTop: 4,
                }}
              >
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}