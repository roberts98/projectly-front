import { create } from "zustand";

export interface UserInfo {
  userId: number;
}

interface UserState {
  user: UserInfo | undefined;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUserInfo: (userInfo: UserInfo) => set(() => ({ user: userInfo })),
}));
