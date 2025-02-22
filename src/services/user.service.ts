import { db } from '@/firebase/firebase'
import type { UserData } from '@/interfaces/models/User'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  type DocumentData,
} from 'firebase/firestore'

const usersCollection = collection(db, 'users')

/**
 * Creates a new user in Firestore.
 * @param user - An object containing user data.
 * @returns A Promise resolved when the user is created successfully.
 */
export function createUserService(user: UserData): Promise<boolean> {
  return setDoc(doc(usersCollection, user.uid), user)
    .then(() => true)
    .catch((error) => {
      console.error('Error creating user:', error)
      throw error
    })
}

/**
 * Reads user data from Firestore.
 * @param uid - The user ID.
 * @returns A Promise containing the user data if found.
 */
export function getUserByIdService(uid: string): Promise<DocumentData> {
  return getDoc(doc(usersCollection, uid))
    .then((docSnap) => {
      if (docSnap.exists()) {
        return docSnap.data()
      } else {
        throw new Error('User not found.')
      }
    })
    .catch((error) => {
      console.error('Error fetching user:', error)
      throw error
    })
}

/**
 * Updates a user's data in Firestore.
 * @param uid - The user ID.
 * @param updates - An object containing the fields to update.
 * @returns A Promise resolved when the data is successfully updated.
 */
export function updateUserService(uid: string, updates: Partial<UserData>): Promise<void> {
  return updateDoc(doc(usersCollection, uid), updates)
    .then(() => {
      console.log('User updated successfully!')
    })
    .catch((error) => {
      console.error('Error updating user:', error)
      throw error
    })
}

/**
 * Deletes a user from Firestore.
 * @param uid - The user ID.
 * @returns A Promise resolved when the user is successfully deleted.
 */
export function deleteUserService(uid: string): Promise<void> {
  return deleteDoc(doc(usersCollection, uid))
    .then(() => {
      console.log('User deleted successfully!')
    })
    .catch((error) => {
      console.error('Error deleting user:', error)
      throw error
    })
}
