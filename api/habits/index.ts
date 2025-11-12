import { completeHabit } from './complete-habit';
import { deleteHabit } from './delete-habit';
import { fetchHabits } from './fetch-habits';
import { updateHabit } from './update-habit';
import { useHabits } from './use-habits';

export const habits = {
  get: fetchHabits,
  useGet: useHabits,
  update: updateHabit,
  complete: completeHabit,
  delete: deleteHabit,
};
