import { Box, Typography } from '@mui/material';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { formatTimeDifference } from '@/utils/dateTime';
import { MoreVert } from '@mui/icons-material';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { AnnouncementCardProps } from './AnnouncementCard.interface';
import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';
import { PublicSingleDropdownButton } from '@/components/PublicSingleDropdownButton';

const { ONE } = SELECTED_ARRAY_LENGTH ?? {};
const {} = AIR_SERVICES_DASHBOARD_PERMISSIONS ?? {};

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
        index !== data?.announcements?.length - ONE ? '1px solid' : ''
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
            nameInitial={fullNameInitial(userDetails?.userName)}
            name={fullName(userDetails?.userName)}
            avatarSrc={userDetails?.userAvatar}
          />
          {isLoggedInUser && !!dropdownAnnouncementsOptions?.length && (
            <Box>
              <PublicSingleDropdownButton
                dropdownOptions={dropdownAnnouncementsOptions}
                dropdownName={<MoreVert />}
                hasEndIcon={false}
                btnVariant="text"
                sx={{ padding: 0 }}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Typography color={'grey.900'} component={'p'} variant="body3">
        {formatTimeDifference(data?.createdAt)}
      </Typography>
    </Box>
  );
};
