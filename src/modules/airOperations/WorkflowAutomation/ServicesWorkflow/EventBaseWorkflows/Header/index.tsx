import { useState } from 'react';
import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';

export const EventBaseWorkflowActionsDropdown = () => [
  {
    title: 'Edit',
    //   handleClick: () => {
    //     handleActionClick('edit');
    //   },
  },
  {
    title: 'Clone',
    //   handleClick: () => {
    //     handleActionClick('edit');
    //   },
  },
  {
    title: 'Delete',
    //   handleClick: () => {
    //     handleActionClick?.('delete');
    //   },
  },
];

const Header = ({ selectedTicketsList }: any) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const dropdownOptions = EventBaseWorkflowActionsDropdown();
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Search
          value={searchValue}
          label="search"
          width="100%"
          setSearchBy={setSearchValue}
          onChange={(e: any) => setSearchValue(e?.target?.value)}
        />
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <SingleDropdownButton
            dropdownOptions={dropdownOptions}
            disabled={!!!selectedTicketsList?.length}
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
    </>
  );
};

export default Header;
