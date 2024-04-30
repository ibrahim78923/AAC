import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useMeetings } from './useMeetings';
import { SOCIAL_COMPONENTS } from '@/constants';
import { Settings } from '@mui/icons-material';
import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import { ListView } from './ListView';

export const Meetings = () => {
  const { router } = useMeetings();
  return (
    <>
      <PageTitledHeader
        title={'Meetings'}
        addTitle="Schedule Meeting"
        handleAction={() => router?.push(SOCIAL_COMPONENTS?.SCHEDULE_MEETING)}
        createPermissionKey={[
          SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.CREATE_MEETING,
        ]}
      >
        <Settings
          sx={{ cursor: 'pointer' }}
          onClick={() => router?.push(SOCIAL_COMPONENTS?.MEETINGS_SETTINGS)}
        />
      </PageTitledHeader>
      <ListView />
    </>
  );
};
