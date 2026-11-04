import AsyncStorage from '@react-native-async-storage/async-storage';

import { recipes, type Recipe } from '@/data/recipes';

export const FAVORITES_KEY = '@gastroalquimia_favorites';
export const CUSTOM_RECIPES_KEY = '@gastroalquimia_custom_recipes';

export async function getCustomRecipes(): Promise<Recipe[]> {
  try {
    const stored = await AsyncStorage.getItem(CUSTOM_RECIPES_KEY);
    return stored ? (JSON.parse(stored) as Recipe[]) : [];
  } catch {
    return [];
  }
}

export async function setCustomRecipes(customRecipes: Recipe[]) {
  await AsyncStorage.setItem(CUSTOM_RECIPES_KEY, JSON.stringify(customRecipes));
}

export async function addCustomRecipe(recipe: Recipe) {
  const current = await getCustomRecipes();
  await setCustomRecipes([...current, recipe]);
}

export async function removeCustomRecipe(id: string) {
  const current = await getCustomRecipes();
  await setCustomRecipes(current.filter((recipe) => recipe.id !== id));
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const customRecipes = await getCustomRecipes();
  return [...recipes, ...customRecipes];
}

export async function getFavoriteIds(): Promise<string[]> {
  const stored = await AsyncStorage.getItem(FAVORITES_KEY);
  return stored ? (JSON.parse(stored) as string[]) : [];
}
