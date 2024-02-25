import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFb9io_ozAv8TDVKnaes-fTZ-ct_tWDmM",
  authDomain: "chat-app-dec90.firebaseapp.com",
  projectId: "chat-app-dec90",
  storageBucket: "chat-app-dec90.appspot.com",
  messagingSenderId: "773469645453",
  appId: "1:773469645453:web:ccc2abd70aee3cae6bd0c4",
  measurementId: "G-88FFCWFRTW",
};

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);

export { firestore };

export default firebase;