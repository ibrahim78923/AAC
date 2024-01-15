import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider } from '@/components/ReactHookForm';
import { giftCardFormFields } from './GiftCard.data';

export const GiftCard = () => {
  const method = useForm();
  return (
    <Box>
      <Typography variant="h3" pb={2.4} textTransform="capitalize">
        Gift Card
      </Typography>
      <FormProvider methods={method}>
        <Grid container spacing={2}>
          {giftCardFormFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.heading}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </Box>
  );
};
