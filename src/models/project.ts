export interface ProjectsDto {
  personal: Project[];
  shared: Project[];
}

export interface Project {
  id: number;
  name: string;
  userId: number;
  isEncrypted: boolean;
  isPersonal: boolean;
}

export interface NewProject {
  name: string;
  passphrase: string;
}

export interface ProjectUpdate {
  isPersonal?: boolean;
}
