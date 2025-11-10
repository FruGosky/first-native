import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'expo-router';
import { TextError } from '@/components/text-error';

export default function AuthScreen() {
  const { login, registerAndLogin } = useAuth();
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    setError(null);
    return true;
  };

  const handleSign = async () => {
    if (isSignUp) {
      return await registerAndLogin(email, password);
    } else {
      return await login(email, password);
    }
  };

  const handleAuth = async () => {
    if (!validateForm()) return;
    const error = await handleSign();
    if (error) {
      setError(error);
      return;
    }
    router.replace('/');
  };

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={style.container}
    >
      <View style={style.content}>
        <Text style={style.title} variant="headlineMedium">
          {isSignUp ? 'Create Account' : 'Welcome back!'}{' '}
        </Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email"
          mode="outlined"
          placeholder="example@gmail.com"
          style={style.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          autoCapitalize="none"
          label="Password"
          mode="outlined"
          placeholder="******"
          style={style.input}
          value={password}
          onChangeText={setPassword}
        />

        {error ? <TextError>{error}</TextError> : null}

        <Button mode="contained" style={style.signButton} onPress={handleAuth}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
        <Button mode="text" style={style.switchModeButton} onPress={handleSwitchMode}>
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  signButton: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});
