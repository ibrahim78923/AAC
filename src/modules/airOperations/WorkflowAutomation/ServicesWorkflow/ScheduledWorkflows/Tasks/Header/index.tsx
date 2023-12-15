import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import { useHeader } from './useHeader';
import FilterWorkflow from '../../../FilterWorkflow';

const Header = ({ selectedTasksList }: any) => {
  const {
    searchValue,
    setSearchValue,
    dropdownOptions,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useHeader();
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box mb={1}>
          <Search
            value={searchValue}
            label="Search Here"
            setSearchBy={setSearchValue}
            onChange={(e: any) => setSearchValue(e?.target?.value)}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <SingleDropdownButton
            dropdownOptions={dropdownOptions}
            disabled={!!!selectedTasksList?.length}
          />
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<FilterSharedIcon />}
          >
            Filter
          </Button>
          <Button variant="contained">Create Event base workflows</Button>
        </Box>
      </Box>
      <FilterWorkflow
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};

export default Header;
