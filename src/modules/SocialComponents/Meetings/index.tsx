import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useMeetings } from './useMeetings';
import { SOCIAL_COMPONENTS } from '@/constants';
import { Settings } from '@mui/icons-material';
import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import { ListView } from './ListView';
import { IconButton } from '@mui/material';

export const Meetings = () => {
  const { router } = useMeetings();
  const calenderIntegration = 'Calendar Integration';
  return (
    <>
      <PageTitledHeader
        title={'All Meetings'}
        addTitle="Schedule Meeting"
        handleAction={() => router?.push(SOCIAL_COMPONENTS?.SCHEDULE_MEETING)}
        createPermissionKey={[
          SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.CREATE_MEETING,
        ]}
      >
        <IconButton
          onClick={() =>
            router?.push({
              pathname: SOCIAL_COMPONENTS?.MEETINGS_SETTINGS,
              query: { module: calenderIntegration },
            })
          }
        >
          <Settings />
        </IconButton>
      </PageTitledHeader>
      <ListView />
    </>
  );
};
