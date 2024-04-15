import {
  useDeleteInventoryAssociationListMutation,
  useLazyGetAssociationListQuery,
} from '@/services/airServices/assets/inventory/single-inventory-details/associations';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { addAssociationsButtonDynamic } from './Associations.data';

const useAssociations = () => {
  const theme: any = useTheme();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openNewIncident, setNewIncident] = useState(false);
  const [openExistingIncident, setExistingIncident] = useState(false);
  const [InventoryIncidentId, setInventoryIncidentId] = useState('');
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const router = useRouter();

  const associationsInventoryId = router?.query?.inventoryId;

  const [deleteInventoryAssociationListTrigger, { isLoading }] =
    useDeleteInventoryAssociationListMutation();

  const handleMouseOver = (itemId: any) => {
    setHoveredItemId(itemId);
  };

  const [lazyGetIncidentTrigger, lazyGetIncidentStatus] =
    useLazyGetAssociationListQuery();

  const getIncidentListData = async () => {
    const getIncidentParams = new URLSearchParams();
    getIncidentParams?.append('inventoryId', associationsInventoryId + '');

    const getInventoryParameters = {
      params: getIncidentParams,
    };
    try {
      await lazyGetIncidentTrigger(getInventoryParameters)?.unwrap();
    } catch (error) {}
  };

  const getInventoryListData =
    lazyGetIncidentStatus?.data?.data?.associationList;

  useEffect(() => {
    getIncidentListData();
  }, []);

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = (id: any) => {
    setIsDeleteModalOpen(true);
    setInventoryIncidentId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteInventoryAssociationListTrigger({
        id: associationsInventoryId,
        ticketId: InventoryIncidentId,
      })?.unwrap();
      successSnackbar('Association Detached Successfully!');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    setIsDeleteModalOpen(false);
    setHoveredItemId(null);
  };
  const addAssociationsButton = addAssociationsButtonDynamic?.(
    setNewIncident,
    setExistingIncident,
  );

  return {
    getInventoryListData,
    theme,
    lazyGetIncidentStatus,
    handleMouseOver,
    hoveredItemId,
    setHoveredItemId,
    handleMouseLeave,
    handleDelete,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleConfirmDelete,
    isLoading,
    setNewIncident,
    setExistingIncident,
    openNewIncident,
    openExistingIncident,
    addAssociationsButton,
  };
};

export default useAssociations;
