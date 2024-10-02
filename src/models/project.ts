export interface ProjectsDto {
  personal: Project[];
  shared: Project[];
}

export interface Project {
  id: number;
  name: string;
  isEncrypted: boolean;
  isPersonal: boolean;
}

export interface NewProject {
  name: string;
  passphrase: string;
}
