import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';

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

      <View style={styles.sectionBlock}>
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
      </View>

      <View style={styles.divider} />

      <View style={styles.sectionBlock}>
        <SecaoDadosAcesso
          senha={senha}
          setSenha={setSenha}
          confirmarSenha={confirmarSenha}
          setConfirmarSenha={setConfirmarSenha}
        />
      </View>

    <View style={styles.actionsArea}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cadastroButton} onPress={handleCadastro}>
          <Text style={styles.cadastroButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  title: {
    marginBottom: 6,
    color: '#e63946',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
 content: {
  paddingHorizontal: 24,
  paddingTop: 60,
  paddingBottom: 40,
  maxWidth: 480,
  width: '100%',
  alignSelf: 'center',
},
  backButton: {
    marginBottom: 20,
  },
  
  sectionBlock: {
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
    marginHorizontal: 4,
  },
  actionsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
  },
  cadastroButton: {
    flex: 1,
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