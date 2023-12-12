import { Box, Button, Grid, Typography } from '@mui/material';

import useUpsertService from './useUpsertService';
import { upsertServiceData } from './UpsertService.data';
import { FormProvider } from '@/components/ReactHookForm';

export const UpsertService = () => {
  const { methods, results, handleSubmit, onSubmit } = useUpsertService();

  return (
    <>
      <Box display={'flex'}>
        <Typography variant="h4">General Details</Typography>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} mt={2}>
          {upsertServiceData?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              {item?.componentProps?.heading && (
                <Typography mt={4}>{item?.componentProps?.heading}</Typography>
              )}
              <item.component {...item?.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} mt={1}>
          {results?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={4} mt={2}>
          <Box
            display={'flex'}
            alignItems={'end'}
            justifyContent={'end'}
            flexDirection={'row'}
            bottom={'1rem'}
            right={'2rem'}
            marginLeft={'auto'}
          >
            <Button>cancel</Button>

            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </Grid>
      </FormProvider>
    </>
  );
};
