import { TextError } from '@/components/text-error';
import { useAuth } from '@/lib/auth-context';
import { authSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { z } from 'zod';

const formSchema = authSchema;
type FormValues = z.infer<typeof authSchema>;

export default function AuthScreen() {
  const { login, registerAndLogin } = useAuth();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = async ({ email, password }: FormValues) => {
    if (!isValid) return;
    setApiError(null);
    const error = isSignUp
      ? await registerAndLogin(email.trim(), password)
      : await login(email.trim(), password);

    if (error) return setApiError(error);
    router.replace('/');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={style.container}
    >
      <View style={style.content}>
        <Text style={style.title} variant="headlineMedium">
          {isSignUp ? 'Create Account' : 'Welcome back!'}
        </Text>

        {/* EMAIL */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                autoCapitalize="none"
                error={!!formErrors.email}
                keyboardType="email-address"
                label="Email"
                mode="outlined"
                placeholder="example@gmail.com"
                style={style.input}
                value={value}
                onChangeText={onChange}
              />
              {formErrors.email?.message ? <TextError>{formErrors.email.message}</TextError> : null}
            </>
          )}
        />

        {/* PASSWORD */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                secureTextEntry
                autoCapitalize="none"
                error={!!formErrors.password}
                label="Password"
                mode="outlined"
                placeholder="******"
                style={style.input}
                value={value}
                onChangeText={onChange}
              />
              {formErrors.password?.message ? (
                <TextError>{formErrors.password.message}</TextError>
              ) : null}
            </>
          )}
        />

        {/* BACKEND ERROR */}
        {apiError ? <TextError>{apiError}</TextError> : null}

        {/* BUTTONS */}
        <Button mode="contained" style={style.signButton} onPress={handleSubmit(onSubmit)}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>

        <Button
          mode="text"
          style={style.switchModeButton}
          onPress={() => setIsSignUp((prev) => !prev)}
        >
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
    marginBottom: 8,
  },
  signButton: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});
