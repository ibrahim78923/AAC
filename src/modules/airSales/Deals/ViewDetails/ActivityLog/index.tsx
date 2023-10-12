import React from 'react';

import Image from 'next/image';

import { Box, Grid, Typography } from '@mui/material';

import { ActivityLogList } from '@/mock/modules/Deals';

import { ActivityLogImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';
import useNameWithStyledWords from '@/hooks/useNameStyledWords';
import { styles } from '../ViewDetails.style';

const ActivityLog = () => {
  const { NameWithStyledWords, theme } = useNameWithStyledWords();

  return (
    <Box sx={styles.horizontalTabsBox}>
      <Typography variant="h4">Activity Log </Typography>
      <Box sx={styles.horizontalTabsInnnerBox}>
        <Grid container>
          {ActivityLogList.map((item, index) => (
            <Grid item xs={12} key={uuidv4()}>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Box>
                  <Image
                    src={ActivityLogImage}
                    alt="activity-log"
                    width={50}
                    height={50}
                  />
                </Box>
                <Box sx={{ width: '50vw' }}>
                  <NameWithStyledWords
                    name={item.name}
                    customKey="ActivityHead"
                  />
                  <Typography
                    variant="body3"
                    sx={{ color: theme.palette.custom.main }}
                  >
                    {item.message}
                  </Typography>
                  {item.activityList && (
                    <Box>
                      {item.activityList.map((option) => (
                        <Box key={uuidv4()}>
                          <NameWithStyledWords
                            name={option}
                            customKey="Activitylist"
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>

              {index !== ActivityLogList.length - 1 && (
                <Box
                  sx={{
                    width: '1px',
                    backgroundColor: theme.palette.grey[700],
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
