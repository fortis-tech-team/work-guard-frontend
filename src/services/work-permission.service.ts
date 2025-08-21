import { db } from '@/firebase/firebase';
import type { WorkPermissionData } from '@/interfaces/models/WorkPermission';
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  addDoc,
  serverTimestamp,
  type DocumentData,
} from 'firebase/firestore';

const workPermissionCollection = collection(db, 'work-permission');

/**
 * Creates a new work permission in Firestore.
 * @param workPermission - An object containing work permission data.
 * @returns A Promise resolved when the work permission is created successfully.
 */
export function createWorkPermissionService(
  workPermission: WorkPermissionData,
): Promise<DocumentData> {
  return addDoc(workPermissionCollection, {
    ...workPermission,
    createdAt: serverTimestamp(),
  }).catch((error) => {
    console.error('Error creating work permission:', error);
    throw error;
  });
}

/**
 * Reads work permission data from Firestore by ID.
 * @param id - The work permission ID.
 * @returns A Promise containing the work permission data if found.
 */
export function getWorkPermissionByIdService(id: string): Promise<DocumentData> {
  return getDoc(doc(workPermissionCollection, id))
    .then((docSnap) => {
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
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
export function getWorkPermissionsService(): Promise<DocumentData[]> {
  return getDocs(workPermissionCollection)
    .then((querySnapshot) =>
      querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })),
    )
    .catch((error) => {
      console.error('Error fetching work permissions:', error);
      throw error;
    });
}

/**
 * Updates a work permission's data in Firestore.
 * @param id - The work permission ID.
 * @param workPermission - An object containing the fields to update.
 * @returns A Promise resolved when the data is successfully updated.
 */
export function updateWorkPermissionService(
  id: string,
  workPermission: Partial<WorkPermissionData>,
): Promise<void> {
  if (!workPermission) return Promise.reject(new Error('No work permission provided for update'));

  return updateDoc(doc(workPermissionCollection, id), workPermission)
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
 * @param id - The work permission ID.
 * @returns A Promise resolved when the work permission is successfully deleted.
 */
export function deleteWorkPermissionService(id: string): Promise<void> {
  return deleteDoc(doc(workPermissionCollection, id)).catch((error) => {
    console.error('Error deleting work permission:', error);
    throw error;
  });
}
