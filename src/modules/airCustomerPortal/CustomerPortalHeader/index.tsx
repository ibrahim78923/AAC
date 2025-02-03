import { CompanyLogoIcon } from '@/assets/icons';
import { Box } from '@mui/material';
import Link from 'next/link';
import { CustomerPortalHeaderI } from './CustomerPortalHeader.interface';
import { LinkButton } from '@/components/Buttons/LinkButton';

export const CustomerPortalHeader = (props: CustomerPortalHeaderI) => {
  const { buttonText, pathname } = props;

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
      <LinkButton name={buttonText} link={pathname} />
    </Box>
  );
};
