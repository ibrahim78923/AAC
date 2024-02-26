import { CardLayout } from '../CardLayout';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DocumentTextIcon } from '@/assets/icons';
import { usePopularArticles } from './usePopularArticles';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import NoData from '@/components/NoData';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

export const PopularArticles = () => {
  const { palette }: any = useTheme();
  const { data, isLoading, isFetching, isError, router } = usePopularArticles();

  return (
    <CardLayout
      title={'Popular Articles'}
      btnClick={() => {
        router?.push({
          pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE,
        });
      }}
      maxHeight={260}
      btnPosition={'center'}
      buttonText={'View More'}
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState height={'100%'} />
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1.6,
            py: 1.6,
          }}
        >
          {!!data?.data?.articles?.length ? (
            data?.data?.articles?.map((article: any) => (
              <Box
                key={article?._id}
                sx={{
                  px: 1.2,
                  py: 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.6,
                  borderRadius: 1,
                  background: palette?.grey?.[100],
                  flexBasis: { xs: '100%', lg: '48%' },
                  cursor: 'pointer',
                }}
                onClick={() => {
                  router?.push({
                    pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_TICKET_DETAIL,
                    query: {
                      id: article?._id,
                    },
                  });
                }}
              >
                <DocumentTextIcon />
                <Typography variant="body2" color={palette?.grey?.[600]}>
                  {article?.title}
                </Typography>
              </Box>
            ))
          ) : (
            <NoData height={'100%'} />
          )}
        </Box>
      )}
    </CardLayout>
  );
};
