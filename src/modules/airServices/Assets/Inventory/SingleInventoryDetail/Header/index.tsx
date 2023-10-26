import { Typography, Box } from '@mui/material';
import ViewDetailBackArrowIcon from '@/assets/icons/modules/view-detail-Icon/view-detail-back-arrow-icon';

import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useRouter } from 'next/router';
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
                pathname: `/air-services/assets/inventory`,
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
