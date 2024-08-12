import { Box, Divider } from '@mui/material';
import { AddTime } from '../AddTime';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { useViewTimeEntries } from './useTimeEntries';
import StopWatch from './StopWatch';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ViewTimeEntries } from './ViewTimeEntries';

export const TimeEntries = (props: any) => {
  const { data } = props;
  const { isDrawerOpen, setIsDrawerOpen, isTimerPause } = useViewTimeEntries();

  return (
    <>
      <Box
        borderRadius={2}
        border={1}
        borderColor={'custom.off_white_three'}
        px={2}
        py={1}
      >
        <br />
        <Box>
          <PageTitledHeader
            title="Time Entries"
            handleAction={() => setIsDrawerOpen(true)}
            addTitle="Add Time"
            disableAddButton={!isTimerPause}
            createPermissionKey={[
              AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_TIME_ENTRIES_DETAILS,
            ]}
          >
            <StopWatch {...props} />
          </PageTitledHeader>
        </Box>
        <Divider />
        <ViewTimeEntries />
      </Box>
      {isDrawerOpen && (
        <AddTime
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          data={data}
        />
      )}
    </>
  );
};
