export interface useTasksI {
  isAddDrawerOpen: boolean;
  setIsAddDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isDetailDrawerOpen: number;
  setIsDetailDrawerOpen: React.Dispatch<React.SetStateAction<number>>;

  activeCheck: any[];
  setActiveCheck: React.Dispatch<React.SetStateAction<any[]>>;

  isEditDrawerOpen: boolean;
  setIsEditDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;

  actionPop: HTMLButtonElement | null;
  setActionPop: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  handleActionClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleActionClose: () => void;
  openAction: boolean;

  actionExportPop: HTMLButtonElement | null;
  setActionExportPop: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
  handleActionExportClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleActionExportClose: () => void;
  openActionExport: boolean;

  drawerStatusVal: any;
  setDrawerStatusVal: React.Dispatch<React.SetStateAction<any>>;

  drawerStatusPop: HTMLButtonElement | null;
  setDrawerStatusPop: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
  handleStatusClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleStatusClose: () => void;
  openDrawerStatus: boolean;

  handleStatusItemClick: (selectedStatus: any) => void;
}

export interface TasksHeaderI {
  setIsAddDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeCheck: any[];
}

export interface AddTaskDrawerI {
  isDrawerOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

export interface EditTaskDrawerI {
  isDrawerOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

export interface DetailTaskDrawerI {
  isDrawerOpen: boolean;
  onClose: (isOpen: boolean) => void;
  taskDetail: any;
}
