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
    const chatDoc = await getDoc(chatRef);
    if (!chatDoc.exists()) {
      
    }

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

  export async function addNewChat (code, user) {
    const chatRef = doc(db, "chats", code);
    const chatDoc = await getDoc(chatRef);

    if (chatDoc.exists()) {
      const chatData = chatDoc.data();
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      let userChats = [];
      const data = userDoc.data();
      userChats = data.chats || [];

      await updateDoc(userRef, {
        chats: [...userChats, {code: code, name: chatData.name}],
      });
    } else {
      console.log("No such document!");
    }
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

  export async function submitMessage(content, user, chatCode) {
    const chatRef = doc(db, "chats", chatCode);
    const chatDoc = await getDoc(chatRef);

    if (chatDoc.exists()) {
      const chatData = chatDoc.data();
      const message = {
        userName: user.displayName,
        content: content,
      }
      const updatedMessages = [...chatData.messages, message];

      await updateDoc(chatRef, {
        messages: updatedMessages,
      });
    } else {
      console.log("No such document!");
    }
  }

  export async function getChat(chatCode) {
    const chatRef = doc(db, "chats", chatCode);
    const chatDoc = await getDoc(chatRef);
    if (chatDoc.exists()) {
      return chatDoc.data();
    } else {
      console.log("No such document!");
      return null;
    }
  }