import { Box, IconButton } from '@mui/material';
import {
  TimerPauseIcon,
  PencilEditIcon,
  DeleteBlackIcon,
} from '@/assets/icons';
import { AIR_SERVICES } from '@/constants/routes';
import { WorkloadScheduleDelete } from './WorkloadScheduleDelete';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useWorkloadSchedule } from './useWorkloadSchedule';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { TruncateText } from '@/components/TruncateText';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

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
    refetch,
  } = useWorkloadSchedule();

  return (
    <>
      <PageTitledHeader
        createPermissionKey={[
          AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_CREATE_EDIT_DELETE_WORK_SCHEDULED_FOR_AGENTS,
        ]}
        hasStartIcon={false}
        addTitle={'Create new'}
        title={''}
        handleAction={() =>
          router?.push({
            pathname: AIR_SERVICES?.UPSERT_WORKFLOW_MANAGEMENT,
          })
        }
      />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        hasNoData={!!!data?.data?.length}
        noDataMessage="No workload schedule found"
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_BIG_LARGE_CARD}
      >
        {data?.data?.map((item: any) => (
          <Box
            key={item?._id}
            display={'flex'}
            justifyContent={'space-between'}
            bgcolor={'grey.100'}
            border={'1px solid'}
            borderColor={'custom.off_white_three'}
            flexWrap={'wrap'}
            mb={2}
            gap={1}
            p={2}
            borderRadius={4}
          >
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <TimerPauseIcon />

              <TruncateText text={item?.name} size={30} />
            </Box>

            <Box display={'flex'} alignItems={'center'} gap={1}>
              <IconButton
                sx={{ cursor: 'pointer' }}
                onClick={() => setWorkloadScheduleForDelete(item?._id)}
              >
                <DeleteBlackIcon />
              </IconButton>

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
            </Box>
          </Box>
        ))}
      </ApiRequestFlow>

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
