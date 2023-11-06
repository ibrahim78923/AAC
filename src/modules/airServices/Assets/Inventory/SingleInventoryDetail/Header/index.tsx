import { Typography, Box } from '@mui/material';

import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useRouter } from 'next/router';
import { ViewDetailBackArrowIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
export const Header = (props: any) => {
  const { dropdownOptions } = props;
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
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <Box
            display={'flex'}
            alignItems={'center'}
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              router.push({
                pathname: AIR_SERVICES?.ASSETS_INVENTORY,
              })
            }
          >
            <ViewDetailBackArrowIcon />
          </Box>
          <Typography variant="h5">Logitech Mouse</Typography>
        </Box>
        <Box>
          <SingleDropdownButton dropdownOptions={dropdownOptions} />
        </Box>
      </Box>
    </>
  );
};
