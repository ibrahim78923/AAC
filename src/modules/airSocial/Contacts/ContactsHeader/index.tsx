import { Typography, Box, Button } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import useContactsHeader from './useContactsHeader';
import CreateContacts from '../CreateContacts';
import { styles } from './ContractsHeader.style';
import { ImportIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS } from '@/constants/permission-keys';
import useContactsSaleSite from '../useContactsSaleSite';
import ImportContactDrawer from '../ImportContactDrawer';

const ContactsHeader = () => {
  const { isCreateDeal, handleCreateDealOpen } = useContactsHeader();
  const { isImportDrawer, setIsImportDrawer } = useContactsSaleSite();

  return (
    <Box sx={styles?.HeaderStyle}>
      <Box display="flex" alignItems={'center'} gap={'10px'}>
        <Typography variant="h4" sx={styles?.HeaderTypography}>
          Contacts
        </Typography>
      </Box>
      <Box sx={styles?.HeaderChildStyle}>
        <PermissionsGuard
          permissions={[SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.IMPORT_CONTACT]}
        >
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => setIsImportDrawer(true)}
            startIcon={<ImportIcon />}
            sx={{ height: '35px' }}
          >
            Import
          </Button>
        </PermissionsGuard>

        <Box>
          <PermissionsGuard
            permissions={[
              SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.CREATE_CONTACT,
            ]}
          >
            <Button
              variant="contained"
              onClick={handleCreateDealOpen}
              startIcon={<AddCircle />}
              sx={{ height: '35px' }}
            >
              Create Contact
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>

      <CreateContacts open={isCreateDeal} onClose={handleCreateDealOpen} />
      {isImportDrawer && (
        <ImportContactDrawer
          open={isImportDrawer}
          setIsImportDrawer={setIsImportDrawer}
        />
      )}
    </Box>
  );
};

export default ContactsHeader;
