export interface useInstallationI {
  isAddDrawerOpen: boolean;
  setIsAddDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDetailDrawerOpen: number;
  setIsDetailDrawerOpen: React.Dispatch<React.SetStateAction<number>>;
  activeCheck: any[]; // You might want to replace any[] with a more specific type
  setActiveCheck: React.Dispatch<React.SetStateAction<any[]>>;
  isEditDrawerOpen: boolean;
  setIsEditDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  exportPop: HTMLButtonElement | null;
  setExportPop: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  handleExportClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleExportClose: () => void;
  openExport: boolean;
  handleMenuExport: () => void;
  actionExportPop: HTMLButtonElement | null;
  setActionExportPop: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
  handleActionExportClick: (event: any) => void;
  handleActionExportClose: () => void;
  openActionExport: boolean;
  drawerStatusVal: any; // Replace any with a more specific type if possible
  setDrawerStatusVal: React.Dispatch<React.SetStateAction<any>>;
  drawerStatusPop: HTMLButtonElement | null;
  setDrawerStatusPop: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
  handleStatusClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleStatusClose: () => void;
  openDrawerStatus: boolean;
  handleStatusItemClick: (selectedStatus: any) => void;
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  submitDeleteModel: () => Promise<void>;
}
