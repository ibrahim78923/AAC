import { FolderIcon } from '@/assets/icons';
import { Box, Typography, useTheme } from '@mui/material';
import { useKnowledgeBase } from '../useKnowledgeBase';

export const KnowledgeBaseCard = (props: any) => {
  const { folderId, name, createdBy, createdDate } = props;
  const { handleKnowledgeBaseDetail } = useKnowledgeBase();
  const theme = useTheme();
  return (
    <Box
      gap={1}
      padding={2.5}
      borderRadius={3}
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      maxWidth={{ xs: '32rem', sm: '25rem', lg: '18rem', xl: '34rem' }}
      width={'100%'}
      height={'auto'}
      border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
      sx={{ cursor: 'pointer' }}
      onClick={() => handleKnowledgeBaseDetail(folderId)}
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
