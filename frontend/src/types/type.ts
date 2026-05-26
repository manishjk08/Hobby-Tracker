export interface User {
  id: number;
  name: string;
  email: string;
}

export const Categories = [
  'Health',
  'Fitness',
  'Study',
  'Work',
  'Meditation',
  'Reading',
  'Finance',
  'Social',
  'Other'
] as const;

export type Category = typeof Categories[number];

export const Frequencies = ['Daily', 'Weekly'] as const;

export type Frequency = typeof Frequencies[number];

export type Targetdaysperweek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Habit {
  id: number;
  title: string;
  category: Category;
  description: string;
  icon: string;
  color: string;
  frequency: Frequency;
  targetdaysperweek: Targetdaysperweek;
  isarchived: boolean;
}

export type HabitInput=Omit<Habit ,'id'|'isarchived'>
export type HabitUpdateInput = Omit<Habit , 'isarchived'>