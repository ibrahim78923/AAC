import { Box, Grid, Typography, useTheme } from '@mui/material';
import SingleViewArticleDetail from './SingleViewArticleDetail';
import { singleViewArticleData } from './SingleViewArticle.data';
import { v4 as uuidv4 } from 'uuid';
import { ViewDetailBackArrowIcon } from '@/assets/icons';

export const SingleViewArticle = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={2} gap={1}>
        <Grid item xs={9}>
          <Box display={'flex'} alignItems={'center'} gap={2} py={'1rem'}>
            <Box sx={{ cursor: 'pointer' }}>
              <ViewDetailBackArrowIcon />
            </Box>
            <Typography variant="h3">View Article</Typography>
          </Box>
          {singleViewArticleData?.map((item) => (
            <SingleViewArticleDetail
              key={uuidv4()}
              title={item?.title}
              detail={item?.detail}
              secondTitle={item?.secondTitle}
              options={item?.options}
              optionsDetail={item?.optionsDetail}
            />
          ))}
        </Grid>
        <Grid
          item
          xs={2.5}
          borderLeft={`0.125rem solid ${theme?.palette?.divider}`}
        >
          <Typography variant="body2" fontWeight={500}>
            Details
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
