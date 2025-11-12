import { api } from '@/api';
import { getFirstLetterUppercase } from '@/helpers/getFirstLetterUppercase';
import { useAuth } from '@/lib/auth-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Button, Surface, Text } from 'react-native-paper';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const habits = api.habits.useGet();
  const todayCompletedHabitIds = api.habitsCompletions.useGetIdsForToday();
  const swipeableRefs = useRef<Record<string, SwipeableMethods | null>>({});

  const handleCompleteHabit = async (habitId: string) => {
    if (!user || todayCompletedHabitIds.has(habitId)) return;
    const habitToUpdate = habits.find((habit) => habit.$id === habitId);
    if (!habitToUpdate) return;
    await api.habits.complete(user.$id, habitToUpdate);
  };

  const isHabitCompleted = (habitId: string) => todayCompletedHabitIds.has(habitId);

  const renderLeftActions = () => (
    <View style={styles.swipeActionLeft}>
      <MaterialCommunityIcons color="#fff" name="trash-can-outline" size={32} />
    </View>
  );

  const renderRightActions = (habitId: string) => (
    <View style={styles.swipeActionRight}>
      {isHabitCompleted(habitId) ? (
        <Text style={{ color: '#fff' }}>Completed!</Text>
      ) : (
        <MaterialCommunityIcons color="#fff" name="check-circle-outline" size={32} />
      )}
    </View>
  );

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
        {habits.length ? (
          habits.map((habit) => (
            <Swipeable
              key={habit.$id}
              // @ts-ignore :/
              ref={(ref) => {
                swipeableRefs.current[habit.$id] = ref;
              }}
              overshootLeft={false}
              overshootRight={false}
              renderLeftActions={renderLeftActions}
              renderRightActions={() => renderRightActions(habit.$id)}
              onSwipeableOpen={(direction) => {
                if (direction === 'left') handleCompleteHabit(habit.$id);
                if (direction === 'right') api.habits.delete(habit.$id);
                swipeableRefs.current[habit.$id]?.close();
              }}
            >
              <Surface
                elevation={0}
                style={[styles.card, isHabitCompleted(habit.$id) ? styles.cardCompleted : {}]}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{habit.title}</Text>
                  <Text style={styles.cardDescription}>{habit.description}</Text>
                  <View style={styles.cardFooter}>
                    <View style={styles.streakBadge}>
                      <MaterialCommunityIcons color="#ff9800" name="fire" size={18} />
                      <Text style={styles.streakText}>{habit.streakCount} day streak</Text>
                    </View>
                    <View style={styles.frequencyBadge}>
                      <Text style={styles.frequencyText}>
                        {getFirstLetterUppercase(habit.frequency)}
                      </Text>
                    </View>
                  </View>
                </View>
              </Surface>
            </Swipeable>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyContainerText}>No Habits yet. Add your first Habit!</Text>
          </View>
        )}
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
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: '#f7f2fa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardCompleted: {
    opacity: 0.6,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#22223b',
  },
  cardDescription: {
    fontSize: 15,
    marginBottom: 16,
    color: '#6c6c80',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    marginLeft: 6,
    color: '#ff9800',
    fontWeight: 'bold',
    fontSize: 14,
  },
  frequencyBadge: {
    backgroundColor: '#ede7f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  frequencyText: {
    color: '#7c4dff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainerText: {
    color: '#666666',
  },
  swipeActionLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#e53935',
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: 16,
  },
  swipeActionRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#4caf50',
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingRight: 16,
  },
});
