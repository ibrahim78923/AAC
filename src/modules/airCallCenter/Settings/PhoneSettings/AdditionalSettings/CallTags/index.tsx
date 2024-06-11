import { AntSwitch } from '@/components/AntSwitch';
import { Box, Button, Typography } from '@mui/material';
import { useCallTags } from './useCallTags';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import AddCallTags from './AddCallTags';
import { callTagsColumns, callTagsTableData } from './CallTags.data';

const CallTags = () => {
  const {
    isChecked,
    handleCheckboxChange,
    search,
    setSearch,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useCallTags();
  return (
    <>
      <Box>
        <Box
          border="0.1rem solid"
          borderColor="grey.700"
          borderRadius={2}
          p={2}
        >
          <Box
            display="flex"
            gap={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h5" color="slateBlue.main">
                Mandatory call tags
              </Typography>
              <Typography variant="body4" color="custom.main">
                Make tags mandatory to ensure your team is always tagging a call
                before ending it.
              </Typography>
            </Box>
            <Box>
              <AntSwitch
                checked={isChecked}
                isLoading={false}
                onChange={handleCheckboxChange}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: 2,
            border: `.1rem solid`,
            borderColor: 'grey.700',
          }}
          mt={2}
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
                onClick={() => setIsDrawerOpen(true)}
                sx={{ width: { sm: 'auto', xs: '100%' } }}
              >
                Add Call Tag
              </Button>
            </Box>
            <TanstackTable
              data={callTagsTableData}
              columns={callTagsColumns}
              isPagination
            />
          </Box>
        </Box>
      </Box>
      <AddCallTags
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};

export default CallTags;
