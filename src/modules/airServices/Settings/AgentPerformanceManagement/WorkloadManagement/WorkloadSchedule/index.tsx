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
import { workloadScheduleData } from './WorkloadSchedule.data';
import NoData from '@/components/NoData';

export const WorkloadSchedule = () => {
  const {
    openDeleteModal,
    setOpenDeleteModal,
    router,
    selectWorkloadSchedule,
    setSelectWorkloadSchedule,
    setWorkloadScheduleForDelete,
  } = useWorkloadSchedule();

  return (
    <>
      <br />
      <PageTitledHeader
        addTitle={'Create new'}
        handleAction={() =>
          router?.push({
            pathname: AIR_SERVICES?.UPSERT_WORKFLOW_MANAGEMENT,
          })
        }
      />
      {!!workloadScheduleData?.length ? (
        workloadScheduleData?.map((item: any) => (
          <Box
            key={item?._id}
            display={'flex'}
            justifyContent={'space-between'}
            bgcolor={'grey.0'}
            mt={1}
            gap={1}
            p={1}
            flexWrap={'wrap'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              flexWrap={'wrap'}
            >
              <TimerPauseIcon />
              <Typography> {item?.name}</Typography>
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
      <WorkloadScheduleDelete
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectWorkloadSchedule={selectWorkloadSchedule}
        setSelectWorkloadSchedule={setSelectWorkloadSchedule}
      />
    </>
  );
};
