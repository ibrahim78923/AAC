import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';

export const Header = (props: any) => {
  const { dropdownOptions, title } = props;
  const router = useRouter();

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
