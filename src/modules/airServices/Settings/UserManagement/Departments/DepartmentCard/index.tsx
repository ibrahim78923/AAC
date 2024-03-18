import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Typography,
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
import { departmentActionDropdownFunction } from '../Departments.data';

export const DepartmentCard = (props: any) => {
  const { theme, setOpenEdit, item }: any = props;

  return (
    <>
      <Box
        p={2}
        borderRadius={3}
        boxShadow={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box display={'flex'} alignItems={'center'} gap={0.5}>
            <Avatar
              sx={{
                bgcolor: generateColorFromName(item?.name),
                width: 25,
                height: 25,
                fontSize: 14,
              }}
              variant="rounded"
            >
              {item?.name?.slice(0, 2)?.toUpperCase()}
            </Avatar>
            <Typography variant="h5">{truncateText(item?.name)}</Typography>
          </Box>
          <PermissionsGuard
            permissions={
              Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_EDIT_DELETE_DEPARTMENTS
            }
          >
            <SingleDropdownButton
              dropdownOptions={departmentActionDropdownFunction?.()}
              dropdownName={
                <MoreHoriz
                  sx={{ color: 'secondary.lighter' }}
                  fontSize="medium"
                />
              }
              hasEndIcon={false}
              btnVariant="text"
            />
          </PermissionsGuard>
        </Box>
        <Box
          borderBottom={`1px solid ${theme?.palette?.custom?.off_white_one}`}
          p="30px 0 30px 0"
          mb={1}
          overflow="hidden"
          height="100px"
          width="90%"
        >
          <Typography variant="body2">
            <Box
              dangerouslySetInnerHTML={{
                __html: truncateText(item?.description, 95),
              }}
            />
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <AvatarGroup
            max={5}
            sx={{
              transform: 'scaleX(-1)',
              '& .MuiAvatar-root': {
                width: 30,
                height: 30,
                border: 0,
              },
              '& .MuiAvatar-root:last-child': {
                ml: '-6px !important',
              },
            }}
          >
            {item?.membersListDetails
              ?.slice(0, 4)
              ?.map((ava: any) => (
                <Avatar key={ava?._id} src={generateImage(ava?.avatar?.url)} />
              ))}
          </AvatarGroup>
          <IconButton
            onClick={() =>
              setOpenEdit?.({
                item,
                val: true,
              })
            }
          >
            <AddCircle color="primary" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
