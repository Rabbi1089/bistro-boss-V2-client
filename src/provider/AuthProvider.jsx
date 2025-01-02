import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

//1 create context
//2.  return auth-context.provider
//3 value which is  accessible from any where
//4. Use the Provider component to wrap parts of your app and pass a value.
//5.use <AuthProvider> in main jsx ,Without {children}, the Provider would block the rendering of its nested components, breaking B app's structure.

const auth = getAuth(app);

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(User, currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);
 
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name , photo) => {
    updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo,
    })
  }

  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
  }

  const authinfo = {
    User,
    loading,
    createUser,
    updateUserProfile,
    loginUser,
    logOut
  };

  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
