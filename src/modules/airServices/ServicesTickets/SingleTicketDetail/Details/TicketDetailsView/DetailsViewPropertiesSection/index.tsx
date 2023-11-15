import { FormProvider } from '@/components/ReactHookForm';
import { Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { dataArray } from './DetailsViewPropertiesSection.data';
import { useDetailsViewPropertiesSection } from './useDetailsViewPropertiesSection';

const DetailsViewPropertiesSection = () => {
  const { methods, handleSubmit, onSubmit } = useDetailsViewPropertiesSection();
  return (
    <>
      <Grid
        container
        justifyContent={'center'}
        display={'flex'}
        alignItems={'center'}
        flexDirection={'row'}
      >
        <Grid item xs={12} sx={{ mb: '2rem' }}>
          <Typography variant="h5">Properties</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              {dataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
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
    </>
  );
};

export default DetailsViewPropertiesSection;
