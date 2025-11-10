import { Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export function TextError({ children }: { children: string }) {
  const theme = useTheme();

  return <Text style={{ color: theme.colors.error }}>{children}</Text>;
}
