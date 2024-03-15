import { Box, IconButton, Typography } from '@mui/material';
import {
  TimerPauseIcon,
  PencilEditIcon,
  DeleteBlackIcon,
} from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import { WorkloadScheduleDelete } from './WorkloadScheduleDelete';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useWorkloadSchedule } from './useWorkloadSchedule';
import NoData from '@/components/NoData';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const WorkloadSchedule = () => {
  const {
    openDeleteModal,
    setOpenDeleteModal,
    router,
    selectWorkloadSchedule,
    setSelectWorkloadSchedule,
    setWorkloadScheduleForDelete,
    data,
    isLoading,
    isFetching,
    isError,
  } = useWorkloadSchedule();
  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState />;
  return (
    <>
      <PageTitledHeader
        createPermissionKey={[
          AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_CREATE_EDIT_DELETE_WORK_SCHEDULED_FOR_AGENTS,
        ]}
        addTitle={'Create new'}
        handleAction={() =>
          router?.push({
            pathname: AIR_SERVICES?.UPSERT_WORKFLOW_MANAGEMENT,
          })
        }
      />
      {!!data?.data?.length ? (
        data?.data?.map((item: any) => (
          <Box
            key={item?._id}
            display={'flex'}
            justifyContent={'space-between'}
            bgcolor={'grey.100'}
            mt={1}
            gap={1}
            p={2}
            borderRadius={3}
            flexWrap={'wrap'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              flexWrap={'wrap'}
            >
              <TimerPauseIcon />
              <Typography>
                {item?.name?.length > 20
                  ? `${item?.name?.slice(0, 20)} ...`
                  : item?.name}
              </Typography>
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              flexWrap={'wrap'}
            >
              <IconButton
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  router?.push({
                    pathname: AIR_SERVICES?.UPSERT_WORKFLOW_MANAGEMENT,
                    query: { workloadScheduleId: item?._id },
                  })
                }
              >
                <PencilEditIcon />
              </IconButton>
              <IconButton
                sx={{ cursor: 'pointer' }}
                onClick={() => setWorkloadScheduleForDelete(item?._id)}
              >
                <DeleteBlackIcon />
              </IconButton>
            </Box>
          </Box>
        ))
      ) : (
        <NoData message="No workload schedule found" />
      )}
      {openDeleteModal && (
        <WorkloadScheduleDelete
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          selectWorkloadSchedule={selectWorkloadSchedule}
          setSelectWorkloadSchedule={setSelectWorkloadSchedule}
        />
      )}
    </>
  );
};
