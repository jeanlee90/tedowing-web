import { toJS } from "mobx";
import request from "lib/utils/request";
import { setAPIUrl } from "lib/variables/settings";

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
      const { result } = await request({ url: setAPIUrl("/users/my"), method: "GET" });
      const { isLoggedIn } = result || {};
      if (result) {
        this.isLoggedIn = isLoggedIn;
        this.userInfo = result;
      }

      return isLoggedIn;
    },
    async logout(): Promise<boolean> {
      const { success } = await request({ url: setAPIUrl("/auth/logout"), method: "GET" });
      return success;
    },
    getUserInfo(): TUserInfo {
      return toJS(this.userInfo);
    },
  };
}

export type TLoginStore = ReturnType<typeof loginStore>;
