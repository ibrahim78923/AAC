import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import FilterWorkflow from '../../../FilterWorkflow';
import { useMeetingsHeader } from './useMeetingsHeader';
import { ScheduledWorkflowDelete } from '../../ScheduledWorkflowDelete';
import { AIR_OPERATIONS } from '@/constants';

const MeetingsHeader = ({ selectedMeetingsList }: any) => {
  const {
    searchValue,
    setSearchValue,
    dropdownOptions,
    isDrawerOpen,
    setIsDrawerOpen,
    setDeleteWorkflow,
    deleteWorkflow,
    router,
  } = useMeetingsHeader();
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
            disabled={!!!selectedMeetingsList?.length}
          />
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<FilterSharedIcon />}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              router?.push(AIR_OPERATIONS?.UPSERT_SCHEDULE_WORKFLOW)
            }
          >
            Create Scheduled workflows
          </Button>
        </Box>
      </Box>
      <FilterWorkflow
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <ScheduledWorkflowDelete
        deleteWorkflow={deleteWorkflow}
        setDeleteWorkflow={setDeleteWorkflow}
      />
    </>
  );
};

export default MeetingsHeader;
