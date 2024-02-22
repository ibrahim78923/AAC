import { CompanyLogoIcon } from '@/assets/icons';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const CustomerPortalHeader = ({ buttonText, pathname }: any) => {
  const router: any = useRouter();

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
