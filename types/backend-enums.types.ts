export const FREQUENCIES = ['daily', 'weekly', 'monthly'] as const;
export type Frequency = (typeof FREQUENCIES)[number];
