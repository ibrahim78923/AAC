import { CompanyLogoIcon } from '@/assets/icons';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import { CustomerPortalHeaderI } from './CustomerPortalHeader.interface';

export const CustomerPortalHeader = (props: CustomerPortalHeaderI) => {
  const { buttonText, pathname } = props;
  const router: NextRouter = useRouter();

  return (
    <Box
      display={'flex'}
      justifyContent="space-between"
      alignItems="center"
      p={3}
    >
      <Link href={'/'}>
        <CompanyLogoIcon />
      </Link>
      <Button
        variant="contained"
        onClick={() =>
          router?.push({
            pathname,
          })
        }
      >
        {buttonText}
      </Button>
    </Box>
  );
};
