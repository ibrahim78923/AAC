import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { pipelineCards } from '@/modules/airSales/Reports/PipelineForecastReports/PipelineForecastReorts.data';
import useCategoryForcastReports from '@/modules/airSales/Reports/CategoryForecastReports/useCategoryForcastReports';
import { styles } from './CategoryCards.style';

const PipeLineCards = (props: any) => {
  const { activeCard, setActiveCard } = props;
  const { theme } = useCategoryForcastReports();
  return (
    <Grid container spacing={2}>
      {pipelineCards?.map((item: any) => (
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
          xs={12}
          key={item?.key}
          sx={styles?.pipelineCards}
          onClick={() => setActiveCard(item?.key)}
        >
          <Box className={`${activeCard === item?.key && 'active'} cards`}>
            <Typography
              variant="h6"
              sx={{ color: `${theme?.palette?.slateBlue.main}` }}
            >
              {item?.title}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PipeLineCards;
