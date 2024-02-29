import { ReactNode } from 'react';

export interface CardPropsI {
  heading?: string;
  status?: string;
  children?: ReactNode;
  showChild?: boolean;
  openDeleteModal?: any;
  setOpenDeleteModal?: any;
  handleDelete?: any;
  setDelateRecord?: any;
  deletedRecordId?: any;
}
