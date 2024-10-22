import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { addAssociationsButtonDynamic } from './Associations.data';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import {
  useGetAirServicesAssociateTicketsQuery,
  usePostAirServicesRemoveAssociateTicketsMutation,
} from '@/services/airServices/tickets/single-ticket-details/association';

const useAssociations = () => {
  const theme: any = useTheme();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openNewIncident, setNewIncident] = useState(false);
  const [openExistingIncident, setExistingIncident] = useState(false);
  const [InventoryIncidentId, setInventoryIncidentId] = useState('');
  const [hoveredItemId, setHoveredItemId] = useState<null | string>(null);

  const router = useRouter();

  const associationsInventoryId = router?.query?.inventoryId;

  const [postRemoveAssociateTicketsTrigger, postRemoveAssociateTicketsStatus] =
    usePostAirServicesRemoveAssociateTicketsMutation();

  const handleMouseOver = (itemId: null | string) => {
    setHoveredItemId(itemId);
  };

  const associateTicketsAssetsParameter = {
    queryParams: {
      recordId: associationsInventoryId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.ASSETS,
      associationType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
    },
  };

  const {
    data: dataAssets,
    isLoading: isLoadingAssets,
    isFetching: isFetchingAssets,
  } = useGetAirServicesAssociateTicketsQuery(associateTicketsAssetsParameter, {
    refetchOnMountOrArgChange: true,
    skip: !!!associationsInventoryId,
  });

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setIsDeleteModalOpen(true);
    setInventoryIncidentId(id);
  };

  const handleConfirmDelete = async () => {
    const postRemoveAssociateTicketsParameter = {
      body: {
        recordId: associationsInventoryId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.ASSETS,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
        ticketsIds: [InventoryIncidentId],
      },
    };
    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      successSnackbar('Ticket Detached Successfully!');
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setIsDeleteModalOpen(false);
    }
  };
  const addAssociationsButton = addAssociationsButtonDynamic?.(
    setNewIncident,
    setExistingIncident,
  );

  return {
    dataAssets,
    theme,
    isLoadingAssets,
    isFetchingAssets,
    handleMouseOver,
    hoveredItemId,
    setHoveredItemId,
    handleMouseLeave,
    handleDelete,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleConfirmDelete,
    postRemoveAssociateTicketsStatus,
    setNewIncident,
    setExistingIncident,
    openNewIncident,
    openExistingIncident,
    addAssociationsButton,
  };
};

export default useAssociations;
