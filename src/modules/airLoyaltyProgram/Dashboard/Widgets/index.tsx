import { useTheme } from '@emotion/react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';

export const Widgets = (props: any) => {
  const { widgetsDataArray } = props;

  const theme: any = useTheme();
  const [isHoveredId, setIsHoveredId] = useState(null);

  return (
    <Box>
      <Grid container spacing={3}>
        {widgetsDataArray?.map((widget: any) => (
          <Grid item xs={12} md={6} lg={3} key={widget?._id}>
            <Box
              border={1}
              borderColor={'custom.pale_gray'}
              borderRadius={3}
              bgcolor={'common.white'}
              p={2}
              display={'flex'}
              alignItems={'center'}
              gap={1}
              onMouseEnter={() => setIsHoveredId(widget?._id)}
              onMouseLeave={() => setIsHoveredId(null)}
              sx={{
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: `0px 0px 0px 3px ${theme?.palette?.custom?.aqua_breeze}`,
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme?.palette?.grey?.[400],
                  width: 42,
                  height: 42,
                }}
              >
                <widget.avatar
                  fill={
                    widget?._id === isHoveredId
                      ? theme?.palette?.primary?.main
                      : undefined
                  }
                />
              </Avatar>

              <Box>
                <Typography
                  variant={'body3'}
                  color={'grey.900'}
                  fontWeight={600}
                >
                  {widget?.title}
                </Typography>
                <Typography
                  variant={'subtitle1'}
                  component={'p'}
                  color={'grey.600'}
                >
                  {widget?.count}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
