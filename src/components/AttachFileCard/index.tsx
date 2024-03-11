import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { useAttachFileCard } from './useAttachFileCard';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { generateImage } from '@/utils/avatarUtils';

export const AttachFileCard = (props: any) => {
  const { data, onDelete, permissionKey, size } = props;
  const { theme, cross, setCross } = useAttachFileCard();
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      flexWrap={'wrap'}
      border={`1px solid ${theme?.palette?.grey?.[700]}`}
      borderRadius={2}
      gap={1}
      padding={1}
      sx={{ ':hover': { cursor: 'pointer', boxShadow: 1 } }}
      onMouseEnter={() => setCross(true)}
      onMouseLeave={() => setCross(false)}
    >
      <Image
        src={generateImage(data?.fileUrl)}
        alt="file-preview"
        width={size?.width ?? 45}
        height={size?.height ?? 45}
        style={{ objectFit: 'cover' }}
      />
      <Box
        display={'flex'}
        flex={'auto'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box>
          <Typography variant="h6" whiteSpace={'nowrap'}>
            {data?.name}
          </Typography>
          <Typography
            variant="body3"
            color={theme?.palette?.grey?.[900]}
            whiteSpace={'nowrap'}
          >
            {data?.size}
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
              <CloseIcon
                sx={{ color: theme?.palette?.common?.white, fontSize: '14px' }}
              />
            </IconButton>
          )}
        </PermissionsGuard>
      </Box>
    </Box>
  );
};
