import { FilterSharedIcon, PlusSharedColorIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import TanstackTable from '@/components/Table/TanstackTable';
import AgentFilter from './AgentFilter';
import { InviteAgentModel } from './InviteAgentModal';
import { AgentDeleteModal } from './AgentDeleteModal';
import { useAgent } from './useAgent';

const Agent = () => {
  const {
    selectedAgentList,
    agentListsColumns,
    dropdownOptions,
    setSearchValue,
    searchValue,
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
          <Search
            value={searchValue}
            label="search"
            width="100%"
            setSearchBy={setSearchValue}
            onChange={(e: any) => setSearchValue(e?.target?.value)}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<FilterSharedIcon />}
            onClick={handleOpenDrawer}
          >
            Filter
          </Button>
          <SingleDropdownButton
            dropdownOptions={dropdownOptions}
            disabled={!!!selectedAgentList?.length}
          />
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
        </Box>
      </Box>
      <Box m={'0.5rem 0 0.5rem 0'}>
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
      </Box>
      <Box>
        <InviteAgentModel
          isAgentModalOpen={isAgentModalOpen}
          setEditAgentModalTitle={setEditAgentModalTitle}
          editAgentModalTitle={editAgentModalTitle}
          handleAddAgentModal={handleAddAgentModal}
          selectedAgentList={selectedAgentList}
          setSelectedAgentList={setSelectedAgentList}
        />
        {deleteAgentProps?.openDeleteModal && (
          <AgentDeleteModal deleteAgentProps={deleteAgentProps} />
        )}
      </Box>
      <AgentFilter
        isAgentFilterDrawerOpen={isAgentFilterDrawerOpen}
        setAgentFilterDrawerOpen={setAgentFilterDrawerOpen}
      />
    </>
  );
};

export default Agent;
