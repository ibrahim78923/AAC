import { getFormFields } from './NewContact.data';
import { Grid } from '@mui/material';
import { useLazyGetOrganizationUsersQuery } from '@/services/dropdowns';
import useAuth from '@/hooks/useAuth';

export default function NewContact() {
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;

  const contactOwner = useLazyGetOrganizationUsersQuery();

  const formFields = getFormFields({ orgId, contactOwner });

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
