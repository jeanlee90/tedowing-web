import React from "react";
import { loginStore, TLoginStore } from "./loginStore";
import { useLocalStore } from "mobx-react-lite";

interface TStore {
  loginStore: TLoginStore;
}

interface TStoreProvider {
  children: React.ReactNode;
}

const storeContext = React.createContext<TStore | null>(null);

export const StoreProvider = ({ children }: TStoreProvider) => {
  const store = {
    loginStore: useLocalStore(loginStore),
  };

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) throw new Error("useStore must be used within a StoreProvider.");

  return store;
};
