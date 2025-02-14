import { Box, Divider } from '@mui/material';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { useViewTimeEntries } from './useTimeEntries';
import StopWatch from './StopWatch';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ViewTimeEntries } from './ViewTimeEntries';
import { SingleTicketDetailChildComponentPropsI } from '../../SingleTicketDetails.interface';
import dynamic from 'next/dynamic';

const AddTime = dynamic(() => import('../AddTime'), {
  ssr: false,
});

export const TimeEntries = (props: SingleTicketDetailChildComponentPropsI) => {
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
