import { Box, useTheme } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';

import { allContactsColumns, allContactsData } from './AllContacts.data';

const AllContacts = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
        borderRadius: '8px',
        p: 1,
      }}
    >
      <TanstackTable columns={allContactsColumns} data={allContactsData} />
    </Box>
  );
};

export default AllContacts;
