import { Box, Button, Grid, Typography } from '@mui/material';

import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import ContactsEditorDrawer from './ContactsEditorDrawer';
import TanstackTable from '@/components/Table/TanstackTable';

import useContacts from './useContacts';

import { columns } from './Contacts.data';

import { PlusIcon } from '@/assets/icons';

import { styles } from '../Associations.style';

const Contacts = ({ contactsData }: any) => {
  const {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    searchName,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    contactRecord,
    setContactRecord,
    deleteContactHandler,
  } = useContacts();

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 0px 0px 0px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={4} xs={12} sx={styles?.countBox}>
          <Typography sx={styles?.associationCount(theme)} variant="body3">
            02
          </Typography>

          <Typography variant="subtitle2">Contacts</Typography>
        </Grid>
        <Grid item md={8} xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Search
              searchBy={searchName}
              setSearchBy={setSearchName}
              label="Search By Name"
              size="small"
            />
            <Button
              variant="contained"
              className="small"
              sx={{ minWidth: '0px', gap: 0.5 }}
              onClick={() => setOpenDrawer('Add')}
            >
              <PlusIcon /> Add Contacts
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({
              setOpenDrawer,
              setIsOpenAlert,
              setContactRecord,
            })}
            data={contactsData}
          />
        </Grid>
      </Grid>
      {openDrawer && (
        <ContactsEditorDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          contactRecord={contactRecord}
        />
      )}
      <AlertModals
        message={"You're about to remove a record. Are you Sure?"}
        type={'delete'}
        open={isOpenAlert}
        handleClose={handleCloseAlert}
        handleSubmitBtn={deleteContactHandler}
      />
    </Box>
  );
};

export default Contacts;
