import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { formatTimeDifference } from '@/utils/dateTime';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { MoreVert } from '@mui/icons-material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';

export const AnnouncementCard = (props: any) => {
  const { data, index, dropdownAnnouncementsOptions } = props;

  return (
    <Box
      key={data?._id}
      sx={{ p: 2 }}
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
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={1}
      >
        <Typography fontWeight={600} color={'blue.main'}>
          {truncateText(data?.title)}
        </Typography>
        <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
          <Avatar
            src={generateImage(data?.userAvatar)}
            alt=""
            sx={{
              width: 28,
              height: 28,
              backgroundColor: 'primary.main',
            }}
          >
            <Typography variant="body2" textTransform={'uppercase'}>
              {fullNameInitial(data?.userName)}
            </Typography>
          </Avatar>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
          >
            <Typography variant="body3" color={'blue.main'} fontWeight={500}>
              {fullName(data?.userName)}
            </Typography>
            {!!dropdownAnnouncementsOptions?.length && (
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD,
                ]}
              >
                <Box textAlign={'end'}>
                  <SingleDropdownButton
                    dropdownOptions={dropdownAnnouncementsOptions}
                    dropdownName={<MoreVert />}
                    hasEndIcon={false}
                    btnVariant="text"
                  />
                </Box>
              </PermissionsGuard>
            )}
          </Box>
        </Box>
      </Box>
      <Typography color={'grey.900'} fontSize={'0.75rem'} mt={1}>
        {formatTimeDifference(data?.createdAt)}
      </Typography>
    </Box>
  );
};
