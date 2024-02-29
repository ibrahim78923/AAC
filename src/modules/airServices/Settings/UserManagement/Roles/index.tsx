import { Box, Typography } from '@mui/material';
import RolesCards from './RolesCards';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Search from '@/components/Search';
// import { useState } from 'react';

export const Roles = () => {
  const router: any = useRouter();
  // const [searchValue, setSearchValue] = useState<any>('');

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={2}
        justifyContent={'space-between'}
        mb={2}
      >
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <ArrowBackIcon
            onClick={() =>
              router?.push({ pathname: AIR_SERVICES?.USER_MANAGEMENT })
            }
            sx={{ cursor: 'pointer' }}
          />
          <Typography variant="h3">Roles</Typography>
        </Box>

        <Search
          label="Search Here"
          width={'16.25rem'}
          // setSearchBy={setSearchValue}
        />
      </Box>

      <RolesCards />
    </>
  );
};
