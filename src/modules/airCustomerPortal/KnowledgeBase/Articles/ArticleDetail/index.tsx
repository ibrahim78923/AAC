import { Box } from '@mui/material';
import { useArticleDetail } from './useArticleDetail';
import { RelatedArticles } from '../RelatedArticles';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { SingleArticle } from '../SingleArticle';

export const ArticleDetail = () => {
  const { theme } = useArticleDetail();

  return (
    <ContainerGrid spacing={1}>
      <CustomGrid lg={9}>
        <SingleArticle />
      </CustomGrid>

      <CustomGrid xs={12} lg={3}>
        <Box
          sx={{
            height: '100%',
            borderLeft: {
              lg: `1px solid ${theme?.palette?.grey?.[700]}`,
              xs: 'none',
            },
            borderTop: {
              lg: 'none',
              xs: `1px solid ${theme?.palette?.grey?.[700]}`,
            },
            borderBottom: {
              lg: 'none',
              xs: `1px solid ${theme?.palette?.grey?.[700]}`,
            },
            p: 1,
            flexGrow: 1,
          }}
        >
          <RelatedArticles />
        </Box>
      </CustomGrid>
    </ContainerGrid>
  );
};
