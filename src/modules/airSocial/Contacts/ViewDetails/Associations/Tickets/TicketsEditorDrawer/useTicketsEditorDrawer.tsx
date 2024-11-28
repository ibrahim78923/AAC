import { useMemo } from 'react';
import { getActiveAccountSession, getActiveProductSession } from '@/utils';
import {
  useLazyGetAllTicketsContactsAssociationQuery,
  useLazyGetTicketRequesterContactsAssociationQuery,
  useLazyGetTicketCategoriesContactsAssociationQuery,
  useLazyGetTicketDepartmentContactsAssociationQuery,
  useLazyGetTicketAgentContactsAssociationQuery,
  useLazyGetAssociateAssetsContactsAssociationQuery,
} from '@/services/commonFeatures/contacts/associations/tickets';

const useTicketsEditorDrawer = () => {
  const productId = useMemo(() => {
    const product = getActiveProductSession() as any;
    return product?._id ?? {};
  }, []);

  const companyId = useMemo(() => {
    const product = getActiveAccountSession() as any;
    return product?.company?._id ?? {};
  }, []);

  const ticketsList = useLazyGetAllTicketsContactsAssociationQuery();

  const apiQueryDepartment =
    useLazyGetTicketDepartmentContactsAssociationQuery();
  const apiQueryRequester = useLazyGetTicketRequesterContactsAssociationQuery();
  const apiQueryAgent = useLazyGetTicketAgentContactsAssociationQuery();
  const apiQueryAssociateAsset =
    useLazyGetAssociateAssetsContactsAssociationQuery();
  const apiQueryCategories =
    useLazyGetTicketCategoriesContactsAssociationQuery();

  return {
    productId,
    companyId,
    ticketsList,
    apiQueryDepartment,
    apiQueryRequester,
    apiQueryAgent,
    apiQueryAssociateAsset,
    apiQueryCategories,
  };
};

export default useTicketsEditorDrawer;
