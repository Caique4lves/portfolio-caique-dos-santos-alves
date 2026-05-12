import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { QRConfig } from '../types/qr';
import { handleFirestoreError, OperationType } from '../components/auth/AuthProvider';

export interface SavedQR {
  id: string;
  userId: string;
  name: string;
  config: QRConfig;
  createdAt: Timestamp;
}

const COLLECTION_NAME = 'qrcodes';

export const saveQRCode = async (name: string, config: QRConfig) => {
  if (!auth.currentUser) throw new Error('User must be authenticated to save');

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      userId: auth.currentUser.uid,
      name,
      config,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME);
  }
};

export const deleteQRCode = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
  }
};

export const subscribeToUserQRCodes = (callback: (qrs: SavedQR[]) => void) => {
  if (!auth.currentUser) return () => {};

  const q = query(
    collection(db, COLLECTION_NAME),
    where('userId', '==', auth.currentUser.uid),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const qrs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as SavedQR[];
    callback(qrs);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
  });
};
