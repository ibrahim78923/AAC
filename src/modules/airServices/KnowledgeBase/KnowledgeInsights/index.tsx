import { Box, Grid, Typography } from '@mui/material';
import { styles } from './KnowledgeInsights.style';
import { trendingInsightsData } from './KnowledgeInsights.data';
import { TicketRelated } from './TicketRelated';
import { v4 as uuidv4 } from 'uuid';
import { useKnowledgeInsights } from './useKnowledgeInsights';

export const KnowledgeInsights = () => {
  const {
    getRelatedDataArray,
    ticketRelatedToggler,
    getIdHandler,
    setTicketRelatedToggler,
  } = useKnowledgeInsights();
  return (
    <>
      {ticketRelatedToggler ? (
        <Box>
          <Typography variant="h5" py={'0.625rem'}>
            Trending insights
          </Typography>
          <Grid container alignItems={'center'}>
            <Grid item md={10} xs={8} sx={styles?.insightsStyles}>
              <Typography variant="body4">Insights</Typography>
            </Grid>
            <Grid item md={2} xs={4} sx={styles?.mentionsStyles}>
              <Typography variant="body4">Mentions</Typography>
            </Grid>
            {trendingInsightsData?.map((item) => (
              <Grid container alignItems={'center'} key={uuidv4()}>
                <Grid item md={10} xs={8} sx={styles?.insightsItemsStyles}>
                  <Typography
                    variant="body4"
                    onClick={() => getIdHandler(item?.id)}
                  >
                    {item?.insights}
                  </Typography>
                </Grid>
                <Grid item md={2} xs={4} sx={styles?.mentionsItemsStyles}>
                  <Typography variant="body4">{item?.mentions}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <>
          <TicketRelated
            getRelatedDataArray={getRelatedDataArray}
            setTicketRelatedToggler={setTicketRelatedToggler}
          />
        </>
      )}
    </>
  );
};
