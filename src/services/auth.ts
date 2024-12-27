// src/firebase/auth.js
import { createUserWithEmailAndPassword, type UserCredential } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import type { AuthData } from '@/interfaces/authInterfaces'

/**
 * Function to register a new user with additional data.
 * @param {string} email - User email.
 * @param {string} password - User password.
 */
export const signUpUser = async ({ email, password }: AuthData): Promise<void> => {
  // Creating the user in Firebase Authentication
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user
      console.log('Usuário cadastrado com sucesso:', user)
    })
    .catch((error) => {
      console.error('Erro ao cadastrar usuário:', error.message)
      throw new Error(error.message)
    })
}
