import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const contextApis = createContext();

export const FirebaseServiceProvider = ({ children }) => {
  const [user, setUser] = useState();
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  const signInWithGoogle = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };
  const signInWithNumber = (number) => {
    const capatcheVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    capatcheVerifier.render();
    return signInWithPhoneNumber(auth, number, capatcheVerifier);
  };
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      return () => {
        unSubscribe();
      };
    });
  }, []);
  return (
    <contextApis.Provider
      value={{
        signUp,
        logIn,
        user,
        signInWithGoogle,
        signInWithNumber,
        forgotPassword,
      }}
    >
      {children}
    </contextApis.Provider>
  );
};

export const useContextApi = () => {
  return useContext(contextApis);
};
