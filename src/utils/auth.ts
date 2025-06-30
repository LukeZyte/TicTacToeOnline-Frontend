import { SessionStorageEnum } from "./enums/session-storage.enum";

export const getUserToken = () => {
  return sessionStorage.getItem(SessionStorageEnum.Token);
};
