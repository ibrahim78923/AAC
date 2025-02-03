import { WorkflowListHeaderI } from '@/types/modules/AirOperations/WorkflowAutomation';
import { PAGINATION } from '@/config';

export const useListHeader = (props: WorkflowListHeaderI) => {
  const { setPage, setSearch } = props;

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  return {
    handleSearch,
  };
};
