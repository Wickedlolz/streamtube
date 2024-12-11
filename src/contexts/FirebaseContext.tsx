import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import { auth, db, googleProvider } from "@/lib/firebase.config";
import {
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  User,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

interface IFirebaseInitialState {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<void>;
  updateUser: (user: User) => void;
  logOut: () => Promise<void>;
}

export const FirebaseContext = createContext<IFirebaseInitialState>({
  user: null,
  signInWithGoogle: async () => {},
  signIn: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  signUp: async () => {},
  updateUser: () => {},
  logOut: async () => {},
});

export const FirebaseProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);

  const signInWithGoogle = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    const users = await getDocs(collection(db, "users"));
    const isExist = users.docs.find((user) => user.id === data.user.email);

    if (!isExist) {
      await setDoc(doc(db, "users", data.user.email!), {
        saved: [],
        liked: [],
        watchLater: [],
        favoriteGenres: [],
      });
    }
  };

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", email), {
      saved: [],
      liked: [],
      watchList: [],
      favoriteGenres: [],
    });
  };

  const updateUser = (userData: User) => {
    setUser((state) => {
      if (!state) {
        return null;
      }

      return {
        ...state,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      };
    });
  };

  const logOut = () => signOut(auth);

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signInWithGoogle,
        signIn,
        signUp,
        updateUser,
        logOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => {
  return useContext(FirebaseContext);
};
