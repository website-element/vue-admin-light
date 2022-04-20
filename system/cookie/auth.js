/**
 * Cookies of auth
 * @description Cookies of auth
 * @author Zhong Li
 * @version 1.0.0
 * @since v1.0.0
 */

import Cookies from "js-cookie";

/** Token key for login */
const AuthTokenKey = "TankLight_Token";

/**
 * Cache token
 * @param token - token
 * @returns {boolean} true, false
 */
export function setAuthToken(token) {
  return Cookies.set(AuthTokenKey, token);
}

/**
 * Get token
 * @returns {string} token
 */
export function getAuthToken() {
  return Cookies.get(AuthTokenKey);
}

/**
 * clean Token
 * @returns {boolean} true, false
 */
export function removeAuthToken() {
  return Cookies.remove(AuthTokenKey);
}
