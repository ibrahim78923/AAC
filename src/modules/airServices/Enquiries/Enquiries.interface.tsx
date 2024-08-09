import { ChangeEvent } from 'react';

export interface IInfo {
  _id?: string;
}

export interface IErrorResponse {
  data?: {
    message?: string;
  };
}

export interface IModalState {
  filterOpen: boolean;
  viewOpen: boolean;
  deleteOpen: boolean;
  convertToTicket: boolean;
  createRequester: boolean;
  data: IInfo[] | null;
}

export interface IGetEnquiriesActionDropdown {
  enquiriesSelected?: any;
  setIsModalOpen: (state: {
    filterOpen: boolean;
    viewOpen: boolean;
    deleteOpen: boolean;
    convertToTicket: boolean;
    createRequester: boolean;
    data: IInfo[] | null;
  }) => void;
}

export interface ICloseMenu {
  (): void | undefined | any;
}

export interface IEnquiry {
  _id: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  query?: string;
  ticketCreated?: boolean;
  status?: 'done' | 'pending';
}

interface IPatchEnquiriesStatus {
  isLoading: boolean;
  originalArgs?: {
    queryParams?: string;
  };
}

interface IHandleStatusChange {
  (info: IEnquiry, event: ChangeEvent<HTMLSelectElement>): void;
}

export interface ISetEnquiriesSelected {
  (selected: IEnquiry[]): void;
}

export interface IGetEnquiriesColumnsArgs {
  enquiriesSelected: IEnquiry[];
  setEnquiriesSelected: ISetEnquiriesSelected;
  dataArray: IEnquiry[];
  handleStatusChange: IHandleStatusChange;
  patchEnquiriesStatus: IPatchEnquiriesStatus;
}

interface IColumn {
  accessorFn: (row: IEnquiry) => any;
  id: string;
  cell: (info: any) => JSX.Element | any;
  header: JSX.Element | string;
  isSortable?: boolean;
}

export type IGetEnquiriesColumnsReturn = IColumn[];

export interface IChildModalState {
  isModalOpen?: any;
  onClose?: () => void | any;
  setFilter?: any;
}
