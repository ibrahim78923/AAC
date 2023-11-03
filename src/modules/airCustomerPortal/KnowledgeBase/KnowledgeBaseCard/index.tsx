import { FolderIcon } from '@/assets/icons';
import { Box, Typography, useTheme } from '@mui/material';

export const KnowledgeBaseCard = (props: any) => {
  const { name, createdBy, createdDate } = props;
  const theme = useTheme();
  return (
    <Box
      gap={1}
      padding={3}
      borderRadius={3}
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      maxWidth={'18rem'}
      width={'100%'}
      height={'auto'}
      border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
      sx={{ cursor: 'pointer' }}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        padding={2}
        bgcolor={theme?.palette?.grey?.[400]}
      >
        <FolderIcon />
      </Box>
      <Typography variant="h5">{name}</Typography>
      <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Typography variant="body2">Created By: {createdBy}</Typography>
        <Typography variant="body2">Created Date: {createdDate}</Typography>
      </Box>
    </Box>
  );
};
