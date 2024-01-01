import { Box, Skeleton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_SERVICES } from '@/constants';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useHeader } from './useHeader';

export const Header = ({ dropdownOptions }: any) => {
  const { isLoading, router, title } = useHeader();

  if (isLoading) return <Skeleton height={50} />;

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <ArrowBackIcon
          color={'secondary'}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            router?.push(AIR_SERVICES?.PRODUCT_CATALOG);
          }}
        />
        <Typography
          variant={'h3'}
          color={'secondary'}
          textTransform={'capitalize'}
        >
          {title}
        </Typography>
      </Box>
      <SingleDropdownButton dropdownOptions={dropdownOptions} />
    </Box>
  );
};
