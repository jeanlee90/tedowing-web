import { toJS } from "mobx";
import request from "lib/utils/request";

export interface TUserInfo {
  uid: number;
  email: string;
  language: string;
}

export interface TCheckLoginAPI {
  isLoggedIn: boolean;
  info: TUserInfo;
}

export function loginStore() {
  return {
    isLoggedIn: false,
    userInfo: {} as TUserInfo,
    async checkLogin(): Promise<boolean> {
      const { result = {} } = await request.get("/users/my");
      const { isLoggedIn } = result as TCheckLoginAPI;
      if (result) {
        this.isLoggedIn = isLoggedIn;
        this.userInfo = result.info;
      }

      return isLoggedIn;
    },
    async logout(): Promise<boolean> {
      const { success } = await request.get("/auth/logout");
      return success;
    },
    getUserInfo(): TUserInfo {
      return toJS(this.userInfo) || {};
    },
  };
}

export type TLoginStore = ReturnType<typeof loginStore>;
