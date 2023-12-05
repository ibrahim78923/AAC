import Link from 'next/link';

import { Box, Card, Stack, Typography, useTheme } from '@mui/material';

import { ReportsCardsData } from './Reports.data';
import useReports from './useReports';

import { v4 as uuidv4 } from 'uuid';

const Reports = () => {
  const theme: any = useTheme();
  const { bgColor, descriptionColor } = useReports();

  return (
    <Box>
      <Typography variant="h4">Reports</Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={3} mt={5}>
        {ReportsCardsData?.map((item: any) => (
          <Box
            key={uuidv4()}
            sx={{ width: { xs: '100%', xl: '30%', xxl: '25%' } }}
          >
            <Link href={item?.link}>
              <Card
                variant="outlined"
                sx={{
                  p: 2,
                  '&:hover': { boxShadow: '1px 1px 3px grey' },
                }}
              >
                <Stack direction="row" gap={2} alignItems="center">
                  <Box
                    sx={{
                      padding: '20px 12px',
                      borderRadius: '10px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: bgColor,
                      opacity: '.8',
                    }}
                  >
                    {item?.icon}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: theme?.palette?.custom['main'],
                      }}
                    >
                      {item?.title}
                    </Typography>
                    <Typography
                      variant="body4"
                      sx={{ color: descriptionColor }}
                    >
                      {item?.description}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Reports;
