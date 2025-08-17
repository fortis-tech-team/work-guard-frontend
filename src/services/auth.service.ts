// src/firebase/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  validatePassword,
  updateProfile,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
  type UserCredential,
  type User,
} from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import type { AuthData } from '@/interfaces/models/Auth';

/**
 * Function to register a new user with additional data.
 * @param {string} email - User email.
 * @param {string} password - User password.
 */
export const signUpUser = async ({ email, password }: AuthData): Promise<UserCredential> => {
  // Creating the user in Firebase Authentication
  const status = await validatePassword(auth, password);
  if (!status.isValid) throw new Error('Senha invalida');

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error) => {
      console.error('Erro ao cadastrar usuário:', error.message);
      throw new Error(error.message);
    });
};

/**
 * Function to register a new user with additional data.
 * @param {string} email - User email.
 * @param {string} password - User password.
 */
export const signInUser = async ({ email, password }: AuthData): Promise<UserCredential> => {
  // Creating the user in Firebase Authentication
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error) => {
      console.error('Erro ao cadastrar usuário:', error.message);
      throw new Error(error.message);
    });
};

/**
 * Function to logout user.
 */
export const signOutUser = async (): Promise<void> => {
  return signOut(auth)
    .then((data) => data)
    .catch((error) => {
      console.error('Erro ao fazer logout:', error.message);
      throw new Error(error.message);
    });
};

/**
 * Function to update user profile information.
 * @param {User} user - The user object from Firebase Authentication.
 * @param {string} displayName - The new display name for the user.
 * @param {string} photoURL - The new photo URL for the user.
 */
export const updateUserProfile = (
  user: User,
  displayName?: string,
  photoURL?: string,
): Promise<void> => {
  return updateProfile(user, { displayName, photoURL })
    .then(() => {
      console.log('Perfil atualizado com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao atualizar perfil:', error.message);
      throw new Error(error.message);
    });
};

/**
 * Function to send an email verification to the authenticated user.
 * @param {User} user - The user object from Firebase Authentication.
 */
export const sendUserEmailVerification = (user: User): Promise<void> => {
  return sendEmailVerification(user)
    .then(() => {
      console.log('E-mail de verificação enviado com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao enviar e-mail de verificação:', error.message);
      throw new Error(error.message);
    });
};

/**
 * Function to update the password of the authenticated user.
 * @param {User} user - The user object from Firebase Authentication.
 * @param {string} newPassword - The new password for the user.
 */
export const updateUserPassword = (user: User, newPassword: string): Promise<void> => {
  return updatePassword(user, newPassword)
    .then(() => {
      console.log('Senha atualizada com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao atualizar senha:', error.message);
      throw new Error(error.message);
    });
};

/**
 * Function to send a password reset email to the user.
 * @param {string} email - The email address of the user.
 */
export const sendUserPasswordResetEmail = (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('E-mail de redefinição de senha enviado com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao enviar e-mail de redefinição de senha:', error.message);
      throw new Error(error.message);
    });
};
