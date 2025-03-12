import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiousPublic from "../hooks/useAxiousPublic";
/*
1 create context
2.  return auth-context.provider
3 value which is  accessible from any where4. Use the Provider component to wrap parts of your app and pass a value.
5.use <AuthProvider> in main jsx ,Without {children}, the Provider would block the rendering of its nested components, breaking B app's structure.
*/
export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [User, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const GoogleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiousPublic()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
     // console.log(User);
     if (currentUser) {

      //console.log(currentUser.email);
      const userInfo = { email: currentUser.email}
      axiosPublic.post('/jwt' , userInfo)
      .then(res => {
        if (res.data.token) {
       
          localStorage.setItem('access-token' , res.data.token)
          setLoading(false);
        }
      })
     }
     else{
      //console.log("current user not found");
      localStorage.removeItem('access-token')
      setLoading(false);
     }
     
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //google signUp

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authinfo = {
    User,
    loading,
    signInWithGoogle,
    createUser,
    updateUserProfile,
    loginUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
