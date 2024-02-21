import TanstackTable from '@/components/Table/TanstackTable';
import { columns, data } from './WorkFlowTable.data';
import { Stack } from '@mui/material';
import Search from '@/components/Search';
import useWorkFlowTable from './useWorkFlowTable';
import FilterButton from '../FilterButton';

const WorkFlowTable = () => {
  const { setSearch } = useWorkFlowTable();
  return (
    <>
      <Stack direction={{ sm: 'row' }} gap={2} justifyContent="space-between">
        <Search
          placeholder="Search here"
          size="small"
          onChange={(e: any) => {
            setSearch(e?.target?.value);
          }}
        />
        <FilterButton />
      </Stack>
      <TanstackTable columns={columns} data={data} />
    </>
  );
};

export default WorkFlowTable;
