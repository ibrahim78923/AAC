import { FilterSharedIcon, PlusSharedColorIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useAgent } from './useAgent';
import TanstackTable from '@/components/Table/TanstackTable';
import { agentListData } from './Agent.data';

const Agent = () => {
  const {
    selectedAgentList,
    agentListsColumns,
    dropdownOptions,
    setSearchValue,
    searchValue,
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
          >
            Filter
          </Button>
          <SingleDropdownButton
            dropdownOptions={dropdownOptions}
            disabled={!!!selectedAgentList?.length}
          />
          <Button variant="contained" startIcon={<PlusSharedColorIcon />}>
            Invite Agents
          </Button>
        </Box>
      </Box>
      <Box m={'0.5rem 0 0.5rem 0'}>
        <TanstackTable
          data={agentListData}
          columns={agentListsColumns}
          isPagination
        />
      </Box>
    </>
  );
};

export default Agent;
