import { DocumentTextIcon } from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { truncateText } from '@/utils/avatarUtils';

export const KnowledgeBaseTicket = (props: any) => {
  const {
    modifiedDate,
    purposeDescription,
    articleId,
    articlesTitle,
    folderId,
    folderName,
  } = props;
  const router = useRouter();

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      pr={4}
      mb={2}
    >
      <Box display={'flex'} gap={1.5}>
        <DocumentTextIcon />
        <Box
          display={'flex'}
          justifyContent={'flex-start'}
          flexDirection={'column'}
          pr={4}
        >
          <Typography variant="h6">{truncateText(articlesTitle)}</Typography>
          <Typography color="secondary">Modified on: {modifiedDate}</Typography>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'flex-start'}
          flexDirection={'column'}
        >
          <Typography variant="h6">Purpose:</Typography>
          <Typography color="secondary">
            {truncateText(purposeDescription, 40)}
          </Typography>
        </Box>
      </Box>
      <VisibilityIcon
        sx={{ cursor: 'pointer', color: 'blue.main' }}
        onClick={() =>
          router?.push({
            pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_TICKET_DETAIL,
            query: { articleId, folderId, folderName },
          })
        }
      />
    </Box>
  );
};
