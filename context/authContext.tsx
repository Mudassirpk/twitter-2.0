"use client";
import { iAuthContext } from "@/types";
import { CookiesProvider, useCookies } from "react-cookie";
import { addDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { usersCollectionRef } from "@/configs/firebase";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  onIdTokenChanged,
} from "firebase/auth";
import React, {
  StrictMode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "@/configs/firebase";
import { useRouter } from "next/navigation";
const authContext = createContext<iAuthContext | null>(null);

export const useAuth = (): iAuthContext | null => {
  return useContext(authContext);
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [cookies, setCookies, removeCookie] = useCookies(["fb-at"]);
  const [user, setUser] = useState<User | null>(null);

  const signIn = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const value = {
    user,
    setUser,
    signIn,
  };

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const _query = query(
          usersCollectionRef,
          where("email", "==", user?.email)
        );
        const userSnapshot = await getDocs(_query);
        if (userSnapshot.docs[0] === undefined) {
          try {
            await addDoc(usersCollectionRef, {
              email: user?.email,
              name: user?.displayName,
              photo: user?.photoURL,
              uid: user?.uid,
            });
          } catch (err) {
            console.log("adding user error: ", err);
          }
        }
        setUser(user);
      }
    });
    return unsubscriber;
  }, []);

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        removeCookie("fb-at");
        router.push("/register");
      } else {
        const token = await user.getIdToken();
        setUser(user);
        setCookies("fb-at", token, { path: "/" });
        router.push("/");
      }
    });
  }, []);

  return (
    <CookiesProvider>
      <authContext.Provider value={value}>
        <StrictMode>{children}</StrictMode>
      </authContext.Provider>
      ;
    </CookiesProvider>
  );
}
