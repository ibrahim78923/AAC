import { Grid } from '@mui/material';
import useNewCompany from './useNewCompany';

export default function NewCompany() {
  const { formFields } = useNewCompany();

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
