import React from 'react';

import { Typography, Box, Button } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import ImportContactsDrawer from '../ImportContactsDrawer';

import useContactsHeader from './useContactsHeader';

import { ImportIcon } from '@/assets/icons';

import { styles } from './ContractsHeader.style';
import CreateContacts from '../CreateContacts';

const ContactsHeader = () => {
  const {
    isImportDeal,
    isCreateDeal,
    handleCreateDealOpen,
    handleImportDealOpen,
  } = useContactsHeader();

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
          onClick={handleImportDealOpen}
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
            Create Deal
          </Button>
        </Box>
      </Box>
      <ImportContactsDrawer
        open={isImportDeal}
        onClose={handleImportDealOpen}
      />
      <CreateContacts open={isCreateDeal} onClose={handleCreateDealOpen} />
      {/* <ViewAllDeals open={IsViewAll} onClose={handleViewAll} /> */}
    </Box>
  );
};

export default ContactsHeader;
