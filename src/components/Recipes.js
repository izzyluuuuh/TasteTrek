import { View, Text } from 'react-native'
import React from 'react'
import RecipesCard from './RecipesCard';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import MasonryList from '@react-native-seoul/masonry-list';
import Loading from './Loading';
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Recipes({ meals, categories, favorites = [], toggleFavorite, goToRecipeDetails }) {
    const navigation = useNavigation();

  return (
    <Animated.View style={{ marginHorizontal: 16, rowGap: 16 }}
    entering={FadeInDown.delay(200).duration(700).springify().damping(12)}>
        <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
            {meals.length} Recipes
        </Text>

        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)}>
            {
                categories.length == 0 || meals.length == 0 ? (
                    <Loading size="large" color="#000" /> 
                ) : (
                    <MasonryList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }) => (
                        <RecipesCard
                          item={item}
                          index={i}
                          navigation={navigation}
                          isFavourite={favorites.some(fav => fav.idMeal === item.idMeal)}
                          toggleFavorite={toggleFavorite}
                          goToRecipeDetails={goToRecipeDetails}
                        />
                )}
                onEndReachedThreshold={0.1} />
            )}
        </Animated.View>
      {/* <RecipesCard/> */}
    </Animated.View>
  )
}