export interface CreatedByI {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface FolderI {
  _id: string;
  name: string;
  parentFolderId: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: CreatedByI;
}

export interface RowI {
  _id: string;
  name: string;
  sharedLinks: string | number;
  readsCount: string | number;
  createdBy: {
    firstName: string;
    lastName: string;
  };
}
