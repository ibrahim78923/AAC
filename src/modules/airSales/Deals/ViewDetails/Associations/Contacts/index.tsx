import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import ContactsEditorDrawer from './ContactsEditorDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import useContacts from './useContacts';
import { columns } from './Contacts.data';
import { PlusIcon } from '@/assets/icons';
import { styles } from '../Associations.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { ContactsProps } from '../Associations-interface';

const Contacts = ({
  contactsData,
  dealId,
  isLoading,
  handleSearch,
}: ContactsProps) => {
  const {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    contactRecord,
    setContactRecord,
    deleteContactHandler,
    contactLoading,
  } = useContacts(dealId);

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
          {isLoading ? (
            <Skeleton variant="text" height={40} width={120} />
          ) : (
            <>
              <Typography sx={styles?.associationCount(theme)} variant="body3">
                {contactsData?.length < 10
                  ? `0${contactsData?.length}`
                  : contactsData?.length}
              </Typography>
              <Typography variant="h5">Contacts</Typography>
            </>
          )}
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
            <Search setSearchBy={handleSearch} placeholder="Search By Name" />
            <PermissionsGuard
              permissions={[
                AIR_SALES_DEALS_PERMISSIONS?.DEAL_ADD_ASSOCIATE_CONTACT,
              ]}
            >
              <Button
                variant="contained"
                className="medium"
                sx={{ minWidth: '0px', gap: 0.5 }}
                onClick={() => setOpenDrawer({ isToggle: true, type: 'Add' })}
                startIcon={<PlusIcon />}
              >
                Add Contacts
              </Button>
            </PermissionsGuard>
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
      {openDrawer?.isToggle && (
        <ContactsEditorDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          contactRecord={contactRecord}
          dealId={dealId}
        />
      )}
      {isOpenAlert && (
        <AlertModals
          message={"You're about to remove a record. Are you Sure?"}
          type={'delete'}
          open={isOpenAlert}
          handleClose={handleCloseAlert}
          handleSubmitBtn={deleteContactHandler}
          loading={contactLoading}
        />
      )}
    </Box>
  );
};

export default Contacts;
