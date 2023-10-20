import { DealReportImage } from '@/assets/images';
import useToggle from '@/hooks/useToggle';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import DealsReport from './DealsReport';

const Reports = () => {
  const [isToggled, toggle] = useToggle(false);
  return (
    <>
      {isToggled ? (
        <DealsReport toggle={toggle} />
      ) : (
        <>
          <Typography variant="h3" sx={{ color: '#1F2937' }}>
            Reports
          </Typography>
          <Box sx={{ paddingTop: '2rem' }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 500, color: '#1F2937', paddingBottom: '2rem' }}
            >
              Deals
            </Typography>
            <Box
              onClick={() => toggle(true)}
              sx={{
                border: '1px solid #E5E7EB',
                display: 'flex',
                flexWrap: 'wrap',
                rowGap: '5px',
                maxWidth: '360px',
                padding: '1.2rem',
                cursor: 'pointer',
              }}
            >
              <Image src={DealReportImage} alt="no image" />
              <Box sx={{ marginLeft: '1rem' }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#6B7280' }}
                >
                  Deals
                </Typography>
                <Typography
                  variant="body3"
                  sx={{ fontWeight: 500, color: '#8F98AE' }}
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
