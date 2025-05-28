import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { HeartIcon } from 'react-native-heroicons/solid';
import Animated from 'react-native-reanimated';

export default function RecipesCard({ index, navigation, item, isFavourite = false, toggleFavorite, goToRecipeDetails }) {
  let isEven = index % 2 === 0;

  return (
    <View>
      <Pressable
        style={{
          backgroundColor: isEven ? '#f0f0f0' : '#e0e0e0',
          padding: 10,
          marginVertical: 5,
          borderRadius: 8,
        }}
        onPress={() => goToRecipeDetails ? goToRecipeDetails(item) : navigation.navigate("RecipeDetails", { ...item })}
      >
        <Animated.Image 
          source={{ uri: item.strMealThumb }}
          style={{
            width: '100%',
            height: 150,
            borderRadius: 8,
          }}
        sharedTransitionTag={item.strMeal}
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.5)"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: hp(20),
            borderBottomLeftRadius: 11,
            borderBottomRightRadius: 35,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Heart Icon for favorite */}
        {toggleFavorite && (
          <Pressable
            style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}
            onPress={() => toggleFavorite(item)}
          >
            <HeartIcon size={24} color={isFavourite ? '#E01300' : 'gray'} />
          </Pressable>
        )}

        <Text
          style={[
            {
              fontSize: hp(2.2),
              color: 'white',
              position: 'absolute',
              bottom: 25, // approx bottom-7
              left: 8,    // approx left-2
              fontWeight: '500',
              maxWidth: '80%',
              marginLeft: 8,
            }
          ]}
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </View>
  )
}