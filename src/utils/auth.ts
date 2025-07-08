import { SessionStorageEnum } from "./enums/session-storage.enum";

export const getLocalStorageToken = () => {
  return sessionStorage.getItem(SessionStorageEnum.Token);
};

export const setLocalStorageToken = (token: string) => {
  sessionStorage.setItem(SessionStorageEnum.Token, token);
};

export const getLocalStorageTokenExpiryDate = () => {
  return sessionStorage.getItem(SessionStorageEnum.ExpiryDate);
};

export const setLocalStorageTokenExpiryDate = (expiryDate: string) => {
  sessionStorage.setItem(SessionStorageEnum.ExpiryDate, expiryDate);
};
