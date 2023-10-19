import Search from '@/components/Search';
import { Box, Paper, Typography } from '@mui/material';
import useUserReports from './useUserReports';

const UsersReports = () => {
  const { searchBy, setSearchBy }: any = useUserReports;

  return (
    <Box>
      <Typography variant="h3">User Reports</Typography>
      <Paper>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Users</Typography>
          <Search
            label="Search Here"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            width={240}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default UsersReports;
