import { useRouter } from 'next/router';

import { Typography, Box, Button } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import { SUPER_ADMIN } from '@/constants';

import useContactsHeader from './useContactsHeader';
import CreateContacts from '../CreateContacts';

import { ImportIcon } from '@/assets/icons';

import { styles } from './ContractsHeader.style';

const ContactsHeader = () => {
  const route = useRouter();
  const { isCreateDeal, handleCreateDealOpen } = useContactsHeader();

  return (
    <Box sx={styles.HeaderStyle}>
      <Box display="flex" alignItems={'center'} gap={'10px'}>
        <Typography variant="h4" sx={styles.HeaderTypography}>
          Contacts
        </Typography>
      </Box>
      <Box sx={styles.HeaderChildStyle}>
        <Button
          variant="outlined"
          onClick={() => route.push(SUPER_ADMIN.CONTACT_IMPORT)}
          startIcon={<ImportIcon />}
          sx={{ height: '35px' }}
        >
          Import
        </Button>
        <Box>
          <Button
            variant="contained"
            onClick={handleCreateDealOpen}
            startIcon={<AddCircle />}
            sx={{ height: '35px' }}
          >
            Create Contact
          </Button>
        </Box>
      </Box>
      <CreateContacts open={isCreateDeal} onClose={handleCreateDealOpen} />
    </Box>
  );
};

export default ContactsHeader;
