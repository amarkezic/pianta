export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

enum Amount {
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
  name: string;
  photoUri: string;
  description: string;
  waterSchedule: Schedule;
  fertilizationSchedule: Schedule;
  sunlight: Amount;
  humidity: Amount;
  environment: string;
}

export interface Schedule {
  amount: number;
  unit: string;
  times: number;
  repeatEvery: string;
}
