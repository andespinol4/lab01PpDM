import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { SecaoDadosAcesso } from '@/components/cadastro/secao-dados-acesso';
import { SecaoDadosPessoais } from '@/components/cadastro/secao-dados-pessoais';
import { ThemedText as Text } from '@/components/themed-text';

export default function CadastroScreen() {
  const router = useRouter();

  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = () => {
    // Este laboratório não exige persistência real dos dados,
    // apenas a construção da interface utilizando componentes.
    router.push('/');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text type="title" style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>Preencha seus dados para começar</Text>

      <SecaoDadosPessoais
        nomeCompleto={nomeCompleto}
        setNomeCompleto={setNomeCompleto}
        email={email}
        setEmail={setEmail}
        telefone={telefone}
        setTelefone={setTelefone}
        dataNascimento={dataNascimento}
        setDataNascimento={setDataNascimento}
        cpf={cpf}
        setCpf={setCpf}
      />

      <SecaoDadosAcesso
        senha={senha}
        setSenha={setSenha}
        confirmarSenha={confirmarSenha}
        setConfirmarSenha={setConfirmarSenha}
      />

      <TouchableOpacity style={styles.cadastroButton} onPress={handleCadastro}>
        <Text style={styles.cadastroButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  cadastroButton: {
    backgroundColor: '#e63946',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  cadastroButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});