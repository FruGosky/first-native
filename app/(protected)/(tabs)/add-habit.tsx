import { TextError } from '@/components/text-error';
import { env } from '@/env';
import { getErrorMessage } from '@/helpers/getErrorMessage';
import { getFirstLetterUppercase } from '@/helpers/getFirstLetterUppercase';
import { tablesTB } from '@/lib/appwrite';
import { useAuth } from '@/lib/auth-context';
import { FREQUENCIES, Frequency } from '@/types/backend-enums.types';
import { CreateHabit } from '@/types/backend.types';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ID } from 'react-native-appwrite';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';

export default function AddHabitScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('weekly');
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const route = useRouter();

  const handleSubmit = async () => {
    if (!user) return;

    try {
      await tablesTB.createRow({
        databaseId: env.EXPO_PUBLIC_APPWRITE_DB_ID,
        tableId: env.EXPO_PUBLIC_APPWRITE_HABITS_TABLE_ID,
        rowId: ID.unique(),
        data: {
          userId: user.$id,
          title,
          description,
          frequency,
          streakCount: 0,
          lastCompleted: new Date().toISOString(),
        } satisfies CreateHabit,
      });
      route.back();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        mode="outlined"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        label="Description"
        mode="outlined"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.frequenciesContainer}>
        <SegmentedButtons
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: getFirstLetterUppercase(freq),
          }))}
          value={frequency}
          onValueChange={setFrequency}
        />
        <Button
          disabled={!title || !description}
          mode="contained"
          style={styles.addHabitButton}
          onPress={handleSubmit}
        >
          Add Habit
        </Button>
        {error ? <TextError>{error}</TextError> : null}
      </View>
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
    marginBottom: 16,
  },
  frequenciesContainer: {
    marginBottom: 24,
  },
  addHabitButton: {
    marginTop: 8,
  },
});
