import Image from 'next/image';

import { Box, Grid, Typography } from '@mui/material';

import useNameWithStyledWords from '@/hooks/useNameStyledWords';

import { ActivitiesLog } from '@/mock/modules/airSales/Contacts/ContactViewDetails';

import { styles } from '../ViewDetails.style';

import { v4 as uuidv4 } from 'uuid';

const ActivityLog = () => {
  const { theme } = useNameWithStyledWords();

  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Typography variant="h4">Activities</Typography>
      <Box sx={styles?.horizontalTabsInnnerBox}>
        <Grid container>
          {ActivitiesLog?.map((item: any, index) => (
            <Grid item xs={12} key={uuidv4()}>
              <Typography mb={3}>{item?.heading}</Typography>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <>
                  {item?.subActivities?.map((data: any) => (
                    <Box
                      key={uuidv4()}
                      sx={{
                        display: 'flex',
                        gap: '15px',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: '15px' }}>
                        <Box>
                          <Image src={data?.img} alt="image" />
                        </Box>
                        <Box>
                          <Typography
                            sx={{ color: '#1F2937' }}
                            variant="formTopHeading"
                          >
                            {data?.title}
                            <span style={{ color: '#5ED4C3' }}>
                              {data?.name}
                            </span>
                          </Typography>
                          <Typography
                            fontWeight={400}
                            fontSize="12px"
                            sx={{ color: '#6B7280' }}
                          >
                            {data?.message}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            background: '#ECFDF3',
                            color: '#47B263',
                            p: '4px 10px',
                            borderRadius: '10px',
                          }}
                        >
                          <li>{data?.date}</li>
                        </Box>
                        <Box>
                          <Typography
                            fontWeight={400}
                            fontSize="12px"
                            sx={{ mt: '10px', color: '#6B7280' }}
                          >
                            {data?.dateTime}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </>
                <Box sx={{ width: '50vw' }}>
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.custom?.main }}
                  >
                    {item?.message}
                  </Typography>
                </Box>
              </Box>

              {index !== ActivitiesLog?.length - 1 && (
                <Box
                  sx={{
                    width: '1px',
                    backgroundColor: theme?.palette?.grey[700],
                    mx: 2.5,
                    height: '40px',
                    my: 1,
                  }}
                ></Box>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ActivityLog;
