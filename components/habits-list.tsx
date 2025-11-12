import { Habit } from '@/types/backend.types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SwipeableHabit } from './swipeable-habit';

type HabitsListProps = {
  habits: Habit[];
  completedHabitIds: Set<string>;
  onDeleteHabit: (id: string) => void;
  onCompleteHabit: (id: string) => void;
};

export function HabitsList({
  habits,
  completedHabitIds,
  onDeleteHabit,
  onCompleteHabit,
}: HabitsListProps) {
  if (habits.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>No Habits yet. Add your first Habit!</Text>
      </View>
    );
  }

  return (
    <>
      {habits.map((habit) => (
        <SwipeableHabit
          key={habit.$id}
          habit={habit}
          isCompleted={completedHabitIds.has(habit.$id)}
          onComplete={onCompleteHabit}
          onDelete={onDeleteHabit}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#666666',
  },
});
