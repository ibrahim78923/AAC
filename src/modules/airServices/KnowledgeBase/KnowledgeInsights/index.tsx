import { Grid, Typography } from '@mui/material';
import { styles } from './KnowledgeInsights.style';
import { v4 as uuidv4 } from 'uuid';

const trendingInsightsData = [
  {
    id: '1',
    insights: 'system memory',
    mentions: 12,
  },
  {
    id: '2',
    insights: 'password reset',
    mentions: 15,
  },
  {
    id: '3',
    insights: 'security firewall',
    mentions: 456,
  },
  {
    id: '4',
    insights: 'leave approval',
    mentions: 454,
  },
  {
    id: '4',
    insights: 'saved files',
    mentions: 124,
  },
  {
    id: '4',
    insights: 'directory',
    mentions: 214,
  },
  {
    id: '4',
    insights: 'salary',
    mentions: 123,
  },
];
export const KnowledgeInsights = () => {
  return (
    <>
      <Typography variant="h5" py={'0.625rem'}>
        Trending insights
      </Typography>
      <Grid container alignItems={'center'}>
        <Grid item xs={10} sx={styles?.insightsStyles}>
          <Typography variant="body4">Insights</Typography>
        </Grid>
        <Grid item xs={2} sx={styles?.mentionsStyles}>
          <Typography variant="body4">Mentions</Typography>
        </Grid>
        {trendingInsightsData?.map((item) => (
          <Grid container alignItems={'center'} key={uuidv4()}>
            <Grid item xs={10} sx={styles?.insightsItemsStyles}>
              <Typography variant="body4">{item?.insights}</Typography>
            </Grid>
            <Grid item xs={2} sx={styles?.mentionsItemsStyles}>
              <Typography variant="body4">{item?.mentions}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
