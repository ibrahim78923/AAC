import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import { dashboardWidgetsCards } from './Widget.data';
import { useState } from 'react';

export const Widget = () => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState('');
  return (
    <>
      <Grid container spacing={3}>
        {dashboardWidgetsCards?.map((item: any) => (
          <Grid
            key={item?.id}
            item
            md={6}
            lg={3}
            xs={12}
            sx={{ cursor: 'pointer' }}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              flexWrap={'wrap'}
              borderRadius={3}
              gap={1}
              padding={2}
              height={'100%'}
              onMouseEnter={() => setIsHovered(item?.id)}
              onMouseLeave={() => setIsHovered('')}
              sx={{
                backgroundColor: theme?.palette?.common?.white,
                cursor: 'pointer',
                border: `1px solid ${theme?.palette?.custom?.pale_gray}`,
                '&:hover': {
                  backgroundColor:
                    theme?.palette?.custom?.light_green_background,
                  boxShadow: `0px 0px 0px 3px ${theme?.palette?.custom?.aqua_breeze}`,
                  border: `1px solid ${theme?.palette?.primary?.main}`,
                  '& > .MuiAvatar-root': {
                    backgroundColor: theme?.palette?.primary?.light,
                  },
                },
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: theme?.palette?.grey?.[400],
                }}
              >
                <item.avatar
                  fill={
                    item?.id === isHovered
                      ? theme?.palette?.primary?.main
                      : theme?.palette?.blue?.main
                  }
                />
              </Avatar>
              <Box>
                <Typography variant="body3" color="grey.900" fontWeight={600}>
                  {item?.type}
                </Typography>
                <Typography variant="subtitle1" color="slateBlue.main">
                  {item?.point}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
