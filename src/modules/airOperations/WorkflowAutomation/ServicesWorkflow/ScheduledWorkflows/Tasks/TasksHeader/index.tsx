import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import FilterWorkflow from '../../../FilterWorkflow';
import { useTasksHeader } from './useTasksHeader';
import { AIR_OPERATIONS } from '@/constants';
import { ScheduledWorkflowDelete } from '../../ScheduledWorkflowDelete';

const TasksHeader = ({ selectedTasksList }: any) => {
  const {
    searchValue,
    setSearchValue,
    dropdownOptions,
    isDrawerOpen,
    setIsDrawerOpen,
    router,
    setDeleteWorkflow,
    deleteWorkflow,
  } = useTasksHeader();
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
            disabled={!!!selectedTasksList?.length}
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

export default TasksHeader;
