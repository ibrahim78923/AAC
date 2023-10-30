import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { useAttachFileCard } from './useAttachFileCard';

export const AttachFileCard = ({ data, onDelete }: any) => {
  const { getImageByType, theme, cross, setCross } = useAttachFileCard();

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
        src={getImageByType(data)}
        alt="file-preview"
        width={45}
        height={45}
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
        {cross && (
          <IconButton
            disableFocusRipple
            disableRipple
            size="small"
            sx={{
              backgroundColor: 'custom.dark',
              ':hover': {
                backgroundColor: 'custom.dark ',
              },
            }}
            onClick={onDelete}
          >
            <CloseIcon
              sx={{ color: theme?.palette?.common?.white, fontSize: '14px' }}
            />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
