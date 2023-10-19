import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
const FormBuilder = ({ formFields = [] }: any) => {
  return formFields?.map((item: any) => (
    <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
  ));
};

export default FormBuilder;
