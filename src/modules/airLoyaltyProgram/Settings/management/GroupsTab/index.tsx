import { data } from './GroupsTab.data';
import { Header } from './Header';
import TanstackTable from '@/components/Table/TanstackTable';
import { useGroupsTab } from './useGroupsTab';
import { UpsertSingleGroup } from './UpsertSingleGroup';

const GroupsTab = () => {
  const {
    groupColumns,
    isDrawerOpen,
    setIsDrawerOpen,
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    selectedSendData,
    isEditOpen,
    setIsEditOpen,
    setSelectedSendData,
  } = useGroupsTab();
  return (
    <>
      <Header
        setIsDrawerOpen={setIsDrawerOpen}
        setIsAddDrawerOpen={setIsAddDrawerOpen}
        setSelectedSendData={setSelectedSendData}
      />
      <br />
      <TanstackTable columns={groupColumns} data={data} isPagination />

      <UpsertSingleGroup
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        isAddDrawerOpen={isAddDrawerOpen}
        setIsAddDrawerOpen={setIsAddDrawerOpen}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        selectedSendData={selectedSendData}
      />
    </>
  );
};

export default GroupsTab;
