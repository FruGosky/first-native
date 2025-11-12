import { api } from '@/api';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

type StreakData = {
  streak: number;
  bestStreak: number;
  total: number;
};

const ACCEPTED_STREAK_DIFF_IN_DAYS = 1.5;

export default function StreaksScreen() {
  const habits = api.habits.useGet();
  const habitsCompletions = api.habitsCompletions.useGet();

  const getStreakData = (habitId: string): StreakData => {
    const habitCompletions = habitsCompletions
      .filter((completion) => completion.habitId === habitId)
      .sort((a, b) => new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime());

    if (habitCompletions.length === 0) {
      return { streak: 0, bestStreak: 0, total: 0 };
    }

    let streak = 0;
    let bestStreak = 0;

    let currentStreak = 0;
    let lastDate: Date | null = null;

    habitCompletions.forEach((completion) => {
      const date = new Date(completion.$createdAt);
      if (lastDate) {
        const diff = (date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

        if (diff <= ACCEPTED_STREAK_DIFF_IN_DAYS) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      if (currentStreak > bestStreak) bestStreak = currentStreak;
      streak = currentStreak;
      lastDate = date;
    });

    return {
      streak,
      bestStreak,
      total: habitCompletions.length,
    };
  };

  const habitStreaks = habits.map((habit) => {
    const { streak, bestStreak, total } = getStreakData(habit.$id);
    return { habit, bestStreak, streak, total };
  });

  const rankedHabits = habitStreaks.sort((a, b) => b.bestStreak - a.bestStreak);
  const specificRankingBadge = [
    styles.rankingBadgeTop1,
    styles.rankingBadgeTop2,
    styles.rankingBadgeTop3,
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="headlineSmall">
        Habit Streaks
      </Text>

      {rankedHabits.length > 0 ? (
        <View style={styles.rankingContainer}>
          <Text style={styles.rankingTitle}>🏅 Top Streaks</Text>
          {rankedHabits.slice(0, 3).map((item, index) => (
            <View key={item.habit.$id} style={styles.rankingRow}>
              <View style={[styles.rankingBadge, specificRankingBadge[index]]}>
                <Text style={styles.rankingBadgeText}>{index + 1}</Text>
              </View>
              <Text style={styles.rankingHabit}>{item.habit.title}</Text>
              <Text style={styles.rankingStreak}>{item.bestStreak}</Text>
            </View>
          ))}
        </View>
      ) : null}
      {habits.length ? (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          {rankedHabits.map(({ habit, streak, bestStreak, total }, index) => (
            <Card key={habit.$id} style={[styles.card, index === 0 ? styles.firstCard : null]}>
              <Card.Content>
                <Text style={styles.habitTitle} variant="titleMedium">
                  {habit.title}
                </Text>
                <Text style={styles.habitDescription}>{habit.description}</Text>
                <View style={styles.statsRow}>
                  <View style={styles.currentStatBadge}>
                    <Text style={styles.statBadgeText}>{`🔥 ${streak}`}</Text>
                    <Text style={styles.statBadgeLabel}>Current</Text>
                  </View>
                  <View style={styles.bestStatBadge}>
                    <Text style={styles.statBadgeText}>{`🏆 ${bestStreak}`}</Text>
                    <Text style={styles.statBadgeLabel}>Best</Text>
                  </View>
                  <View style={styles.totalStatBadge}>
                    <Text style={styles.statBadgeText}>{`✅ ${total}`}</Text>
                    <Text style={styles.statBadgeLabel}>Total</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      ) : (
        <View>
          <Text>No Habits yet. Add your first Habit!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  firstCard: {
    borderWidth: 2,
    borderColor: '#7c4dff',
  },
  habitTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
  },
  habitDescription: {
    color: '#6c6c80',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 8,
  },
  currentStatBadge: {
    backgroundColor: '#fff3e0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    minWidth: 60,
  },
  bestStatBadge: {
    backgroundColor: '#fffde7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    minWidth: 60,
  },
  totalStatBadge: {
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    minWidth: 60,
  },
  statBadgeText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#22223b',
  },
  statBadgeLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
    fontWeight: '500',
  },
  rankingContainer: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  rankingTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    color: '#7c4dff',
    letterSpacing: 0.5,
  },
  rankingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  rankingBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  rankingBadgeTop1: {
    backgroundColor: '#ffd700',
  },
  rankingBadgeTop2: {
    backgroundColor: '#c0c0c0',
  },
  rankingBadgeTop3: {
    backgroundColor: '#cd7f32',
  },
  rankingBadgeText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15,
  },
  rankingHabit: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  rankingStreak: {
    fontSize: 14,
    color: '#7c4dff',
    fontWeight: 'bold',
  },
});
