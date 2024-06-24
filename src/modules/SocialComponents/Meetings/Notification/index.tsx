import { AntSwitch } from '@/components/AntSwitch';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Avatar, Box, Typography } from '@mui/material';
import { useNotification } from './useNotification';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const Notification = () => {
  const {
    meetingsNotificationData,
    toggleMeetingsNotification,
    patchMeetingsSettingsNotificationStatus,
    isLoading,
    isFetching,
    isError,
    data,
  } = useNotification();

  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState />;

  return (
    <Box>
      <PageTitledHeader title={'Notification'} />
      {meetingsNotificationData?.map((item: any) => (
        <Box
          key={item?.id}
          border="1px solid"
          borderColor="grey.700"
          borderRadius={3}
          marginTop={2}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          p={2}
        >
          <Box display={'flex'} gap={3} alignItems={'center'}>
            <Avatar variant="rounded" sx={{ backgroundColor: 'primary.light' }}>
              {item?.avatar}
            </Avatar>
            <Box>
              <Typography variant="h6" color="grey.800">
                {item?.type}
              </Typography>
              <Typography variant="body2" fontWeight={500} color="custom.main">
                {item?.purpose}
              </Typography>
            </Box>
          </Box>
          <AntSwitch
            onChange={(e: any) => toggleMeetingsNotification?.(e, item)}
            checked={data?.data?.notificationsOff?.[item?.enum]}
            isLoading={
              patchMeetingsSettingsNotificationStatus?.isLoading &&
              patchMeetingsSettingsNotificationStatus?.originalArgs?.pathParams
                ?.enum === item?.enum
            }
            disabled={patchMeetingsSettingsNotificationStatus?.isLoading}
          />
        </Box>
      ))}
    </Box>
  );
};
