import { Grid } from '@mui/material';
import { formFields } from './NewCompany.data';

export default function NewCompany() {
  return (
    <Grid container spacing={2}>
      {formFields?.map((item: any) => (
        <Grid item xs={12} key={item?.id}>
          <item.component {...item?.componentProps} size={'small'} />
        </Grid>
      ))}
    </Grid>
  );
}
