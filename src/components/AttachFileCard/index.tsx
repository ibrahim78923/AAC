import { Box, IconButton, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { useAttachFileCard } from './useAttachFileCard';

export const AttachFileCard = ({ data }: any) => {
  const { getImageByType, theme } = useAttachFileCard();
  return (
    <Box
      key={uuidv4()}
      display={'flex'}
      alignItems={'center'}
      flexWrap={'wrap'}
      border={`0.06rem solid ${theme?.palette?.grey?.[700]}`}
      borderRadius={'.5rem'}
      gap={'.5rem'}
      marginTop={1.5}
      padding={1}
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
        <div>
          <Typography variant="h6" whiteSpace={'nowrap'}>
            {data?.name}
          </Typography>
          <Typography variant="body3" color="#8F98AE" whiteSpace={'nowrap'}>
            {data?.size}
          </Typography>
        </div>
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
        >
          <CloseIcon
            sx={{ color: theme?.palette?.common?.white, fontSize: '.8rem' }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};
