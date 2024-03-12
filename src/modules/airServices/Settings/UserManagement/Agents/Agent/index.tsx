import { FilterSharedIcon, PlusSharedColorIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import TanstackTable from '@/components/Table/TanstackTable';
import AgentFilter from './AgentFilter';
import { InviteAgentModel } from './InviteAgentModal';
import { AgentDeleteModal } from './AgentDeleteModal';
import { useAgent } from './useAgent';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';

const Agent = () => {
  const {
    selectedAgentList,
    agentListsColumns,
    dropdownOptions,
    setSearchValue,
    deleteAgentProps,
    handleOpenDrawer,
    isAgentFilterDrawerOpen,
    setAgentFilterDrawerOpen,
    isAgentModalOpen,
    setEditAgentModalTitle,
    editAgentModalTitle,
    handleAddAgentModal,
    processedAgentListData,
    isFetching,
    isSuccess,
    isLoading,
    setPageLimit,
    setPage,
    pageLimit,
    metaData,
    setSelectedAgentList,
    setFilterAgentData,
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
      <Box m={'0.5rem 0 0.5rem 0'}>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.VIEW_AGENTS_LIST,
          ]}
        >
          <TanstackTable
            data={processedAgentListData}
            columns={agentListsColumns}
            isPagination
            isFetching={isFetching}
            isSuccess={isSuccess}
            isLoading={isLoading}
            setPageLimit={setPageLimit}
            setPage={setPage}
            count={metaData?.pages}
            totalRecords={metaData?.total}
            onPageChange={(page: any) => setPage(page)}
            currentPage={metaData?.page}
            pageLimit={pageLimit}
          />
        </PermissionsGuard>
      </Box>
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
        {deleteAgentProps?.openDeleteModal && (
          <AgentDeleteModal deleteAgentProps={deleteAgentProps} />
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
