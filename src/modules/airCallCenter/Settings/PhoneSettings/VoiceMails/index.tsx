import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button, Typography } from '@mui/material';
import AddNewMessage from './AddNewMessage';
import { voiceMailColumns, voiceMailTableData } from './VoiceMail.data';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useVoiceMail } from './useVoiceMail';

const VoiceMails = () => {
  const { search, setSearch, isDrawerOpen, setIsDrawerOpen } = useVoiceMail();
  return (
    <>
      <Box
        sx={{
          borderRadius: 2,
          border: `.1rem solid`,
          borderColor: 'grey.700',
        }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          m={2}
        >
          <Typography variant="h3" color="slateBlue.main">
            Voice Mails
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
              new voicemail drop
            </Button>
          </Box>
          <TanstackTable
            data={voiceMailTableData}
            columns={voiceMailColumns}
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

export default VoiceMails;
