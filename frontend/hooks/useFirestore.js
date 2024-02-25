import {
  getDocs,
  query,
  collection,
  where,
  onSnapshot,
  orderBy,
  limit,
  endAt,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const collectionRef = collection(firestore, collectionName);

    const q = query(
      collectionRef,
      orderBy("createdAt") &&
        condition &&
        where(condition.fieldName, condition.operator, condition.compareValue)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(docs);
    });

    return () => unsubscribe();
  }, [condition, collectionName]);

  return documents;
};

export { useFirestore };
