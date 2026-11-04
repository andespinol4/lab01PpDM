import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {

// Prática 1: Salvar Dados (setItem)[cite: 1]

async function salvar() {
try {
await AsyncStorage.setItem(
'genero_favorito', 'Ação');
setGenero('Ação');
} catch (erro) {
console.error('Erro ao salvar:', erro);
}
}

// Prática 1: Recuperar Dados (getItem)[cite: 1]

async function carregar() {
try {
const valor = await AsyncStorage.getItem('genero_favorito');
setGenero(valor ?? 'Nenhuma preferência salva');
} catch (erro) {
console.error('Erro ao carregar:', erro);
}
}

// Prática 3: Apagar Dados (removeItem)[cite: 1]



return (
<View style={styles.container}>
<Text style={styles.texto}>Gênero favorito: {genero}</Text>

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
backgroundColor: 'silver'
}
});