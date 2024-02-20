import { CardLayout } from '../CardLayout';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DocumentTextIcon } from '@/assets/icons';
import { styles } from './PopularArticles.style';
import { usePopularArticles } from './usePopularArticles';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import NoData from '@/components/NoData';

export const PopularArticles = ({ title, handleViewMore }: any) => {
  const { palette }: any = useTheme();
  const { data, isLoading, isFetching, isError } = usePopularArticles();
  const { articleWrapper } = styles;

  return (
    <CardLayout
      title={title}
      btnClick={handleViewMore}
      maxHeight={260}
      btnPosition={'center'}
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState />
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
              <Box key={article?._id} sx={articleWrapper(palette)}>
                <DocumentTextIcon />
                <Typography variant="body2" color={palette?.grey?.[600]}>
                  {article?.title}
                </Typography>
              </Box>
            ))
          ) : (
            <NoData />
          )}
        </Box>
      )}
    </CardLayout>
  );
};
