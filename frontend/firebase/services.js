import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "./config";

export const addDocument = async (collectionName, data) => {
  const doc = await addDoc(collection(firestore, collectionName), {
    ...data,
    createdAt: new Date(),
  });
  return doc.id;
};

export const removeDoc = async (collectionName, documentId) => {
  await deleteDoc(doc(firestore, collectionName, documentId));
};
