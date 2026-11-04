import { ThemedText as Text } from '@/components/themed-text';
import { Recipe } from '@/data/recipes';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type RecipeCardProps = {
  recipe: Recipe;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
};

export function RecipeCard({ recipe, isFavorite, onPress, onToggleFavorite }: RecipeCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: recipe.image }} style={styles.image} contentFit="cover" transition={300} />
      <TouchableOpacity style={styles.favoriteButton} onPress={onToggleFavorite} activeOpacity={0.9}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={22}
          color={isFavorite ? '#e63946' : '#fff'}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{recipe.name}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={14} color="#666" />
          <Text style={styles.metaText}>{recipe.prepTime}</Text>
          <Ionicons name="people-outline" size={14} color="#666" style={{ marginLeft: 10 }} />
          <Text style={styles.metaText}>{recipe.servings} porções</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 110,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 6,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    color: '#111111',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 11,
    color: '#333333',
    marginLeft: 3,
    fontWeight: '500',
  },
});