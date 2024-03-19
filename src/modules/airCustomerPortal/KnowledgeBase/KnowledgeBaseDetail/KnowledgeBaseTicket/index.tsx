import { DocumentTextIcon } from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

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
      flexDirection={{ xs: 'column', md: 'column', lg: 'row' }}
      mb={2}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={{ xs: 'column', md: 'column', lg: 'row' }}
        gap={1.5}
      >
        <DocumentTextIcon />
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          overflow={'auto'}
          height={'3.5rem'}
        >
          <Typography variant="h6">{articlesTitle}</Typography>
          <Typography color="secondary">Modified on: {modifiedDate}</Typography>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          overflow={'auto'}
          height={'3.5rem'}
        >
          <Typography variant="h6">Purpose:</Typography>
          <Typography color="secondary">{purposeDescription}</Typography>
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
