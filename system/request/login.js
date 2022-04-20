/**
 * API for login
 */
import request from "./index";

/**
 * Login
 * @param {string} fromData.username - username
 * @param {string} fromData.password - password
 */
export function login(fromData) {
  return request({
    url: "system/login",
    method: "POST",
    data: fromData,
  });
}

/**
 * Get login info
 */
export function getLoginInfo() {
  return request({
    url: "system/getInfo",
    method: "GET",
  });
}

/**
 * Get router
 */
export function getRouter() {
  return request({
    url: "system/getRouter",
    method: "GET",
  });
}

/**
 * Logout
 */
export function logout() {
  return request({
    url: "system/logout",
    method: "DELETE",
  });
}
