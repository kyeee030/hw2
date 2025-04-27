import { getFirestore } from "firebase/firestore";
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
  export {db};

  export async function checkUserDataExist (result) {
    if (result && result.user) {
      const userRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: result.user.email,
          displayName: result.user.displayName,
          chats: [],
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

  export async function createNewChat (name, code, user) {
    const chatRef = doc(db, "chats", code);
    await setDoc(chatRef, {
      name: name,
      code: code,
      members: [user.uid],
      messages: [],
    });

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    let userChats = [];
    const data = userDoc.data();
    userChats = data.chats || [];

    await updateDoc(userRef, {
      chats: [...userChats, {code: code, name: name}],
    });
  }

  export async function getUserChats (user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().chats;
    } else {
      console.log("No such document!");
      return null;
    }
  }