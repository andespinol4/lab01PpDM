import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { ThemedText as Text } from '@/components/themed-text';

type CampoFormularioProps = TextInputProps & {
  label: string;
};

export function CampoFormulario({ label, ...rest }: CampoFormularioProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
});