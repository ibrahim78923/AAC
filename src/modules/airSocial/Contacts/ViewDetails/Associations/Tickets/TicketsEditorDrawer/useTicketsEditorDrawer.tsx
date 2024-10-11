import { useLazyGetAllTicketsQuery } from '@/services/common-APIs';
import {
  // useGetTicketsByIdQuery,
  useLazyGetAllUsersAsAgentsDropdownForServicesTicketsQuery,
  useLazyGetAssociateAssetsDropdownForServicesTicketsQuery,
  useLazyGetCategoriesDropdownForServicesTicketsQuery,
  useLazyGetDepartmentDropdownForServicesTicketsQuery,
  useLazyGetAllUsersAsRequestersDropdownForServicesTicketsQuery,
} from '@/services/airServices/tickets';

const useTicketsEditorDrawer = () => {
  const ticketsList = useLazyGetAllTicketsQuery();

  const apiQueryDepartment =
    useLazyGetDepartmentDropdownForServicesTicketsQuery();
  const apiQueryRequester =
    useLazyGetAllUsersAsRequestersDropdownForServicesTicketsQuery();
  const apiQueryAgent =
    useLazyGetAllUsersAsAgentsDropdownForServicesTicketsQuery();
  const apiQueryAssociateAsset =
    useLazyGetAssociateAssetsDropdownForServicesTicketsQuery();
  const apiQueryCategories =
    useLazyGetCategoriesDropdownForServicesTicketsQuery();

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
