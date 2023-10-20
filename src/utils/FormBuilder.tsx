import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const FormBuilder = ({ formFields = [] }: any) =>
  formFields?.map((form: any) => (
    <Grid item xs={12} md={form?.gridLength} key={uuidv4()}>
      <form.component {...form.componentProps} size="small">
        {form?.componentProps?.select
          ? form.componentProps.options.map((option: any) => (
              <option key={uuidv4()} value={option?.value}>
                {option?.label}
              </option>
            ))
          : form?.heading
          ? form?.heading
          : null}
      </form.component>
    </Grid>
  ));

export default FormBuilder;
