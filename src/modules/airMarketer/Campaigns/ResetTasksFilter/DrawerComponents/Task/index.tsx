import { Box, Button, Stack } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns, data } from './Tasks.data';
import { FilterIcon } from '@/assets/icons';

const Task = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Button className="small">View all tasks</Button>
        <Button className="small" startIcon={<FilterIcon />}>
          Filters
        </Button>
      </Stack>
      <Box>
        <TanstackTable columns={columns} data={data} />
      </Box>
    </>
  );
};

export default Task;
