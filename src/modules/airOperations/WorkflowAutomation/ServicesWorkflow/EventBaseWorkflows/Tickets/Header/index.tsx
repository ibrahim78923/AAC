import { useState } from 'react';
import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import FilterWorkflow from '../../../FilterWorkflow';

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
    //     handleActionClick('clone');
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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const dropdownOptions = EventBaseWorkflowActionsDropdown();
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box mb={1}>
          <Search
            value={searchValue}
            label="search"
            setSearchBy={setSearchValue}
            onChange={(e: any) => setSearchValue(e?.target?.value)}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <SingleDropdownButton
            dropdownOptions={dropdownOptions}
            disabled={!!!selectedTicketsList?.length}
          />
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<FilterSharedIcon />}
            onClick={() => setIsDrawerOpen?.(true)}
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
