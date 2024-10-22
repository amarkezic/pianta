export type Plant = {
  id: string;
  name: string;
  about: string;
  waterTips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeatEvery: string;
  };
  dateTimeNotification: Date;
};