export interface Project {
  id: number;
  name: string;
  isEncrypted: boolean;
}

export interface NewProject {
  name: string;
  passphrase: string;
}
