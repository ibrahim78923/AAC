import { Box, IconButton, Typography } from '@mui/material';
import { AddCircle, MoreHoriz } from '@mui/icons-material';
import { generateColorFromName, truncateText } from '@/utils/avatarUtils';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { IDepartmentsProps } from '../Departments.interface';
import { CustomAvatar } from '@/components/CustomAvatar';
import { CustomAvatarGroup } from '@/components/CustomAvatarGroup';

export const DepartmentCard = (props: IDepartmentsProps) => {
  const { handleAddMember, item, departmentActionDropdown } = props;
  return (
    <Box p={2} borderRadius={3} boxShadow={2} height="100%">
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
      >
        <Box display={'flex'} alignItems={'center'} gap={0.5} flexWrap={'wrap'}>
          <CustomAvatar
            avatarSrc={item?.attachment?.fileUrl}
            nameInitial={item?.name?.slice?.(0, 2)}
            backgroundColor={generateColorFromName(item?.name)}
            avatarSize={{ variant: 'rounded' }}
          />
          <Typography
            variant="h5"
            color="slateBlue.main"
            textTransform="capitalize"
          >
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
        borderTop={`1px solid `}
        borderColor="custom.off_white_three"
        pt={1}
      >
        <CustomAvatarGroup max={4} selectedUsers={item?.membersListDetails} />
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
  );
};
