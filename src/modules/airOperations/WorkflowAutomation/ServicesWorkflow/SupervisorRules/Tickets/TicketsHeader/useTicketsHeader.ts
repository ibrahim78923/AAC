import { PAGINATION } from '@/config';
import { WorkflowListHeaderI } from '@/types/modules/AirOperations/WorkflowAutomation';

export const useTicketsHeader = (props: WorkflowListHeaderI) => {
  const { setPage, setSearch } = props;

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  return {
    handleSearch,
  };
};
