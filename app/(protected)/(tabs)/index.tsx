import { api } from '@/api';
import { HabitsList } from '@/components/habits-list';
import { getErrorMessage } from '@/helpers/getErrorMessage';
import { useAuth } from '@/lib/auth-context';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { data: habits = [] } = api.habits.useGet(user?.$id ?? '');
  const { data: todayCompletedHabitIds = new Set() } = api.habitsCompletions.useGetIdsForToday(
    user?.$id ?? ''
  );
  const completeHabit = api.habits.useComplete();
  const deleteHabit = api.habits.useDelete();

  const handleCompleteHabit = async (habitId: string) => {
    if (!user || todayCompletedHabitIds.has(habitId)) return;
    const habitToUpdate = habits?.find((habit) => habit.$id === habitId);
    if (!habitToUpdate) return;
    try {
      await completeHabit.mutateAsync({ userId: user.$id, habit: habitToUpdate });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error(errorMessage);
    }
  };

  const handleOnDeleteHabit = async (habitId: string) => {
    try {
      await deleteHabit.mutateAsync(habitId);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} variant="headlineSmall">
          {"Today's Habits"}
        </Text>
        <Button icon="logout" mode="text" onPress={logout}>
          Logout
        </Button>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HabitsList
          completedHabitIds={todayCompletedHabitIds}
          habits={habits}
          onCompleteHabit={handleCompleteHabit}
          onDeleteHabit={handleOnDeleteHabit}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
});
