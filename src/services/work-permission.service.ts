import { db } from '@/firebase/firebase';
import type { PTData } from '@/interfaces/models/WorkPermission';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  type DocumentData,
} from 'firebase/firestore';

const workPermissionCollection = collection(db, 'work-permission');

/**
 * Creates a new work permission in Firestore.
 * @param workPermission - An object containing work permission data.
 * @returns A Promise resolved when the work permission is created successfully.
 */
export function createWorkPermissionService(workPermission: PTData): Promise<boolean> {
  return setDoc(doc(workPermissionCollection), workPermission)
    .then(() => true)
    .catch((error) => {
      console.error('Error creating work permission:', error);
      throw error;
    });
}

/**
 * Reads work permission data from Firestore by ID.
 * @param uid - The work permission ID.
 * @returns A Promise containing the work permission data if found.
 */
export function getWorkPermissionByIdService(uid: string): Promise<DocumentData> {
  return getDoc(doc(workPermissionCollection, uid))
    .then((docSnap) => {
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error('Work permission not found.');
      }
    })
    .catch((error) => {
      console.error('Error fetching work permission:', error);
      throw error;
    });
}

/**
 * Reads all work permissions from Firestore.
 * @returns A Promise containing an array of work permission data.
 */
export async function getAllWorkPermissionsService(): Promise<DocumentData[]> {
  try {
    const querySnapshot = await getDocs(workPermissionCollection);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error fetching work permissions:', error);
    throw error;
  }
}

/**
 * Updates a work permission's data in Firestore.
 * @param uid - The work permission ID.
 * @param updates - An object containing the fields to update.
 * @returns A Promise resolved when the data is successfully updated.
 */
export function updateWorkPermissionService(uid: string, updates: Partial<PTData>): Promise<void> {
  return updateDoc(doc(workPermissionCollection, uid), updates)
    .then(() => {
      console.log('Work permission updated successfully!');
    })
    .catch((error) => {
      console.error('Error updating work permission:', error);
      throw error;
    });
}

/**
 * Deletes a work permission from Firestore.
 * @param uid - The work permission ID.
 * @returns A Promise resolved when the work permission is successfully deleted.
 */
export function deleteWorkPermissionService(uid: string): Promise<void> {
  return deleteDoc(doc(workPermissionCollection, uid))
    .then(() => {
      console.log('Work permission deleted successfully!');
    })
    .catch((error) => {
      console.error('Error deleting work permission:', error);
      throw error;
    });
  }
