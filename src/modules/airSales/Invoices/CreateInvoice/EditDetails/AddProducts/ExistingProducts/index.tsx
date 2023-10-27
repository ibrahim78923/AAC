import { Grid, Typography } from '@mui/material';
import { customFields } from './ExistingProducts.data';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';

const ExistingProducts = (props: any) => {
  const { methods } = props;

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={4}>
        {customFields?.map((item: any) => (
          <Grid item xs={12} md={item?.md} key={uuidv4()}>
            <Typography variant="body2" fontWeight={500}>
              {item.title}
            </Typography>
            <item.component {...item.componentProps} size={'small'}>
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

export default ExistingProducts;
