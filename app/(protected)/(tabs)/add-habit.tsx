import { api } from '@/api';
import { TextError } from '@/components/text-error';
import { getErrorMessage } from '@/helpers/getErrorMessage';
import { getFirstLetterUppercase } from '@/helpers/getFirstLetterUppercase';
import { useAuth } from '@/lib/auth-context';
import { addHabitSchema } from '@/schemas/habit.schema';
import { FREQUENCIES } from '@/types/backend-enums.types';
import { CreateHabit } from '@/types/backend.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import { z } from 'zod';

const formSchema = addHabitSchema;
type FormValues = z.infer<typeof addHabitSchema>;

export default function AddHabitScreen() {
  const { user } = useAuth();
  const route = useRouter();
  const createHabit = api.habits.useCreate();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      frequency: 'weekly',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    if (!isValid) return;
    if (!user) return;
    setApiError(null);

    const newHabit: CreateHabit = {
      userId: user.$id,
      ...data,
    };

    try {
      await createHabit.mutateAsync(newHabit);
      route.back();
    } catch (err) {
      setApiError(getErrorMessage(err));
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              error={!!formErrors.title}
              label="Title"
              mode="outlined"
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
            {formErrors.title ? (
              <Text style={styles.errorText}>{formErrors.title.message}</Text>
            ) : null}
          </>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              error={!!formErrors.description}
              label="Description"
              mode="outlined"
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
            {formErrors.description ? (
              <Text style={styles.errorText}>{formErrors.description.message}</Text>
            ) : null}
          </>
        )}
      />

      <Controller
        control={control}
        name="frequency"
        render={({ field: { onChange, value } }) => (
          <SegmentedButtons
            buttons={FREQUENCIES.map((freq) => ({
              value: freq,
              label: getFirstLetterUppercase(freq),
            }))}
            value={value}
            onValueChange={onChange}
          />
        )}
      />

      <Button
        disabled={createHabit.isPending}
        loading={createHabit.isPending}
        mode="contained"
        style={styles.addHabitButton}
        onPress={handleSubmit(onSubmit)}
      >
        Add Habit
      </Button>

      {apiError ? <TextError>{apiError}</TextError> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  addHabitButton: {
    marginTop: 16,
  },
});
