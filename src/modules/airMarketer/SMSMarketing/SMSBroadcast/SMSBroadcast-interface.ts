export interface AddContactDrawerProps {
  isDrawerOpen: boolean;
  onClose: () => void;
  selectedRec: string[];
  setSelectedRec: (rec: string[]) => void;
  setRecipientType: (type: string) => void;
  recipientType: string;
}

export interface AllContactsProps {
  setSelectedRec: (rec: string[]) => void;
  selectedRec: string[];
  allContactsData: string[];
  setPageLimit: (limit: number) => void;
  setPage: (page: number) => void;
}

export interface GroupContactsProps {
  setSelectedRec?: (rec: string[]) => void;
  selectedRec?: string[];
}

export interface SMSDetailsProps {
  detailsData: any;
  isLoading: boolean;
  recordStatus: string;
}

export interface SMSDetailsTableProps {
  recipientsData: string[];
  loading: boolean;
  recordStatus: string;
}

export interface AnalyticsProps {
  analyticsData?: {
    statisticsData?: {
      statistics?: any;
    };
  };
  isDashboard?: boolean;
  isLoading?: boolean;
}

export interface SMSBroadcastHeaderProps {
  filterValues: any;
  setFilterValues: (values: any) => void;
  checkedRows: string[];
  resetFilters: () => void;
  datePickerVal: any;
  setDatePickerVal: (value: any) => void;
  startedDate: number;
  endedDate: number;
  recordStatus?: string;
}
