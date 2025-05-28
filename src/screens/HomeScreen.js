import { View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import { useEffect, useState, useContext } from "react";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { categoryData } from '../constants';
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';
import { StatusBar } from "expo-status-bar";
import { HeartIcon } from 'react-native-heroicons/solid';
import { ProfileImageContext } from '../components/ProfileImage';

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoadingMeals, setIsLoadingMeals] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { profileImage } = useContext(ProfileImageContext);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    setIsLoadingMeals(true);
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
        console.log(response.data.categories);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const getRecipes = async (category = "Beef") => {
    setIsLoadingMeals(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingMeals(false);
    }
  };

  // Filter meals by search text (strMeal, strCategory, strArea)
  const filteredMeals = searchText.trim().length
    ? meals.filter((meal) => {
        const search = searchText.trim().toLowerCase();
        return (
          meal.strMeal?.toLowerCase().includes(search) ||
          (meal.strCategory && meal.strCategory.toLowerCase().includes(search)) ||
          (meal.strArea && meal.strArea.toLowerCase().includes(search))
        );
      })
    : meals;

  // Handler to navigate to FavoritesScreen
  const goToFavorites = () => {
    navigation.navigate('FavoritesScreen', { favorites, toggleFavorite });
  };

  // Handler to navigate to RecipeDetailsScreen with favorites and setFavorites
  const goToRecipeDetails = (item) => {
    navigation.navigate('RecipeDetails', {
      ...item,
      favorites,
      setFavorites: (favList) => setFavorites(favList),
    });
  };

  // Handler to toggle favorite from anywhere
  const toggleFavorite = (meal) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.idMeal === meal.idMeal);
      if (exists) {
        return prev.filter((fav) => fav.idMeal !== meal.idMeal);
      } else {
        return [...prev, meal];
      }
    });
  };

  return (
    // <View className="flex-1 bg-white">
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" translucent />
      {/* <View style={{ height: 10, backgroundColor: 'white' }} /> */}

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
            paddingTop: hp(6),
            paddingHorizontal: 0,
            rowGap: hp(2.5),
            backgroundColor: '#fff',
          }}
        >
          {/* Top Bar: Adjustments Icon and Avatar */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 18,
              marginBottom: hp(2),
            }}
          >
            <AdjustmentsHorizontalIcon size={hp(4)} color="#E01300" />
            <HeartIcon
              size={hp(4)}
              strokeWidth={4}
              color="#E01300"
              style={{ marginLeft: 200 }}
              onPress={goToFavorites}
            />
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
              <Image
                source={profileImage ? { uri: profileImage } : require("../../assets/images/lisa.jpg")}
                style={{
                  width: hp(5),
                  height: hp(5),
                  borderRadius: hp(2.5),
                  borderWidth: 2,
                  borderColor: '#1C3B2A',
                  resizeMode: "cover",
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Headlines */}
          <View style={{ marginBottom: hp(2), alignItems: 'center', paddingHorizontal: 18 }}>
            <Text
              style={{
                fontSize: hp(3.7),
                fontWeight: "bold",
                color: "#000",
                letterSpacing: 1.2,
                textAlign: 'center',
                marginBottom: 2,
              }}
            >
              Trek the Taste Trail
            </Text>
            <Text style={{ color: "#1C3B2A", fontSize: hp(2), fontWeight: '500', textAlign: 'center', marginTop: 2, letterSpacing: 0.5 }}>
              Find your next favorite meal here
            </Text>
          </View>

          {/* Search Bar */}
          <View
            style={{
              marginHorizontal: 18,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#E01300",
              borderRadius: 16,
              padding: 8,
              backgroundColor: "#fff",
              shadowColor: '#E01300',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 2,
              marginBottom: hp(2),
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 999,
                padding: 8,
                marginRight: 6,
              }}
            >
              <MagnifyingGlassIcon size={hp(2.7)} color={"#1C3B2A"} strokeWidth={3} />
            </View>
            <TextInput
              placeholder='Search recipes...'
              placeholderTextColor={"#9ca3af"}
              value={searchText}
              onChangeText={setSearchText}
              style={{
                fontSize: hp(2),
                flex: 1,
                paddingLeft: 6,
                color: '#1C3B2A',
                letterSpacing: 1.1,
                backgroundColor: 'transparent',
              }}
            />
          </View>

          {/* Categories */}
          <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
            {categoryData.length ? (
              <Categories
                categories={categoryData}
                activeCategory={activeCategory}
                handleChangeCategory={handleChangeCategory}
              />
            ) : null}
          </View>

          {/* Recipes */}
          <View style={{ paddingHorizontal: 10 }}>
            {isLoadingMeals ? (
              <View style={{ alignItems: 'center', marginTop: 30 }}>
                <Text style={{ color: '#000', fontSize: hp(2.2), fontWeight: 'bold' }}>Loading recipes...</Text>
              </View>
            ) : (
              <Recipes meals={filteredMeals} categories={categories} favorites={favorites} toggleFavorite={toggleFavorite} goToRecipeDetails={goToRecipeDetails} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
