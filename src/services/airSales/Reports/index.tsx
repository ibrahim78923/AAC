import React from 'react';

import Image from 'next/image';

import { Box, Theme, Typography, useTheme } from '@mui/material';

import { DealReportImage } from '@/assets/images';

import useToggle from '@/hooks/useToggle';

import DealsReport from './DealsReport';

import { styles } from './Reports.style';

const Reports = () => {
  const [isToggled, toggle] = useToggle(false);

  const theme = useTheme<Theme>();

  return (
    <>
      {isToggled ? (
        <DealsReport toggle={toggle} />
      ) : (
        <>
          <Typography
            variant="h3"
            sx={{ color: `${theme?.palette?.grey[800]}` }}
          >
            Reports
          </Typography>
          <Box sx={{ paddingTop: '2rem' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                color: `${theme?.palette?.grey[800]}`,
                paddingBottom: '2rem',
              }}
            >
              Deals
            </Typography>
            <Box onClick={() => toggle(true)} sx={styles?.mainDealBox(theme)}>
              <Image src={DealReportImage} alt="no image" />
              <Box sx={{ marginLeft: '1rem' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: `${theme?.palette?.custom?.grayish_blue}`,
                  }}
                >
                  Deals
                </Typography>
                <Typography
                  variant="body3"
                  sx={{
                    fontWeight: 500,
                    color: `${theme?.palette?.custom?.grayish_blue}`,
                  }}
                >
                  Overview Deals Report
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Reports;
