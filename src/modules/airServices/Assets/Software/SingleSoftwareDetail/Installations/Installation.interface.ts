export interface useInstallationI {
  activeCheck: any[];
  setActiveCheck: React.Dispatch<React.SetStateAction<any[]>>;
  exportPop: HTMLButtonElement | null;
  setExportPop: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleExportClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleExportClose: () => void;
  openExport: boolean;
  handleMenuExport: () => void;
  submitDeleteModel: () => Promise<void>;
  isAddDeviceModalOpen: any;
  setIsAddDeviceModalOpen: any;
  addDeviceMethods: any;
  handleAddDevice: any;
  onAddDeviceSubmit: any;
  addDeviceOptionsList: any;
}
