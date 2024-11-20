import { Plant } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export type Storage = {
  plants: Plant[];
};

export type Context = {
  storage: Storage;
  isLoading: boolean;
  setPlants: (plants: Plant[]) => void;
  removePlant: (plant: Plant) => void;
  updatePlant: (id: string, updatedData: Partial<Plant>) => void;
};

const defaultStorage: Storage = {
  plants: [],
};

export const StorageContext = createContext<Context>({
  storage: defaultStorage,
  isLoading: false,
  setPlants: () => {},
  removePlant: () => {},
  updatePlant: () => {},
});

export default function StorageProvider({ children }: any) {
  const [storage, setStorage] = useState<Storage>({ plants: [] });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const storageString = await AsyncStorage.getItem("storage");

      const storedStorage = storageString
        ? JSON.parse(storageString)
        : defaultStorage;

      setStorage(storedStorage);
      setIsLoading(false);
    })();
  }, []);

  const setPlants = (plants: Plant[]) => {
    const newState = { ...storage, plants };
    setStorage(newState);
    AsyncStorage.setItem("storage", JSON.stringify(newState));
  };

  const removePlant = (plant: Plant) => {
    const newState = {
      ...storage,
      plants: storage.plants.filter((p) => p.englishName !== plant.englishName),
    };

    setStorage(newState);
    AsyncStorage.setItem("storage", JSON.stringify(newState));
  };

  const updatePlant = (id: string, updatedData: Partial<Plant>) => {
    const newState = {
      ...storage,
      plants: storage.plants.map((plant) => {
        if (plant.id === id) {
          return { ...plant, ...updatedData };
        }
        return plant;
      }),
    };

    setStorage(newState);
    AsyncStorage.setItem("storage", JSON.stringify(newState));
  };

  return (
    <StorageContext.Provider
      value={{
        storage,
        isLoading,
        setPlants,
        removePlant,
        updatePlant
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
