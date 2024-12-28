// src/firebase/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  validatePassword,
  type UserCredential,
} from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import type { AuthData } from '@/interfaces/models/Auth'

/**
 * Function to register a new user with additional data.
 * @param {string} email - User email.
 * @param {string} password - User password.
 */
export const signUpUser = async ({ email, password }: AuthData): Promise<UserCredential> => {
  // Creating the user in Firebase Authentication
  const status = await validatePassword(auth, password)
  if (!status.isValid) throw new Error('Senha invalida')

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user
      console.log('Usuário cadastrado com sucesso:', user)
      return userCredential
    })
    .catch((error) => {
      console.error('Erro ao cadastrar usuário:', error.message)
      throw new Error(error.message)
    })
}

/**
 * Function to register a new user with additional data.
 * @param {string} email - User email.
 * @param {string} password - User password.
 */
export const loginUser = async ({ email, password }: AuthData): Promise<UserCredential> => {
  // Creating the user in Firebase Authentication
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user
      console.log('Usuário cadastrado com sucesso:', user)
      return userCredential
    })
    .catch((error) => {
      console.error('Erro ao cadastrar usuário:', error.message)
      throw new Error(error.message)
    })
}

/**
 * Function to logout user.
 */
export const logoutUser = async (): Promise<void> => {
  return signOut(auth)
    .then((data) => {
      console.log('Usuário deslogado com sucesso', data)
    })
    .catch((error) => {
      console.error('Erro ao fazer logout:', error.message)
    })
}
