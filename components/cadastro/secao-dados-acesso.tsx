import { StyleSheet, View } from 'react-native';


import { ThemedText as Text } from '@/components/themed-text';
import { CampoFormulario } from '@/components/cadastro/campo-formulario';
import { sharedStyles } from '@/constants/cadastro-styles';

type SecaoDadosAcessoProps = {
  senha: string;
  setSenha: (valor: string) => void;
  confirmarSenha: string;
  setConfirmarSenha: (valor: string) => void;
};

export function SecaoDadosAcesso({
  senha,
  setSenha,
  confirmarSenha,
  setConfirmarSenha,
}: SecaoDadosAcessoProps) {
  return (
    <View style={styles.wrapper}>
      <Text type="subtitle" style={sharedStyles.sectionTitle}>Dados de acesso</Text>

      <CampoFormulario
        label="Senha"
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <CampoFormulario
        label="Confirmação de senha"
        placeholder="Digite a senha novamente"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
   sectionTitle: {
    marginBottom: 12,
    color: '#e63946',
  },
});