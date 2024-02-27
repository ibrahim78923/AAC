import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { propertiesArray } from './Properties.data';
import { v4 as uuidv4 } from 'uuid';
import useEditPhoneNumber from '../useEditPhoneNumber';

const Properties = () => {
  const { methods } = useEditPhoneNumber();

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={1}>
        {propertiesArray?.map((item: any) => (
          <Grid item xs={12} md={item?.md} key={uuidv4()}>
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

export default Properties;
