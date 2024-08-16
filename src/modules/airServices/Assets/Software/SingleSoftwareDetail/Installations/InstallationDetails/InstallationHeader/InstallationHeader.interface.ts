export interface InstallationHeaderI {
  activeCheck: any[];
  setActiveCheck: React.Dispatch<React.SetStateAction<any[]>>;
  setSearchBy: React.Dispatch<React.SetStateAction<string>>;
  getInstallationListDataExport: (type: string) => Promise<void>;
}
