import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useAttachFileCard } from './useAttachFileCard';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  formatFileSize,
  getImageByType,
  truncateText,
} from '@/utils/avatarUtils';
import { AttachFileCardPropsI } from './AttachFileCard.interface';

export const AttachFileCard = (props: AttachFileCardPropsI) => {
  const {
    data,
    onDelete,
    permissionKey = [],
    size,
    hasStyling = true,
    canDelete = true,
  } = props;
  const { cross, setCross } = useAttachFileCard();

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      flexWrap={'wrap'}
      {...(hasStyling
        ? {
            border: `1px solid`,
            borderColor: 'custom.off_white_three',
            sx: { ':hover': { cursor: 'pointer', boxShadow: 1 } },
            padding: 1,
          }
        : {})}
      {...(canDelete
        ? {
            onMouseEnter: () => setCross(true),
            onMouseLeave: () => setCross(false),
          }
        : {})}
      borderRadius={2}
      gap={1}
    >
      <Avatar
        src={getImageByType(data, data?.fileUrl)}
        alt="file-preview"
        sx={{ width: size?.width ?? 35, height: size?.height ?? 35 }}
        variant={size?.variant ?? 'rounded'}
      />
      <Box
        display={'flex'}
        flex={'auto'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <Box>
          <Typography
            variant="body2"
            color="slateBlue.main"
            whiteSpace={'nowrap'}
          >
            {truncateText(data?.orignalName)}
          </Typography>
          <Typography
            variant="body3"
            color={'grey.900'}
            component={'div'}
            whiteSpace={'nowrap'}
          >
            {formatFileSize(data?.fileSize)}
          </Typography>
        </Box>
        <PermissionsGuard permissions={permissionKey}>
          {cross && (
            <IconButton
              disableFocusRipple
              disableRipple
              size="small"
              sx={{
                backgroundColor: 'custom.dark',
                ':hover': {
                  backgroundColor: 'custom.dark',
                },
              }}
              onClick={onDelete}
            >
              <Close sx={{ color: 'common.white', fontSize: '14px' }} />
            </IconButton>
          )}
        </PermissionsGuard>
      </Box>
    </Box>
  );
};
