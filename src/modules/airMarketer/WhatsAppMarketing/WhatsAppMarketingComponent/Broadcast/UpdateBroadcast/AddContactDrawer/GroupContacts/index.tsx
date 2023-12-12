import { Box, useTheme } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';

import { groupsColumns, groupsData } from './GroupsContacts.data';

const GroupContacts = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
        borderRadius: '8px',
        p: 1,
      }}
    >
      <TanstackTable columns={groupsColumns} data={groupsData} />
    </Box>
  );
};

export default GroupContacts;
