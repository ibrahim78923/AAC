import { useState } from 'react';
import { data, groupColumnsFunction } from './GroupsTab.data';

export const useGroupsTab = () => {
  const [selectedGroupData, setSelectedGroupData] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [selectedSendData, setSelectedSendData] = useState();
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const groupColumns = groupColumnsFunction(
    setSelectedSendData,
    setIsDrawerOpen,
    selectedGroupData,
    setSelectedGroupData,
    data,
  );
  return {
    groupColumns,
    isDrawerOpen,
    setIsDrawerOpen,
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    selectedSendData,
    isEditOpen,
    setIsEditOpen,
    setSelectedSendData,
  };
};
