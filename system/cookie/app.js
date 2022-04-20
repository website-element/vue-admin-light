/**
 * Cookies of app
 * @description Cookies of auth
 * @author Zhong Li
 * @version 1.0.0
 * @since v1.0.0
 */

import Cookies from "js-cookie";

/** Key for side bar open */
const sideBarOpenedStatusKey = "sideBarOpened";

/**
 * Set side bar open status
 * @param {string | number} status - status
 * @returns cookie config
 */
export function setSideBarOpenStatus(status) {
  return Cookies.set(sideBarOpenedStatusKey, status);
}

/**
 * Get status about side bar open
 * @returns status
 */
export function getSideBarOpenStatus() {
  return Cookies.get(sideBarOpenedStatusKey);
}
