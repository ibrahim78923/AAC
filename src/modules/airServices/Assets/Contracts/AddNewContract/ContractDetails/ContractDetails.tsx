import { FormProvider } from '@/components/ReactHookForm';
import { Grid, Typography } from '@mui/material';
import { dataArray } from './DetailForm';
import { uuid } from 'uuidv4';

const ContractDetails = ({ handleSubmitForm, methods, handleSubmit }: any) => {
  return (
    <div>
      <Grid
        container
        justifyContent={'center'}
        display={'flex'}
        alignItems={'center'}
        flexDirection={'row'}
      >
        <Grid item xs={12} sx={{ mb: '2rem' }}>
          <Typography variant="h5">General Details</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <Grid container spacing={4}>
              {dataArray.slice(0, dataArray?.length - 1)?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuid()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : item?.heading}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContractDetails;
