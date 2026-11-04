import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { ThemedText as Text } from '@/components/themed-text';
import { recipes, type Recipe } from '@/data/recipes';
import { FAVORITES_KEY, getCustomRecipes } from '@/services/recipe-storage';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const checkFavorite = useCallback(async () => {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    const favorites: string[] = stored ? JSON.parse(stored) : [];
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const loadRecipe = useCallback(async () => {
    const customRecipes = await getCustomRecipes();
    const foundCustom = customRecipes.find((recipeItem) => recipeItem.id === id);
    const foundDefault = recipes.find((recipeItem) => recipeItem.id === id);
    setRecipe(foundCustom ?? foundDefault ?? null);
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      checkFavorite();
      loadRecipe();
    }, [checkFavorite, loadRecipe])
  );

  const toggleFavorite = async () => {
    if (!recipe) return;

    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    const favorites: string[] = stored ? JSON.parse(stored) : [];
    const updated = isFavorite
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    setIsFavorite(!isFavorite);

    Toast.show({
      type: 'success',
      text1: isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      text2: recipe.name,
      visibilityTime: 1500,
    });
  };

  if (!recipe) {
    return (
      <View style={styles.notFound}>
        <Text>Receita não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerBackButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{recipe.name}</Text>
      </View>

      <View style={styles.imageWrapper}>
        <Image source={{ uri: recipe.image }} style={styles.image} contentFit="cover" transition={300} />
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#e63946' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text type="title" style={styles.name}>{recipe.name}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={18} color="#ffffff" />
            <Text style={styles.metaText}>{recipe.prepTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={18} color="#ffffff" />
            <Text style={styles.metaText}>{recipe.servings} porções</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="pricetag-outline" size={18} color="#ffffff" />
            <Text style={styles.metaText}>{recipe.category}</Text>
          </View>
        </View>

        <Text type="subtitle" style={styles.sectionTitle}>Ingredientes</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.bullet} />
            <Text style={styles.listText}>{ingredient}</Text>
          </View>
        ))}

        <Text type="subtitle" style={styles.sectionTitle}>Modo de preparo</Text>
        {recipe.steps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.listText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 10,
    backgroundColor: '#000000',
  },
  headerBackButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 22,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  imageWrapper: {
    position: 'relative',
    backgroundColor: '#000000',
  },
  image: {
    width: '100%',
    height: 260,
  },
  favoriteButton: {
    position: 'absolute',
    top: 18,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
    backgroundColor: '#000000',
  },
  name: {
    marginBottom: 12,
    color: '#ffffff',
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#ffffff',
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 10,
    color: '#ffffff',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e63946',
    marginRight: 10,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#ffffff',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e63946',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});