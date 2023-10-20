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
