const BASE_URL = 'https://motus.fit/';
export const LOCAL_STORAGE_KEY = '__pref__fitness';
export const getSessionURL = (email) => `${BASE_URL}session/get-session?u_name=${email}`;
export const getHomeStatsURL = (email) => `${BASE_URL}session/get-home-statistics?u_name=${email}`;
export const GET_INSTRUCTORS = `${BASE_URL}session/get-instructors`;
export const LOGIN_URL = `${BASE_URL}user/login`;
export const SIGN_UP_URL = `${BASE_URL}user/create`;
