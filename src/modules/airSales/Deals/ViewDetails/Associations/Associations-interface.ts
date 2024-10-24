export interface AssociationsProps {
  selected: string;
  viewDeal: any;
}

export interface AttachmentsProps {
  attachmentsData?: string[];
  isLoading?: boolean;
  dealId?: string;
}

export interface CompaniesProps {
  companiesData: string[];
  dealId: string;
  isLoading: boolean;
  handleSearch: (searchTerm: string) => void;
}

export interface ContactsProps {
  contactsData: string[];
  dealId: string;
  isLoading: boolean;
  handleSearch: (searchTerm: string) => void;
}

export interface ContactsEditorDrawerProps {
  openDrawer: any;
  setOpenDrawer: (open: any) => void;
  contactRecord: any;
  dealId: string;
}

export interface ProductsProps {
  productsData: any[];
  isLoading: boolean;
  viewDeal: any;
  dealId: string;
}

export interface QuotesProps {
  quotesData: any[];
  isLoading: boolean;
  dealId: string;
  setSearchQuotes: any;
}

export interface QuotesDrawerProps {
  openDrawer: any;
  setOpenDrawer: (value: any) => void;
  quotesDetails: any;
  isLoading: boolean;
}

export interface TicketsEditorDrawerProps {
  openDrawer:
    | {
        isToggle: boolean;
        type: string;
        data: any;
      }
    | any;
  setOpenDrawer: (drawerState: {
    isToggle: boolean;
    type: string;
    data: any;
  }) => void;
}
