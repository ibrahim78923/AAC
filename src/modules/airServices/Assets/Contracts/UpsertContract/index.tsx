import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertContract } from './useUpsertContract';
import { Button, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export const UpsertContract = () => {
  const {
    methods,
    handleSubmit,
    submitUpsertContractForm,
    upsertContractFormFieldsData,
  } = useUpsertContract();
  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitUpsertContractForm)}
      >
        <Grid container spacing={4}>
          {upsertContractFormFieldsData?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.componentProps?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : item?.heading
                  ? item?.heading
                  : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </FormProvider>
    </>
  );
};
