import {
  locationDeletehandler,
  locationsList,
  locationsListData,
} from './Locations.data';
import { useState } from 'react';

export const useLocations = () => {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const [searchValue, SetSearchValue] = useState<string>('');
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const submitDeleteModal = () => {
    setDeleteModal(false);
  };
  const teamDropdownOptions = locationDeletehandler(setDeleteModal);

  const LocationsListColumn = locationsList(
    setIsAddDrawerOpen,
    setDeleteModal,
    setIsUpdate,
  );
  const openAddDrawer = () => {
    setIsUpdate(false);
    setIsAddDrawerOpen(true);
  };
  const onClose = () => {
    setIsEditDrawerOpen(false);
  };

  return {
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    searchValue,
    SetSearchValue,
    deleteModal,
    setDeleteModal,
    submitDeleteModal,
    teamDropdownOptions,
    LocationsListColumn,
    locationsListData,
    onClose,
    isEditDrawerOpen,
    isUpdate,
    setIsUpdate,
    openAddDrawer,
  };
};
