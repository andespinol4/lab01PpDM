import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { RecipeCard } from '@/components/recipe-cards';
import { ThemedText as Text } from '@/components/themed-text';
import { recipes } from '@/data/recipes';

const FAVORITES_KEY = '@gastroalquimia_favorites';

export default function FavoritosScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);

  const loadFavorites = useCallback(async () => {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    setFavorites(stored ? JSON.parse(stored) : []);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const toggleFavorite = async (id: string, name: string) => {
    const updated = favorites.filter((f) => f !== id);
    setFavorites(updated);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

    Toast.show({
      type: 'success',
      text1: 'Removido dos favoritos',
      text2: name,
      visibilityTime: 1500,
    });
  };

  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  return (
    <View style={styles.container}>
      <Text type="title" style={styles.title}>Favoritos</Text>

      {favoriteRecipes.length === 0 ? (
        <View style={styles.emptyWrapper}>
          <Text style={styles.emptyText}>Você ainda não favoritou nenhuma receita.</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              isFavorite={true}
              onPress={() => router.push(`/recipe/${item.id}`)}
              onToggleFavorite={() => toggleFavorite(item.id, item.name)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 16,
  },
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  list: {
    paddingBottom: 20,
  },
});