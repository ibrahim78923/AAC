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
      flexDirection={{ xs: 'column', lg: 'row' }}
      mb={{ xs: 4, lg: 2 }}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={{ xs: 'column', lg: 'row' }}
        gap={1.5}
      >
        <DocumentTextIcon />
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={{ xs: 'center', lg: 'flex-start' }}
          flexDirection={'column'}
        >
          <Typography variant="h6">{articlesTitle}</Typography>
          <Typography color="secondary">Modified on: {modifiedDate}</Typography>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={{ xs: 'center', lg: 'flex-start' }}
          flexDirection={'column'}
        >
          <Typography variant="h6">Purpose:</Typography>
          <Typography
            color="secondary"
            sx={{
              overflowX: 'auto',
              maxWidth: { xs: '10rem', sm: '20rem', md: '30rem', lg: '38rem' },
              width: '100%',
              whiteSpace: 'nowrap',
            }}
          >
            {purposeDescription}
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
