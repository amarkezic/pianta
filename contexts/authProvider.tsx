import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useStorageState } from "../hooks/useStorageState";
import auth from "@react-native-firebase/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

const AuthContext = createContext<{
  signOut: () => void;
  session?: string | null;
  user?: FirebaseAuthTypes.User | null;
  isLoading: boolean;
}>({
  signOut: () => null,
  session: null,
  user: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isStateLoading, session], setSession] = useStorageState("session");
  const [isAuthLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    console.log("currently logged in user", user);
    if (user) {
      setUser(user);
      setSession(JSON.stringify(user));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signOut: async () => {
          await auth().signOut();
          setSession(null);
          setUser(null);
        },
        session,
        user,
        isLoading: isStateLoading || isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
