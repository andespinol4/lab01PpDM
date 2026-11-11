import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText as Text } from '@/components/themed-text';
import { type Recipe } from '@/data/recipes';
import { addCustomRecipe } from '@/services/recipe-storage';

export default function NovaReceitaScreen() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tags, setTags] = useState('');
  const [tempo, setTempo] = useState('');
  const [porcoes, setPorcoes] = useState('2');
  const [imagem, setImagem] = useState('https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');

  const handleSalvarReceita = async () => {
    if (!nome.trim() || !categoria.trim() || !ingredientes.trim() || !modoPreparo.trim()) {
      return;
    }

    const tagsList = tags
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const receita: Recipe = {
      id: `custom-${Date.now()}`,
      name: nome.trim(),
      category: categoria.trim(),
      tags: tagsList.length > 0 ? [...new Set([categoria.trim(), ...tagsList])] : [categoria.trim()],
      image: imagem.trim() || 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
      prepTime: tempo.trim() || '20 min',
      servings: Number(porcoes) || 2,
      ingredients: ingredientes
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      steps: modoPreparo
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    await addCustomRecipe(receita);
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text type="title" style={styles.title}>Nova receita</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome da receita</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex.: Bolo da vó" />

        <Text style={styles.label}>Categoria</Text>
        <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} placeholder="Ex.: Sobremesas" />

        <Text style={styles.label}>Tags</Text>
        <TextInput
          style={styles.input}
          value={tags}
          onChangeText={setTags}
          placeholder="Ex.: Italiana, doce, família"
        />

        <Text style={styles.label}>Tempo de preparo</Text>
        <TextInput style={styles.input} value={tempo} onChangeText={setTempo} placeholder="Ex.: 40 min" />

        <Text style={styles.label}>Porções</Text>
        <TextInput style={styles.input} value={porcoes} onChangeText={setPorcoes} keyboardType="number-pad" />

        <Text style={styles.label}>URL da imagem</Text>
        <TextInput style={styles.input} value={imagem} onChangeText={setImagem} placeholder="URL da imagem" />

        <Text style={styles.label}>Ingredientes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={ingredientes}
          onChangeText={setIngredientes}
          placeholder="Um ingrediente por linha"
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>Modo de preparo</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={modoPreparo}
          onChangeText={setModoPreparo}
          placeholder="Um passo por linha"
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleSalvarReceita}>
          <Text style={styles.primaryButtonText}>Salvar receita</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    flex: 1,
  },
  form: {
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  input: {
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111',
  },
  textArea: {
    minHeight: 120,
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: '#e63946',
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
