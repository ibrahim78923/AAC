import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import useEnquiriesCards from './useEnquiriesCards';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { style } from './EnquiriesCard.style';

const EnquiriesCard = ({ details, isLoading }: any) => {
  const { series, options, theme } = useEnquiriesCards(details);
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <Box sx={style?.mainBox(theme)}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: `${theme?.palette?.grey[800]}`,
                fontWeight: 600,
                textAlign: 'start',
              }}
            >
              Enquires
            </Typography>
          </Box>
          <Box sx={style?.chartBox}>
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={250}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default EnquiriesCard;
