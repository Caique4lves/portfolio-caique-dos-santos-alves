import { ref, uploadBytesResumable, getDownloadURL, deleteObject, UploadTask } from 'firebase/storage';
import { storage, auth } from '../lib/firebase';

export interface UploadResult {
  promise: Promise<string>;
  task: UploadTask;
}

export const uploadQRImage = (
  file: File, 
  onProgress?: (progress: number) => void
): UploadResult => {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to upload');
  }

  // Create a unique file name
  const fileExtension = file.name.split('.').pop();
  const fileName = `qr-images/${auth.currentUser.uid}/${Date.now()}.${fileExtension}`;
  const storageRef = ref(storage, fileName);

  const uploadTask = uploadBytesResumable(storageRef, file);

  const promise = new Promise<string>((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error('Upload error details:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          console.error('Error getting download URL:', error);
          reject(error);
        }
      }
    );
  });

  return { promise, task: uploadTask };
};

export const deleteQRImage = async (url: string) => {
  if (!url) return;
  
  try {
    if (url.includes('firebasestorage.googleapis.com')) {
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};
