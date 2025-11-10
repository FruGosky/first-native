import { View } from 'react-native';
import { useAuth } from '@/lib/auth-context';
import { Button } from 'react-native-paper';

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button icon="logout" mode="text" onPress={logout}>
        Logout
      </Button>
    </View>
  );
}
