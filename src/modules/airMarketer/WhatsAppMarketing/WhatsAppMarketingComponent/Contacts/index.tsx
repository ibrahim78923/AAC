import { Grid, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Contacts.data';
import useContacts from './useContacts';
import ContactsGroup from '@/modules/airSocial/Contacts/ContactsGroup';

const ContactsWhatsappMarketing = () => {
  const {
    dataGetContacts,
    allContacts,
    loadingGetContacts,
    setPageLimit,
    setPage,
    theme,
  } = useContacts();

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <ContactsGroup />
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'h4'}>All Contacts</Typography>
      </Grid>
      <Grid item xs={12}>
        <TanstackTable
          columns={columns(theme)}
          totalRecords={dataGetContacts?.data?.meta?.total}
          currentPage={dataGetContacts?.data?.meta?.page}
          pageLimit={dataGetContacts?.data?.meta?.limit}
          count={dataGetContacts?.data?.meta?.pages}
          onPageChange={(page: any) => setPage(page)}
          setPageLimit={setPageLimit}
          isLoading={loadingGetContacts}
          data={allContacts}
          setPage={setPage}
          isPagination
        />
      </Grid>
    </Grid>
  );
};

export default ContactsWhatsappMarketing;
