import { FilterSharedIcon, PlusSharedColorIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import TanstackTable from '@/components/Table/TanstackTable';
import AgentFilter from '../FilterAgent';
import { useAgent } from './useAgent';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import { DeleteAgent } from '../DeleteAgent';
import { UpsertAgent } from '../UpsertAgent';

const Agent = () => {
  const {
    agentListsColumns,
    dropdownOptions,
    setSearchValue,
    isAgentFilterDrawerOpen,
    setAgentFilterDrawerOpen,
    isAgentModalOpen,
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
    setIsAgentModalOpen,
    filterAgentData,
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
              onClick={() => setAgentFilterDrawerOpen(true)}
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
                setIsAgentModalOpen?.(true);
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
          isError={lazyGetAgentsStatus?.isError}
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
          <UpsertAgent
            isAgentModalOpen={isAgentModalOpen}
            setIsAgentModalOpen={setIsAgentModalOpen}
            selectedAgentList={selectedAgentList}
            setSelectedAgentList={setSelectedAgentList}
          />
        )}
        {openDeleteModal && (
          <DeleteAgent
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            selectedAgentList={selectedAgentList}
            setSelectedAgentList={setSelectedAgentList}
            setPage={setPage}
            page={page}
            getAgentsListData={getAgentsListData}
            totalRecords={lazyGetAgentsStatus?.data?.data?.users?.length}
          />
        )}
      </Box>
      {isAgentFilterDrawerOpen && (
        <AgentFilter
          isAgentFilterDrawerOpen={isAgentFilterDrawerOpen}
          setAgentFilterDrawerOpen={setAgentFilterDrawerOpen}
          setFilterAgentData={setFilterAgentData}
          filterAgentData={filterAgentData}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default Agent;
