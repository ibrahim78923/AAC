import Search from '@/components/Search';
import { Box, Typography } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { useRoles } from '../useRoles';

export const RolesHeader = () => {
  const router = useRouter();

  const { setSearchValue } = useRoles();
  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} gap={2}>
        <Box sx={{ cursor: 'pointer' }}>
          <ArrowBackIcon
            onClick={() =>
              router?.push({ pathname: AIR_SERVICES?.USER_MANAGEMENT })
            }
          />
        </Box>
        <Box display={'flex'} justifyContent={'space-between'} width="100%">
          <Box>
            <Typography variant="h3">Roles</Typography>
          </Box>
          <Box>
            <Search
              label="Search Here"
              width={'16.25rem'}
              setSearchBy={setSearchValue}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
