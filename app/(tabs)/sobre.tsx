import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText as Text } from '@/components/themed-text';

type Tecnologia = {
  nome: string;
  finalidade: string;
  icone: keyof typeof Ionicons.glyphMap;
};

const tecnologias: Tecnologia[] = [
  {
    nome: '@expo/vector-icons',
    finalidade: 'Fornece os ícones utilizados em toda a interface do app (busca, favoritos, categorias, navegação).',
    icone: 'star',
  },
  {
    nome: 'expo-image',
    finalidade: 'Exibe as imagens das receitas com cache e carregamento otimizado, mais rápido que o componente padrão.',
    icone: 'image',
  },
  {
    nome: 'react-native-reanimated',
    finalidade: 'Cria as pequenas animações do app, como o efeito ao favoritar uma receita.',
    icone: 'sparkles',
  },
  {
    nome: '@react-native-async-storage/async-storage',
    finalidade: 'Salva a lista de receitas favoritas diretamente no dispositivo, mantendo os dados após fechar o app.',
    icone: 'save',
  },
  {
    nome: 'react-native-toast-message',
    finalidade: 'Exibe mensagens de feedback visual ao adicionar ou remover uma receita dos favoritos.',
    icone: 'chatbubble-ellipses',
  },
];

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text type="title" style={styles.title}>Sobre o GastroAlquimia</Text>
      <Text style={styles.description}>
        Aplicativo desenvolvido em React Native com Expo, como atividade acadêmica do IESB.
      </Text>

      <Text type="subtitle" style={styles.sectionTitle}>Tecnologias utilizadas</Text>

      {tecnologias.map((tech) => (
        <View key={tech.nome} style={styles.card}>
          <View style={styles.iconWrapper}>
            <Ionicons name={tech.icone} size={22} color="#e63946" />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.techName}>{tech.nome}</Text>
            <Text style={styles.techDescription}>{tech.finalidade}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  techName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  techDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
});