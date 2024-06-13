import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button, Typography } from '@mui/material';
import {
  meetingAndGreetingListColumns,
  meetingAndGreetingListTableData,
} from './MeetingAndGreetingList.data';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMeetingAndGreetingList } from './useMeetingAndGreetingList';
import AddNewMessage from './AddNewMessage';

export const MeetingAndGreetingList = () => {
  const { theme, search, setSearch, isDrawerOpen, setIsDrawerOpen } =
    useMeetingAndGreetingList();
  return (
    <>
      <Box
        sx={{
          border: `.1rem solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
        }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          m={2}
        >
          <Typography variant="h3" color="slateBlue.main">
            Message & Greeting List
          </Typography>
        </Box>
        <Box>
          <Box
            m={1}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            gap={1}
          >
            <Search
              label="Search Here"
              width={'16.25rem'}
              setSearchBy={setSearch}
              searchBy={search}
            />
            <Button
              variant="contained"
              color="primary"
              disableElevation
              startIcon={<AddCircleIcon />}
              onClick={() => setIsDrawerOpen(true)}
              sx={{ width: { sm: 'auto', xs: '100%' } }}
            >
              new message
            </Button>
          </Box>
          <TanstackTable
            data={meetingAndGreetingListTableData}
            columns={meetingAndGreetingListColumns}
            isPagination
          />
        </Box>
      </Box>
      <AddNewMessage
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};
