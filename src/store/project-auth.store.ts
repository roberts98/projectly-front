import { create } from "zustand";

export interface ProjectPassphrase {
  projectId: number;
  passphrase: string;
}

interface ProjectAuthState {
  passphrases: ProjectPassphrase[];
  addPassphrase: (data: ProjectPassphrase) => void;
}

export const usePassphraseStore = create<ProjectAuthState>((set) => ({
  passphrases: [],
  addPassphrase: (data: ProjectPassphrase) =>
    set((state) => ({
      passphrases: [...state.passphrases, data],
    })),
}));
