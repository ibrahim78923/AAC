export interface TaskFiltersI {
  campaignId: string;
  assignedTo: string;
  status: string;
  taskType: string;
  startDate: string;
  endDate: string;
}
export interface ResetTasksFilterI {
  setCurrentTabVal: (value: number) => void;
  setIsOpen: (value: boolean) => void;
  setTaskFilters: (value: TaskFiltersI) => void;
  setIsFiltersOpen: (value: boolean) => void;
  isOpen: boolean;
  taskFilters: TaskFiltersI;
  reset: () => void;
  isFilterOpen: boolean;
}

interface DeleteDrawer {
  isToggled: boolean;
  id: string;
}
interface EditDrawer {
  isToggled: boolean;
  id: string;
  type?: string;
}
export interface TasksI {
  setIsOpenDeleteDrawer: (value: DeleteDrawer) => void;
  setIsEditDrawer: (value: EditDrawer) => void;
  handleDeleteModal: (value: string) => void;
  setCurrentTabVal: (value: number) => void;
  setIsFilters: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  isOpenDeleteDrawer: DeleteDrawer;
  deleteTaskLoading: boolean;
  isEditDrawer: EditDrawer;
  isFilters: boolean;
  reset: () => void;
  loading: boolean;
  methods: any;
  data: any;
}

export interface taskFilters {
  campaignId: string;
  assignedTo: string;
  status: string;
  taskType: string;
  startDate: string;
  endDate: string;
}
export interface CalanderI {
  setTaskFilters: (value: taskFilters) => void;
  setCurrentTabVal: (value: number) => void;
  setIsOpen: (value: boolean) => void;
  taskFilters: taskFilters;
}
