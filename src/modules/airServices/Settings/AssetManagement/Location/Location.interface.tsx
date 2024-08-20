import { ReactNode } from 'react';

export interface ILocationProps {
  deleteModalOpen?: boolean;
  setDeleteModalOpen?: (value: boolean) => void;
  selectedLocation?: any;
  setSelectedLocation?: (value: string) => void;
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: (value: boolean) => void;
  children?: ReactNode;
  onAddClick?: ((value?: boolean) => void) | any;
}

export interface IErrorResponse {
  data?: {
    message?: string;
  };
}
