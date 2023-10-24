import { Box, Card, Stack, Typography } from '@mui/material';
import { cardsData } from './Reports.data';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

const Reports = () => {
  return (
    <Box>
      <Typography variant="h4">Reports</Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={3} mt={5}>
        {cardsData?.map((item: any) => (
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
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#AFEAE1',
                    }}
                  >
                    {item?.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5">{item?.title}</Typography>
                    <Typography>{item?.description}</Typography>
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
