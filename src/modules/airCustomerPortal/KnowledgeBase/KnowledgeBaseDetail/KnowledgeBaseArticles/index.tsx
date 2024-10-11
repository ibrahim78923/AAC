import { DocumentTextIcon } from '@/assets/icons';
import { Box, IconButton, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { truncateText } from '@/utils/avatarUtils';
import { KnowledgeBaseArticlesI } from './KnowledgeBaseArticles.interface';
import { TruncateText } from '@/components/TruncateText';

export const KnowledgeBaseArticles = (props: KnowledgeBaseArticlesI) => {
  const { modifiedDate, purposeDescription, articleId, articlesTitle } = props;
  const router = useRouter();

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      flexDirection={{ xs: 'column', lg: 'row' }}
      mb={{ xs: 4, lg: 2 }}
      borderRadius={2}
      p={1}
      bgcolor={'grey.100'}
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
          <Typography variant="h6">
            {<TruncateText text={articlesTitle?.toLowerCase()} />}
          </Typography>
          <Typography color="secondary">Modified on: {modifiedDate}</Typography>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={{ xs: 'center', lg: 'flex-start' }}
          flexDirection={'column'}
        >
          <Typography variant="h6">Purpose:</Typography>
          <Box
            dangerouslySetInnerHTML={{
              __html: truncateText(purposeDescription, 40),
            }}
          />
        </Box>
      </Box>
      <IconButton
        onClick={() =>
          router?.push({
            pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_TICKET_DETAIL,
            query: {
              articleId,
              folderId: router?.query?.folderId,
              ...(router?.query?.companyId && {
                companyId: router?.query?.companyId,
              }),
            },
          })
        }
      >
        <VisibilityIcon sx={{ color: 'blue.main' }} />
      </IconButton>
    </Box>
  );
};
