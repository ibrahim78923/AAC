import { Box, IconButton, Typography } from '@mui/material';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Header from './Header';
import { useSupervisorRules } from './useSupervisorRules';
import { supervisorListData } from './SupervisorRules.data';
import TanstackTable from '@/components/Table/TanstackTable';

const SupervisorRules = () => {
  const { supervisorListsColumns, selectedSupervisorList, theme } =
    useSupervisorRules();
  return (
    <>
      <Box
        border={`1px solid ${theme?.palette?.grey?.[700]}`}
        borderRadius={'0.375rem'}
      >
        <Box
          height={48}
          display={'flex'}
          alignItems={'center'}
          sx={{
            backgroundColor: theme?.palette?.grey?.[700],
            borderRadius: '0.375rem 0.375rem 0 0',
          }}
          mb={1}
        >
          <IconButton>
            <LiveHelpIcon />
          </IconButton>
          <Typography variant="body2">
            For Each tickets updated within{' '}
            <b style={{ fontWeight: '600' }}>30 days</b>, Execute all matching
            rules.
          </Typography>
        </Box>
        <Box px={2}>
          <Header selectedSupervisorList={selectedSupervisorList} />
        </Box>
        <TanstackTable
          data={supervisorListData}
          columns={supervisorListsColumns}
          isPagination
        />
      </Box>
    </>
  );
};

export default SupervisorRules;
