import { useLazyGetAllTicketsQuery } from '@/services/common-APIs';
import {
  // useGetTicketsByIdQuery,
  useLazyGetAgentDropdownQuery,
  useLazyGetAssociateAssetsDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetRequesterDropdownQuery,
} from '@/services/airServices/tickets';

const useTicketsEditorDrawer = () => {
  const ticketsList = useLazyGetAllTicketsQuery();

  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryAssociateAsset = useLazyGetAssociateAssetsDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();

  return {
    ticketsList,
    apiQueryDepartment,
    apiQueryRequester,
    apiQueryAgent,
    apiQueryAssociateAsset,
    apiQueryCategories,
  };
};

export default useTicketsEditorDrawer;
