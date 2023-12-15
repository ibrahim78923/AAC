import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import { useHeader } from './useHeader';
import FilterWorkflow from '../../FilterWorkflow';
import { AIR_OPERATIONS } from '@/constants';
import { SupervisorRulesDelete } from '../SupervisorRulesDelete';

const Header = ({ selectedSupervisorList }: any) => {
  const {
    searchValue,
    setSearchValue,
    dropdownOptions,
    isDrawerOpen,
    setIsDrawerOpen,
    router,
    deleteWorkflow,
    setDeleteWorkflow,
  } = useHeader();
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box mb={1}>
          <Search
            value={searchValue}
            label="Search Here"
            setSearchBy={setSearchValue}
            onChange={(e: any) => setSearchValue(e?.target?.value)}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <SingleDropdownButton
            dropdownOptions={dropdownOptions}
            disabled={!!!selectedSupervisorList?.length}
          />
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<FilterSharedIcon />}
            onClick={() => setIsDrawerOpen?.(true)}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              router?.push(AIR_OPERATIONS?.UPSERT_SUPERVISOR_RULES)
            }
          >
            Create Rules
          </Button>
        </Box>
      </Box>
      <FilterWorkflow
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <SupervisorRulesDelete
        deleteWorkflow={deleteWorkflow}
        setDeleteWorkflow={setDeleteWorkflow}
      />
    </>
  );
};

export default Header;
