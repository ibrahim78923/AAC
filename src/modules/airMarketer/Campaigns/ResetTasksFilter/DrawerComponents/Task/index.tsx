import { Box, Button, Stack, Tooltip } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Tasks.data';
import {
  AlertModalDeleteIcon,
  FilterIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import Filters from '../Filters';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { AlertModals } from '@/components/AlertModals';
import EditTask from './EditTask';
interface DeleteDrawer {
  isToggled: boolean;
  id: string;
}
interface EditDrawer {
  isToggled: boolean;
  id: string;
  type: string;
}
interface Props {
  setIsOpenDeleteDrawer: (value: DeleteDrawer) => void;
  setIsEditDrawer: (value: EditDrawer) => void;
  handleDeleteModal: (value: string) => void;
  setCurrentTabVal: (value: number) => void;
  setIsFilters: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  isOpenDeleteDrawer: DeleteDrawer;
  deleteTaskLoading: boolean;
  isEditDrawer: EditDrawer;
  isFilters: boolean;
  reset: () => void;
  loading: boolean;
  methods: any;
  data: any;
}

const Task = ({
  setIsOpenDeleteDrawer,
  isOpenDeleteDrawer,
  deleteTaskLoading,
  handleDeleteModal,
  setCurrentTabVal,
  setIsEditDrawer,
  setIsFilters,
  isEditDrawer,
  setIsOpen,
  isFilters,
  loading,
  methods,
  data,
  reset,
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
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title={'Refresh Filter'}>
                <Button
                  sx={{ width: { xs: '100%', sm: '50px' } }}
                  variant="outlined"
                  color="inherit"
                  className="small"
                  onClick={reset}
                >
                  <RefreshTasksIcon />
                </Button>
              </Tooltip>
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
            </Box>
          </Stack>

          {loading ? (
            <SkeletonTable />
          ) : (
            <TanstackTable
              columns={columns(
                setIsOpenDeleteDrawer,
                setIsEditDrawer,
                setIsOpen,
              )}
              data={data}
              loading={loading}
            />
          )}
        </>
      )}
      {isOpenDeleteDrawer?.isToggled && (
        <AlertModals
          message="You're about to delete a record. Are you sure?"
          type="Delete"
          typeImage={<AlertModalDeleteIcon />}
          open={isOpenDeleteDrawer?.isToggled}
          handleClose={() =>
            setIsOpenDeleteDrawer({ ...isOpenDeleteDrawer, isToggled: false })
          }
          handleSubmitBtn={() => handleDeleteModal(isOpenDeleteDrawer?.id)}
          loading={deleteTaskLoading}
        />
      )}
      {isEditDrawer?.isToggled && (
        <EditTask
          isOpenDrawer={isEditDrawer?.isToggled}
          setIsOpenEditTaskDrawer={setIsEditDrawer}
          onClose={() => {
            {
              setIsEditDrawer({ ...isEditDrawer, isToggled: false });
            }
          }}
          type={isEditDrawer?.type}
          selectedRec={isEditDrawer?.id}
        />
      )}
    </>
  );
};

export default Task;
