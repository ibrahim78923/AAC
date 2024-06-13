import { Grid } from '@mui/material';
import useNewContact from './useNewContact';

export default function NewContact() {
  const { formFields } = useNewContact();

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
