import { AuthGuard } from '@/lib/auth-guard';
import { Slot } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <AuthGuard>
      <Slot />
    </AuthGuard>
  );
}
