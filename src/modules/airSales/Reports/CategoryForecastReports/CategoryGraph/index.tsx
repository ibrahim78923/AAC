import dynamic from 'next/dynamic';
import { Box, Grid, Theme, Typography, useTheme } from '@mui/material';
import useCategoryGraph from './useCategoryGraph';
import useCategoryForcastReports from '@/modules/airSales/Reports/CategoryForecastReports/useCategoryForcastReports';

const CardAndGraphs = ({ activeCard, pipelineForecastData }: any) => {
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });
  const theme = useTheme<Theme>();
  const { cardTitle, cardWiseOptions, cardWiseSeries } = useCategoryGraph();
  const { activeCardObj } = useCategoryForcastReports();
  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
        <Grid item xs={12}>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.custom.off_white_three}`,
              padding: '2rem',
              borderRadius: '8px',
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
              >
                {cardTitle(activeCard)}
              </Typography>
            </Box>
            <ReactApexChart
              options={cardWiseOptions(activeCard, pipelineForecastData)}
              series={cardWiseSeries(activeCard, pipelineForecastData)}
              type="bar"
              height={600}
            />
            <Box display="flex" justifyContent="center">
              {activeCard === activeCardObj?.TOTAL ? (
                <Typography
                  variant="body4"
                  fontWeight={600}
                  sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
                >
                  Manual forecast amount
                </Typography>
              ) : (
                <Typography
                  variant="body4"
                  fontWeight={600}
                  sx={{ color: `${theme?.palette?.custom?.main}` }}
                >
                  Close date
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CardAndGraphs;
