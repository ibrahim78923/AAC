import { Box, Button, useTheme } from '@mui/material';
import { AddCircleBlackIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { styles } from '../../Contracts.style';

export const ContractsHeader = () => {
  const theme = useTheme();
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
          sx={styles.headerAddBtn(theme)}
        >
          Create New Contract
        </Button>
      </Box>
    </>
  );
};
