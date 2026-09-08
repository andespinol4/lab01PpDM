import { StyleSheet, View } from 'react-native';

import { CampoFormulario } from '@/components/cadastro/campo-formulario';
import { ThemedText as Text } from '@/components/themed-text';

type SecaoDadosPessoaisProps = {
  nomeCompleto: string;
  setNomeCompleto: (valor: string) => void;
  email: string;
  setEmail: (valor: string) => void;
  telefone: string;
  setTelefone: (valor: string) => void;
  dataNascimento: string;
  setDataNascimento: (valor: string) => void;
  cpf: string;
  setCpf: (valor: string) => void;
};

export function SecaoDadosPessoais({
  nomeCompleto,
  setNomeCompleto,
  email,
  setEmail,
  telefone,
  setTelefone,
  dataNascimento,
  setDataNascimento,
  cpf,
  setCpf,
}: SecaoDadosPessoaisProps) {
  return (
    <View style={styles.wrapper}>
      <Text type="subtitle" style={styles.sectionTitle}>Dados pessoais</Text>

      <CampoFormulario
        label="Nome completo"
        placeholder="Digite seu nome completo"
        value={nomeCompleto}
        onChangeText={setNomeCompleto}
      />

      <CampoFormulario
        label="E-mail"
        placeholder="seuemail@exemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <CampoFormulario
        label="Telefone"
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
      />

      <CampoFormulario
        label="Data de nascimento"
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />

      <CampoFormulario
        label="CPF"
        placeholder="000.000.000-00"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  sectionTitle: {
    marginBottom: 12,
  },
});