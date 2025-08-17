import { functions } from '@/firebase/firebase';
import { httpsCallable, type HttpsCallableResult } from 'firebase/functions';

/**
 * Function to get recommended NRs for activity.
 * @param {string} activity - User activity input.
 */
export const getRecommendedNRs = (activity: string): Promise<HttpsCallableResult<unknown>> => {
  const generateSafetyWork = httpsCallable(functions, 'generateSafetyWork');

  return generateSafetyWork({ activity });
};

/**
 * Function to get recommended NRs for activity.
 * @param {string} activity - User activity input.
 */
export const getWorkPermission = (activity: string): Promise<HttpsCallableResult<unknown>> => {
  const generateWorkPermission = httpsCallable(functions, 'generateWorkPermission');

  return generateWorkPermission({ activity });
};
