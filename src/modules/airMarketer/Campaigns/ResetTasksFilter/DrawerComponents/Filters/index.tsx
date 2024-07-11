import { FormProvider } from '@/components/ReactHookForm';
import { dataArray } from '../../ResetTaskFilter.data';
import { Grid } from '@mui/material';

const Filters = ({ methods }: any) => {
  return (
    <FormProvider methods={methods}>
      <Grid container spacing={2}>
        {dataArray()?.map((item: any) => (
          <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
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
    </FormProvider>
  );
};

export default Filters;
