import { FilterSharedIcon, PlusSharedColorIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import TanstackTable from '@/components/Table/TanstackTable';
import AgentFilter from './AgentFilter';
import { InviteAgentModel } from './InviteAgentModal';
import { useAgent } from './useAgent';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import { DeleteAgent } from '../DeleteAgent';

const Agent = () => {
  const {
    agentListsColumns,
    dropdownOptions,
    setSearchValue,
    handleOpenDrawer,
    isAgentFilterDrawerOpen,
    setAgentFilterDrawerOpen,
    isAgentModalOpen,
    setEditAgentModalTitle,
    editAgentModalTitle,
    handleAddAgentModal,
    lazyGetAgentsStatus,
    setPageLimit,
    setPage,
    pageLimit,
    setFilterAgentData,
    selectedAgentList,
    setSelectedAgentList,
    getAgentsListData,
    page,
    openDeleteModal,
    setOpenDeleteModal,
  } = useAgent();
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
      >
        <Box>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.FILTERS_SEARCH,
            ]}
          >
            <Search label="Search Here" setSearchBy={setSearchValue} />
          </PermissionsGuard>
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.FILTERS_SEARCH,
            ]}
          >
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<FilterSharedIcon />}
              onClick={handleOpenDrawer}
            >
              Filter
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={
              Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_AGENT
            }
          >
            <SingleDropdownButton
              dropdownOptions={dropdownOptions}
              disabled={!!!selectedAgentList?.length}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_NEW_AGENT,
            ]}
          >
            <Button
              variant="contained"
              startIcon={<PlusSharedColorIcon />}
              onClick={() => {
                handleAddAgentModal?.(true);
                setSelectedAgentList([]);
              }}
            >
              Invite Agents
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      <br />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.VIEW_AGENTS_LIST,
        ]}
      >
        <TanstackTable
          data={lazyGetAgentsStatus?.data?.data?.users}
          columns={agentListsColumns}
          isPagination
          isFetching={lazyGetAgentsStatus?.isFetching}
          isSuccess={lazyGetAgentsStatus?.isSuccess}
          isLoading={lazyGetAgentsStatus?.isLoading}
          setPageLimit={setPageLimit}
          setPage={setPage}
          count={lazyGetAgentsStatus?.data?.data?.meta?.pages}
          totalRecords={lazyGetAgentsStatus?.data?.data?.meta?.total}
          onPageChange={(page: any) => setPage(page)}
          currentPage={lazyGetAgentsStatus?.data?.data?.meta?.page}
          pageLimit={pageLimit}
        />
      </PermissionsGuard>
      <Box>
        {isAgentModalOpen && (
          <InviteAgentModel
            isAgentModalOpen={isAgentModalOpen}
            setEditAgentModalTitle={setEditAgentModalTitle}
            editAgentModalTitle={editAgentModalTitle}
            handleAddAgentModal={handleAddAgentModal}
            selectedAgentList={selectedAgentList}
            setSelectedAgentList={setSelectedAgentList}
          />
        )}
        {openDeleteModal && (
          <DeleteAgent
            deleteModalOpen={openDeleteModal}
            setDeleteModalOpen={setOpenDeleteModal}
            selectedInventoryLists={selectedAgentList}
            setSelectedInventoryLists={setSelectedAgentList}
            setPage={setPage}
            page={page}
            getInventoryListData={getAgentsListData}
            totalRecords={lazyGetAgentsStatus?.data?.data?.users?.length}
          />
        )}
      </Box>
      {isAgentFilterDrawerOpen && (
        <AgentFilter
          isAgentFilterDrawerOpen={isAgentFilterDrawerOpen}
          setAgentFilterDrawerOpen={setAgentFilterDrawerOpen}
          setFilterAgentData={setFilterAgentData}
        />
      )}
    </>
  );
};

export default Agent;
