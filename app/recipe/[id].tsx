import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { ThemedText as Text } from '@/components/themed-text';
import { recipes } from '@/data/recipes';

const FAVORITES_KEY = '@gastroalquimia_favorites';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const recipe = recipes.find((r) => r.id === id);
  const [isFavorite, setIsFavorite] = useState(false);

  const checkFavorite = useCallback(async () => {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    const favorites: string[] = stored ? JSON.parse(stored) : [];
    setIsFavorite(favorites.includes(id));
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      checkFavorite();
    }, [checkFavorite])
  );

  const toggleFavorite = async () => {
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
      text2: recipe?.name,
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
      <View style={styles.imageWrapper}>
        <Image source={{ uri: recipe.image }} style={styles.image} contentFit="cover" transition={300} />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
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
            <Ionicons name="time-outline" size={18} color="#666" />
            <Text style={styles.metaText}>{recipe.prepTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={18} color="#666" />
            <Text style={styles.metaText}>{recipe.servings} porções</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="pricetag-outline" size={18} color="#666" />
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
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 260,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
  },
  name: {
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 10,
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