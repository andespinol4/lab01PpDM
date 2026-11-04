import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { RecipeCard } from '@/components/recipe-cards';
import { ThemedText as Text } from '@/components/themed-text';
import { type Recipe } from '@/data/recipes';
import { getCustomRecipes } from '@/services/recipe-storage';

export default function MinhasReceitasScreen() {
  const router = useRouter();
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);

  const loadMyRecipes = useCallback(async () => {
    const custom = await getCustomRecipes();
    setMyRecipes(custom);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMyRecipes();
    }, [loadMyRecipes])
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="rgb(212, 36, 36)" />
        </TouchableOpacity>
        <Text type="title" style={styles.title}>Minhas receitas</Text>
        <TouchableOpacity onPress={() => router.push('/nova-receita')} style={styles.addButton}>
          <Ionicons name="add" size={22} color="#000000" />
        </TouchableOpacity>
      </View>

      {myRecipes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Você ainda não criou nenhuma receita.</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/nova-receita')}>
            <Text style={styles.primaryButtonText}>Adicionar receita</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={myRecipes}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              isFavorite={false}
              onPress={() => router.push({ pathname: '/recipe/[id]', params: { id: item.id } })}
              onToggleFavorite={() => {}}
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
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e63946',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 14,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#e63946',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  row: {
    justifyContent: 'space-between',
  },
  list: {
    paddingBottom: 24,
  },
});
