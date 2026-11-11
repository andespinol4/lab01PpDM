import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const STORAGE_KEY = 'tipo_prato_favorito';

export default function App() {
  const [tipoPrato, setTipoPrato] = useState('Nenhuma preferência salva');

  async function salvar() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, 'Italiano');
      setTipoPrato('Italiano');
    } catch (error) {
      console.error('Error ao salvar:', error);
    }
  }

  async function carregar() {
    try {
      const valor = await AsyncStorage.getItem(STORAGE_KEY);
      setTipoPrato(valor ?? 'Nenhuma preferência salva');
    } catch (error) {
      console.error('Error ao carregar:', error);
    }
  }

  async function remover() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setTipoPrato('Nenhuma preferência salva');
    } catch (error) {
      console.error('Error ao remover:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Tipo de prato: {tipoPrato}</Text>

      <View style={styles.botao}>
        <Button title="Salvar Preferência" onPress={salvar} />
      </View>

      <View style={styles.botao}>
        <Button title="Carregar Preferência" onPress={carregar} />
      </View>

      <View style={styles.botao}>
        <Button title="Remover Preferência" onPress={remover} color="#ff5252" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  texto: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  botao: {
    width: '100%',
    marginBottom: 12,
  },
  campoTexto: {
    borderColor: 'black',
    backgroundColor: 'silver',
  },
});
