import {
  useDeleteInventoryAssociationListMutation,
  useLazyGetAssociationListQuery,
} from '@/services/airServices/assets/inventory/single-inventory-details/associations';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useAssociations() {
  const theme: any = useTheme();

  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openNewIncident, setNewIncident] = useState(false);
  const [openExistingIncident, setExistingIncident] = useState(false);
  const [InventoryIncidentId, setInventoryIncidentId] = useState('');
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const router = useRouter();

  const associationsInventoryId = router.query.inventoryId;

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
    await lazyGetIncidentTrigger(getInventoryParameters)?.unwrap();
  };

  const getInventoryListData =
    lazyGetIncidentStatus?.data?.data?.associationList;

  useEffect(() => {
    getIncidentListData();
  }, [lazyGetIncidentTrigger?.toString(), openExistingIncident]);
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
      }).unwrap();
      successSnackbar('Association Detached Successfully!');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    setIsDeleteModalOpen(false);
    setHoveredItemId(null);
  };

  return {
    getInventoryListData,
    theme,
    setOpenDialog,
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
    openDialog,
    setNewIncident,
    setExistingIncident,
    openNewIncident,
    openExistingIncident,
  };
}
