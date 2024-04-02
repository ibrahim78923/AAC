import { FolderIcon } from '@/assets/icons';
import { Avatar, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export const KnowledgeBaseCard = (props: any) => {
  const { folderId, name, createdBy, createdDate, handleKnowledgeBaseDetail } =
    props;

  return (
    <Box
      gap={1}
      padding={2.5}
      borderRadius={3}
      display={'flex'}
      flexDirection={'column'}
      height={'100%'}
      textAlign={'center'}
      border={`1px solid`}
      borderColor="custom.off_white"
      sx={{ cursor: 'pointer' }}
      onClick={() => handleKnowledgeBaseDetail(folderId)}
    >
      <Avatar sx={{ margin: 'auto' }} variant="rounded">
        <FolderIcon />
      </Avatar>
      <Typography variant="h5" color="slateBlue.main">
        {name}
      </Typography>
      <Typography variant="body2" color="slateBlue.main">
        Created By: {createdBy}
      </Typography>
      <Typography variant="body2" color="slateBlue.main">
        Created Date: {dayjs(createdDate)?.format(DATE_FORMAT?.UI)}
      </Typography>
    </Box>
  );
};
