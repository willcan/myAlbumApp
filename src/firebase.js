import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBtDFQxGNRroTb7rL8tE4-jFiF6oqEKONY",
  authDomain: "album-66d80.firebaseapp.com",
  databaseURL: "https://album-66d80.firebaseio.com",
  projectId: "album-66d80",
  storageBucket: "album-66d80.appspot.com",
  messagingSenderId: "572443524430",
  appId: "1:572443524430:web:b35d479af0cba247d1f21f"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage();

export function snapshotToArray(snapshot) {
  const updated_array = [];
  snapshot.forEach(s =>{
    const data = s.data();
    data.id = s.id;
    updated_array.push(data)
  });
  return updated_array
}