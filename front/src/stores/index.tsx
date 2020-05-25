import React from "react";
import { loginStore, TLoginStore } from "./loginStore";
import { useLocalStore } from "mobx-react-lite";
import myVideosStore, { TMyVideosStore } from "./myVideosStore";
import videoStore, { TVideoStore } from "./videoStore";

interface TStore {
  loginStore: TLoginStore;
  videoStore: TVideoStore;
  myVideosStore: TMyVideosStore;
}

interface TStoreProvider {
  children: React.ReactNode;
}

const storeContext = React.createContext<TStore | null>(null);

export const StoreProvider = ({ children }: TStoreProvider) => {
  return (
    <storeContext.Provider
      value={{
        loginStore: useLocalStore(loginStore),
        videoStore: useLocalStore(videoStore),
        myVideosStore: useLocalStore(myVideosStore),
      }}
    >
      {children}
    </storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) throw new Error("useStore must be used within a StoreProvider.");

  return store;
};
