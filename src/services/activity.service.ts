import { functions } from '@/firebase/firebase';
import { httpsCallable, type HttpsCallableResult } from 'firebase/functions';

/**
 * Function to get recommended NRs for activity.
 * @param {string} activity - User activity input.
 */
export const getRecommendationNRs = (activity: string): Promise<HttpsCallableResult<unknown>> => {
  const getSafetyWorkPrompt = httpsCallable(functions, 'getSafetyWorkPrompt');

  return getSafetyWorkPrompt({ activity });
};
