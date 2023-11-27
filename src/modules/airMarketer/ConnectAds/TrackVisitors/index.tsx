import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  TrackVisitorsData,
  customDefaultValues,
  customValidationSchema,
} from './TrackVisitors.data';
import { v4 as uuidv4 } from 'uuid';

const TrackVisitors = () => {
  const methods: any = useForm({
    resolver: yupResolver(customValidationSchema),
    defaultValues: customDefaultValues,
  });
  return (
    <Box sx={{ height: '82vh' }}>
      <Typography variant="h3">Track visitors to your website</Typography>
      <Typography sx={{ mt: 2, fontWeight: 300 }} variant="body2">
        Add a pixel to your website to track your visitors and then re-engage
        them with relevant <br /> ads, wherever they are online. Your pixel will
        be added to your website automatically using <br /> your HubSpot
        tracking code.
      </Typography>
      <FormProvider methods={methods}>
        <Grid container spacing={4} mt={0}>
          {TrackVisitorsData?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component size={'small'} {...item?.componentProps}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
              {item?.componentProps?.heading && (
                <Typography variant="h5">
                  {item?.componentProps?.heading}
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </Box>
  );
};

export default TrackVisitors;
