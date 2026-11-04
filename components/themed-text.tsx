import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    includeFontPadding: false,
    color: '#111111',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    includeFontPadding: false,
    color: '#111111',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
    includeFontPadding: false,
    color: '#111111',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    includeFontPadding: false,
    color: '#111111',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    includeFontPadding: false,
  },
});
