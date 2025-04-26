import { getFirestore } from "firebase/firestore";

import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import {app} from '../config.js';
const db = getFirestore(app);

let user = null;
export {user};


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

async function checkUserDataExist (result) {
  if (result && result.user) {
    const userRef = doc(db, "users", result.user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: result.user.email,
        displayName: result.user.displayName,
      });
      if(result.user.displayName == null) 
        await updateDoc(userRef, {
            displayName: result.user.email.split('@')[0],
        }); 
      console.log("User document created:", result.user.uid);
    } else {
      console.log("User document already exists:", result.user.uid);
    }
  }
}

function setUser (result) {
  if(result && result.user) {
    user = result.user;
    if(result.user.displayName == null) 
      result.user.displayName = result.user.email.split('@')[0];
  }
}

export const signInWithGoogle = async () => {
  let result = null;
    try {
        result = await signInWithPopup(auth, googleProvider);
        console.log("Signed in with Google:", result.user);
      } catch (error) {
        console.error("Google Sign-In Error:", error);
      }
    await checkUserDataExist(result);
    setUser(result);
    return result;
};

export const loginWithEmail = async (email, password) => {
    let result = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in with Email:", result.user);
      } catch (error) {
        console.error("Email Sign-In Error:", error);
      }
    setUser(result);
    return result;
};

export const registerWithEmail = async (email, password) => {
  let result = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registered with Email:", result.user);
      } catch (error) {
        console.error("Email Sign-Up Error:", error);
      }
    await checkUserDataExist(result);
    setUser(result);
    return result;
};

export const logout = async () => {
    await signOut(auth);
  };