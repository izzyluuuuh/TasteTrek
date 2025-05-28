import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import RecipesCard from '../components/RecipesCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const favorites = route.params?.favorites || [];
  const toggleFavorite = route.params?.toggleFavorite;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      {/* Back Button */}
      <View style={{ position: 'absolute', top: 58, left: 16, zIndex: 10 }}>
        <ChevronLeftIcon
          size={24}
          color={'#000'}
          strokeWidth={3.5}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 10 }}>
        <Text style={{
          fontSize: hp(4),
          fontWeight: 'bold',
          color: '#000',
          letterSpacing: 1.2,
          marginBottom: 4,
        }}>
          Favorites
        </Text>
        <Text style={{ color: '#1C3B2A', fontSize: 16, opacity: 0.7, letterSpacing: 0.5 }}>
          Your saved recipes
        </Text>
      </View>
      {favorites.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <Text style={{ color: '#B0B0B0', fontSize: 18, fontWeight: '500', letterSpacing: 0.5 }}>
            No favorite recipes yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idMeal}
          numColumns={3}
          contentContainerStyle={{ padding: 8, gap: 3 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item, index }) => (
            <View style={{
              flex: 1,
              margin: 4,
              backgroundColor: '#fff',
              borderRadius: 14,
            }}>
              <RecipesCard
                item={item}
                index={index}
                navigation={navigation}
                isFavourite={true}
                toggleFavorite={toggleFavorite}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
