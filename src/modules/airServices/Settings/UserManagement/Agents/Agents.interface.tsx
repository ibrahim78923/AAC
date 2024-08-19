export interface IAgentsProps {
  openRejectedModal?: boolean;
  setOpenRejectedModal?: (() => void) | any;
  selectedAgentRequest?: string | any;
  setSelectedAgentRequest?: (() => void) | any;
  openDeleteModal?: boolean;
  selectedAgentList?: any[];
  setSelectedAgentList?: (() => void) | any;
  getAgentsListData?: (() => void) | any;
  page?: number;
  setOpenDeleteModal?: (() => void) | any;
  setPage?: (() => void) | any;
  totalRecords?: number;
  isAgentFilterDrawerOpen?: boolean;
  setAgentFilterDrawerOpen?: (() => void) | any;
  setFilterAgentData?: (() => void) | any;
  filterAgentData?: any;
  isAgentModalOpen?: boolean;
  setIsAgentModalOpen?: (() => void) | any;
}
