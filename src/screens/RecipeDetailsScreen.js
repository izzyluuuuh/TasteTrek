import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import CachedImage from '../../utils/index';
import CachedImage from '../../utils';
import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import Loading from '../components/Loading';
import axios from 'axios';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function RecipeDetailsScreen(props) {
  let item = props.route.params;
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Get favorites and setFavorites from params if available
  const favorites = props.route.params?.favorites || [];
  const setFavorites = props.route.params?.setFavorites;
  const isFavourite = favorites.some(fav => fav.idMeal === item.idMeal);

  useEffect(() => {
    getMealData(item.idMeal);
  }, [item.idMeal]);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handler to toggle favorite for this meal
  const handleToggleFavorite = () => {
    if (setFavorites) {
      if (isFavourite) {
        setFavorites(favorites.filter(fav => fav.idMeal !== item.idMeal));
      } else {
        setFavorites([...favorites, item]);
      }
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#fff' }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20 }}
    >
      <StatusBar style="dark" translucent />
      <View style={{ height: 8, backgroundColor: '#fff' }} />
      {/* Recipe Image */}
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{ width: wp(100), height: hp(45) }}
        />
      </View>
      {/* Back Button and Favorite Icon */}
      <View style={{
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
      }}>
        <View style={{ padding: 8, borderRadius: 999, backgroundColor: 'white', marginLeft: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon
              size={hp(3.5)}
              color={'#E01300'}
              strokeWidth={4.5}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={{ padding: 8, borderRadius: 999, backgroundColor: 'white', marginRight: 0 }}>
          <TouchableOpacity onPress={handleToggleFavorite}>
            <HeartIcon
              size={hp(3.5)}
              color={isFavourite ? '#E01300' : 'gray'}
              strokeWidth={4.5}
            />
          </TouchableOpacity>
        </View> */}
      </View>
      {/* Meal Description */}
      {isLoading ? (
        <Loading size="large" style={{ marginTop: 64 }} />
      ) : (
        <View
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: hp(3.5),
            backgroundColor: '#fff',
            marginTop: -40,
            paddingHorizontal: 0,
            // shadowColor: '#f64e32', 
            // shadowOffset: { width: 0, height: 6 },
            // shadowOpacity: 0.5,
            // shadowRadius: 16,
            // elevation: 1,
          }}
        >
          {/* Meal Name & Category */}
          <View style={{ marginBottom: 16, paddingHorizontal: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: hp(3.5), fontWeight: 'bold', color: '#1C3B2A', marginBottom: 2, textAlign: 'center', letterSpacing: 1.1 }}>
              {meal?.strMeal}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Text style={{ color: '#1C3B2A', fontSize: hp(2), fontWeight: '600', textAlign: 'center', marginRight: 8, letterSpacing: 0.5 }}>
                {meal?.strCategory}
              </Text>
              <View style={{ backgroundColor: '#F49D37', borderRadius: 7, paddingHorizontal: 8, paddingVertical: 2 }}>
                <Text style={{ color: '#fff', fontSize: hp(1.5), fontWeight: '600', textAlign: 'center' }}>
                  {meal?.strArea}
                </Text>
              </View>
            </View>
          </View>
          {/* Ingredients List */}
          <View style={{ marginBottom: 22, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', color: '#1C3B2A', marginBottom: 12, letterSpacing: 0.7, lineHeight: hp(3.2) }}>
              Ingredients
            </Text>
            <View style={{ marginLeft: 4 }}>
              {ingredientsIndexes(meal).map((i) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }} key={i}>
                  <View style={{ backgroundColor: '#E01300', borderRadius: 999, height: hp(1), width: hp(1), marginRight: 12 }} />
                  <Text style={{ fontWeight: '00', color: '#1C3B2A', fontSize: hp(2.1), marginRight: 10, lineHeight: hp(2.8) }}>
                    {meal["strIngredient" + i]}
                  </Text>
                  <Text style={{ fontWeight: '700', color: '#374151', fontSize: hp(2), lineHeight: hp(2.8) }}>
                    {meal["strMeasure" + i]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {/* Instructions */}
          <Animated.View
            style={{ padding: 20, backgroundColor: '#f9fafb', borderRadius: 18, marginHorizontal: 8, marginBottom: 20, borderWidth: 1.5, borderColor: '#000', shadowColor: '#1C3B2A', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}
            entering={FadeInDown.delay(400).duration(700).springify().damping(12)}
>
            <Text style={{ fontWeight: 'bold', color: '#1C3B2A', fontSize: hp(2.5), marginBottom: 12, letterSpacing: 0.7, textAlign: 'center', lineHeight: hp(3.2) }}>
              Instructions
            </Text>
            {meal?.strInstructions
              ? (() => {
                  let stepNumber = 1;
                  return meal.strInstructions
                    .split(/\r?\n|\.\s+/)
                    .filter(Boolean)
                    .map((step, idx) => {
                      const trimmed = step.trim();
                      // If the line is 'STEP N', treat as header
                      if (/^STEP \d+/i.test(trimmed)) {
                        return (
                          <Text key={idx} style={{ color: '#E01300', fontSize: hp(2.1), fontWeight: '700', marginTop: 16, marginBottom: 10, letterSpacing: 0.7, lineHeight: hp(2.8) }}>
                            {trimmed}
                          </Text>
                        );
                      }
                      // If the line is just a number (e.g. '1', '2', '3'), treat as header and convert to 'STEP N'
                      if (/^\d+$/.test(trimmed)) {
                        return (
                          <Text key={idx} style={{ color: '#E01300', fontSize: hp(2.1), fontWeight: '700', marginTop: 16, marginBottom: 10, letterSpacing: 0.7, lineHeight: hp(2.8) }}>
                            {`STEP ${trimmed}`}
                          </Text>
                        );
                      }
                      // Otherwise, treat as a normal step
                      const content = (
                        <Text key={idx} style={{ color: '#1C3B2A', fontSize: hp(2), marginBottom: 8, lineHeight: hp(2.8) }}>
                          {`${stepNumber}. ${trimmed.replace(/^\d+\.\s*/, '')}`}
                        </Text>
                      );
                      stepNumber++;
                      return content;
                    });
                })()
              : null}
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}