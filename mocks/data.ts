import { Plant } from "@/constants/types";

export const plantsMock: Plant[] = [
    {
      id: '1',
      name: 'Spider Plant',
      about: 'The Spider Plant is a flowering perennial plant that is native to South Africa. It is also known as the airplane plant, spider ivy, spider wort, and ribbon plant.',
      waterTips: 'Water sparingly, allowing soil to dry slightly between waterings.',
      photo: 'https://placehold.co/400',
      environments: ['house'],
      frequency: {
        times: 3,
        repeatEvery: 'week',
      },
      dateTimeNotification: new Date('2022-11-01T12:00:00'),
    },
    {
      id: '2',
      name: 'Snake Plant',
      about: 'The Snake Plant (also known as Mother-in-Law\'s Tongue) is a flowering perennial plant that is native to West Africa. It is also known as Devil\'s Tongue and Sansevieria Trifasciata.',
      waterTips: 'Water sparingly, allowing soil to dry completely between waterings.',
      photo: 'https://placehold.co/400',
      environments: ['house'],
      frequency: {
        times: 2,
        repeatEvery: 'week',
      },
      dateTimeNotification: new Date('2022-11-15T12:00:00'),
    },
    {
      id: '3',
      name: 'ZZ Plant',
      about: 'The ZZ Plant is a low-maintenance plant that can tolerate a range of lighting conditions and infrequent watering.',
      waterTips: 'Water sparingly, allowing soil to dry completely between waterings.',
      photo: 'https://placehold.co/400',
      environments: ['house'],
      frequency: {
        times: 1,
        repeatEvery: 'week',
      },
      dateTimeNotification: new Date('2022-12-01T12:00:00'),
    },
    {
      id: '4',
      name: 'Peace Lily',
      about: 'The Peace Lily is a flowering plant that is native to the tropical regions of Central and South America. It is also known as the Mauna Loa.',
      waterTips: 'Water sparingly, allowing soil to dry slightly between waterings.',
      photo: 'https://placehold.co/400',
      environments: ['house'],
      frequency: {
        times: 3,
        repeatEvery: 'week',
      },
      dateTimeNotification: new Date('2022-11-08T12:00:00'),
    },
  ];
  