import { Box, Button } from '@mui/material';
import { AddCircleBlackIcon } from '@/assets/icons';
import Search from '@/components/Search';

export const ContractsHeader = () => {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Search label="Search" searchBy="" setSearchBy="" />
        <Button
          startIcon={<AddCircleBlackIcon />}
          color="secondary"
          size="large"
        >
          Create New Contract
        </Button>
      </Box>
    </>
  );
};
