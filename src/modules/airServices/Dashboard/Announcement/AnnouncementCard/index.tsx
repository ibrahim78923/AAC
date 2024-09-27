import { Box, Typography } from '@mui/material';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { formatTimeDifference } from '@/utils/dateTime';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { MoreVert } from '@mui/icons-material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { AnnouncementCardProps } from './AnnouncementCard.interface';
import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';

export const AnnouncementCard = (props: AnnouncementCardProps) => {
  const {
    data,
    index,
    dropdownAnnouncementsOptions,
    isLoggedInUser,
    userDetails,
  } = props;

  return (
    <Box
      key={data?._id}
      px={2}
      py={1.5}
      borderBottom={
        index !== data?.announcements?.length - SELECTED_ARRAY_LENGTH?.ONE
          ? '1px solid'
          : ''
      }
      borderColor={'custom.off_white'}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
      >
        <Typography
          fontWeight={'fontWeightMedium'}
          component={'div'}
          color={'blue.main'}
        >
          <TruncateText text={data?.title} />
        </Typography>
        <Box display={'flex'} flexWrap={'wrap'} gap={1}>
          <UserInfo
            boxProps={{ marginBottom: 1.5 }}
            nameInitial={fullNameInitial(userDetails?.userName)}
            name={fullName(userDetails?.userName)}
            avatarSrc={userDetails?.userAvatar}
          />

          <PermissionsGuard
            permissions={[
              AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD,
            ]}
          >
            {isLoggedInUser && !!dropdownAnnouncementsOptions?.length && (
              <Box>
                <SingleDropdownButton
                  dropdownOptions={dropdownAnnouncementsOptions}
                  dropdownName={<MoreVert />}
                  hasEndIcon={false}
                  btnVariant="text"
                  sx={{ padding: 0 }}
                />
              </Box>
            )}
          </PermissionsGuard>
        </Box>
      </Box>
      <Typography color={'grey.900'} component={'p'} variant="body3">
        {formatTimeDifference(data?.createdAt)}
      </Typography>
    </Box>
  );
};
