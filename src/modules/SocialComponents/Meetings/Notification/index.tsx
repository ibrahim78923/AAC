import { AntSwitch } from '@/components/AntSwitch';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Avatar, Box, Typography } from '@mui/material';
import { useNotification } from './useNotification';
import { MeetingNotificationI } from './Notification.interface';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const Notification = () => {
  const {
    meetingsNotificationData,
    toggleMeetingsNotification,
    patchMeetingsSettingsNotificationStatus,
    isLoading,
    isFetching,
    isError,
    data,
    refetch,
  } = useNotification();

  return (
    <Box>
      <PageTitledHeader title={'Notification'} />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        skeletonType={SKELETON_TYPES?.BARS}
        hasError={isError}
        refreshApi={refetch}
      >
        {meetingsNotificationData?.map((item: MeetingNotificationI) => (
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
              <Avatar
                variant="rounded"
                sx={{ backgroundColor: 'primary.light' }}
              >
                {item?.avatar}
              </Avatar>
              <Box>
                <Typography variant="h6" color="grey.800">
                  {item?.type}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="custom.main"
                >
                  {item?.purpose}
                </Typography>
              </Box>
            </Box>
            <AntSwitch
              onChange={(e: any) => toggleMeetingsNotification?.(e, item)}
              checked={data?.data?.notificationsOff?.[item?.enum]}
              isLoading={
                patchMeetingsSettingsNotificationStatus?.isLoading &&
                patchMeetingsSettingsNotificationStatus?.originalArgs
                  ?.pathParams?.enum === item?.enum
              }
              disabled={patchMeetingsSettingsNotificationStatus?.isLoading}
            />
          </Box>
        ))}
      </ApiRequestFlow>
    </Box>
  );
};
