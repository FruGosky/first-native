import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/lib/auth-context';
import { ActivityIndicator, View } from 'react-native';

export default function ProtectedLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const isAuthenticated = !!user;
    const isInAuthRoute = segments[0] === 'auth';
    if (isLoadingUser) {
      console.info('Loading user...');
      return;
    }
    if (!isAuthenticated && !isInAuthRoute) {
      setTimeout(() => router.replace('/auth'), 0);
    } else if (isAuthenticated && isInAuthRoute) {
      setTimeout(() => router.replace('/'), 0);
    }
    setLoading(false);
  }, [isLoadingUser, router, segments, user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#007AFF" size="large" />
      </View>
    );
  }

  return <Slot />;
}
