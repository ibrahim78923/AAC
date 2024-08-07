import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { AddCircle, MoreHoriz } from '@mui/icons-material';
import {
  generateColorFromName,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const DepartmentCard = (props: any) => {
  const { handleAddMember, item, departmentActionDropdown }: any = props;
  const theme = useTheme();
  return (
    <>
      <Box p={2} borderRadius={3} boxShadow={2} height="100%">
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            gap={0.5}
            flexWrap={'wrap'}
          >
            <Avatar
              sx={{
                bgcolor: generateColorFromName(item?.name),
                width: 28,
                height: 28,
              }}
              variant="rounded"
              src={generateImage(item?.attachment?.[0]?.fileUrl)}
            >
              <Typography variant="body2" textTransform={'uppercase'}>
                {item?.name?.slice?.(0, 2)}
              </Typography>
            </Avatar>
            <Typography variant="h5" color="slateBlue.main">
              {truncateText(item?.name)}
            </Typography>
          </Box>
          <PermissionsGuard
            permissions={
              Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_EDIT_DELETE_DEPARTMENTS
            }
          >
            <SingleDropdownButton
              dropdownOptions={departmentActionDropdown?.(item)}
              dropdownName={<MoreHoriz />}
              hasEndIcon={false}
              btnVariant="text"
            />
          </PermissionsGuard>
        </Box>
        <Box
          overflow="scroll"
          height="100px"
          dangerouslySetInnerHTML={{
            __html: item?.description,
          }}
          my={2}
        />
        <Box
          display={'flex'}
          alignItems={'center'}
          flexWrap={'wrap'}
          borderTop={`1px solid ${theme?.palette?.custom?.off_white_one}`}
          pt={1}
        >
          <AvatarGroup
            total={item?.membersListDetails?.length}
            sx={{
              '.MuiAvatarGroup-avatar': {
                width: 30,
                height: 30,
                color: 'slateBlue.main',
                fontSize: '0.8rem',
              },
            }}
          >
            {item?.membersListDetails
              ?.slice(0, 4)
              ?.map((avatar: any) => (
                <Avatar
                  key={avatar?._id}
                  src={generateImage(avatar?.avatar?.url)}
                />
              ))}
          </AvatarGroup>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_MEMBERS_IN_DEPARTMENTS,
            ]}
          >
            <IconButton onClick={() => handleAddMember?.(item)}>
              <AddCircle color="primary" />
            </IconButton>
          </PermissionsGuard>
        </Box>
      </Box>
    </>
  );
};
