export interface ContactI {
  _id: string;
  email: string;
}

export interface ViewTabsI {
  _id: string;
  name: string;
}

export interface ContactOwnerI {
  _id: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface LifeCycleStageI {
  _id: string;
  name: string;
}

export interface StatusI {
  _id: string;
  name: string;
}

export interface FilterValuesI {
  contactOwnerId?: ContactOwnerI;
  lifeCycleStageId?: LifeCycleStageI;
  statusId?: StatusI;
  createdAt?: string;
  createdBy?: ContactOwnerI;
  lastActivityDate?: string;
}

export interface FilterPayloadI {
  [key: string]: string | number | undefined;
}

export interface ReassignValuesI {
  contactOwnerId?: ContactOwnerI;
}
