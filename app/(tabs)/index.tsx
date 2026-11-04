import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { RecipeCard } from '@/components/recipe-cards';
import { ThemedText as Text } from '@/components/themed-text';
import { categories, type Recipe, recipes } from '@/data/recipes';
import { FAVORITES_KEY, getCustomRecipes } from '@/services/recipe-storage';

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);

  const loadFavorites = useCallback(async () => {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    setFavorites(stored ? JSON.parse(stored) : []);
  }, []);

  const loadCustomRecipes = useCallback(async () => {
    const stored = await getCustomRecipes();
    setCustomRecipes(stored);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
      loadCustomRecipes();
    }, [loadFavorites, loadCustomRecipes])
  );

  const toggleFavorite = async (id: string, name: string) => {
    const isFav = favorites.includes(id);
    const updated = isFav ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(updated);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

    Toast.show({
      type: 'success',
      text1: isFav ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      text2: name,
      visibilityTime: 1500,
    });
  };

  const allRecipes = useMemo(() => [...recipes, ...customRecipes], [customRecipes]);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || r.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allRecipes, search, selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text type="title" style={styles.title}>GastroAlquimia</Text>
        <TouchableOpacity style={styles.myRecipesButton} onPress={() => router.push('/minhas-receitas')}>
          <Ionicons name="book-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#000000" />
        <TextInput
          placeholder="Buscar receitas..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#000000"
        />
      </View>

      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryChip, selectedCategory === item && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[styles.categoryText, selectedCategory === item && styles.categoryTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            isFavorite={favorites.includes(item.id)}
            onPress={() => router.push(`/recipe/${item.id}`)}
            onToggleFavorite={() => toggleFavorite(item.id, item.name)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#000000',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    marginBottom: 0,
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  myRecipesButton: {
    backgroundColor: '#e63946',
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 15,
    color: '#1a1a1a',
    paddingVertical: 0,
  },
  categoryList: {
    marginBottom: 14,
    flexGrow: 0,
  },
  categoryContent: {
    paddingRight: 10,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#e63946',
  },
  categoryText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  row: {
    justifyContent: 'space-between',
  },
  list: {
    paddingBottom: 20,
  },
});