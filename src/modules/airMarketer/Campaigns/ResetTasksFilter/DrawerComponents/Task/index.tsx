import { Button, Stack } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Tasks.data';
import { FilterIcon } from '@/assets/icons';
import Filters from '../Filters';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

interface Props {
  setCurrentTabVal: (value: number) => void;
  setIsFilters: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  isFilters: boolean;
  loading: boolean;
  data: any;
  methods: any;
}

const Task = ({
  setCurrentTabVal,
  setIsFilters,
  setIsOpen,
  isFilters,
  loading,
  methods,
  data,
}: Props) => {
  return (
    <>
      {isFilters ? (
        <Filters methods={methods} />
      ) : (
        <>
          <Stack direction="row" justifyContent="space-between" my={1}>
            <Button
              className="small"
              variant="text"
              onClick={() => {
                setCurrentTabVal(2);
                setIsOpen(false);
              }}
            >
              View all tasks
            </Button>
            <Button
              onClick={() => {
                setIsFilters(true);
              }}
              className="small"
              variant="text"
              color="inherit"
              startIcon={<FilterIcon />}
            >
              Filters
            </Button>
          </Stack>

          {loading ? (
            <SkeletonTable />
          ) : (
            <TanstackTable columns={columns} data={data} loading={loading} />
          )}
        </>
      )}
    </>
  );
};

export default Task;
