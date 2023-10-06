import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { existingProductsFields } from './AddProduct.data';
import { v4 as uuidv4 } from 'uuid';

const ExistingProducts = (props: any) => {
  const { methods } = props;

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={4}>
        {existingProductsFields?.map((item: any) => (
          <Grid item xs={12} md={item?.md} key={uuidv4()}>
            <label>Seach</label>
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
