import { Box, Button } from '@mui/material';
import { AddCircleBlackIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import { CONTRACT_TYPES } from '@/constants/strings';

export const ContractsHeader = () => {
  const router = useRouter();
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
          onClick={() =>
            router?.push({
              pathname: AIR_SERVICES?.UPSERT_CONTRACT,
              query: {
                ...router?.query,
                contractType: CONTRACT_TYPES?.SOFTWARE_LICENSE,
              },
            })
          }
        >
          Create New Contract
        </Button>
      </Box>
    </>
  );
};
