import { Box, Button } from '@mui/material';
import Search from '@/components/Search';
import { useState } from 'react';
import { PlusSharedColorIcon } from '@/assets/icons';

export const Header = (props: any) => {
  const { setIsDrawerOpen, setIsAddDrawerOpen, setSelectedSendData } = props;
  const [searchValue, SetSearchValue] = useState();
  const handelAddClick = () => {
    setIsAddDrawerOpen(true);
    setIsDrawerOpen(true);
    setSelectedSendData('');
  };
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Search
        label="Search Here"
        searchBy={searchValue}
        setSearchBy={SetSearchValue}
      />
      <Button
        variant="contained"
        startIcon={<PlusSharedColorIcon />}
        onClick={handelAddClick}
      >
        Add
      </Button>
    </Box>
  );
};
