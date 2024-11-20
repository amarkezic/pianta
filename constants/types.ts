export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export enum Amount {
  LOW = "low",
  MODERATE = "moderate",
  HIGH = "high",
}

export type Position = {
  x: number;
  y: number;
};

export type Dimension = {
  width: number;
  height: number;
};

export interface Plant {
  id: string;
  englishName: string;
  photoUri: string;
  latinName: string;
  healthScore: number;
  description: string;
  waterSchedule: Schedule;
  fertilizationSchedule: Schedule;
  sunlight: AmountSchedule;
  humidity: AmountSchedule;
  environment: string;
  lastWatered?: Date;
  lastFertilized?: Date;
}

export interface Schedule {
  amount: number;
  unit: string;
  times: number;
  repeatEvery: string;
  description: string;
}

export interface AmountSchedule {
  amount: Amount;
  description: string;
}
