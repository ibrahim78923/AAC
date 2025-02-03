import { DocumentTextIcon } from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import { KnowledgeBaseArticlesI } from './KnowledgeBaseArticles.interface';
import { TruncateText } from '@/components/TruncateText';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { CustomIconButton } from '@/components/Buttons/CustomIconButton';

export const ArticleCard = (props: KnowledgeBaseArticlesI) => {
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
      gap={1}
      bgcolor={'grey.100'}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        flexDirection={{ xs: 'column', lg: 'row' }}
        gap={2}
        flex={1}
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
          flex={0.8}
          display={'flex'}
          justifyContent={'center'}
          alignItems={{ xs: 'center', lg: 'flex-start' }}
          flexDirection={'column'}
        >
          <Typography variant="h6">Purpose:</Typography>
          <Box
            sx={{
              color: 'custom.mulled_wine',
              overflow: 'auto',
              maxHeight: '10vh',
              '&::-webkit-scrollbar': {
                width: 2,
                height: 2,
              },
            }}
            dangerouslySetInnerHTML={{
              __html: purposeDescription,
            }}
          />
        </Box>
      </Box>
      <CustomIconButton
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
      </CustomIconButton>
    </Box>
  );
};
