import { Box } from '@mui/material';
import Link from 'next/link';
import { CustomerPortalHeaderI } from './CustomerPortalHeader.interface';
import { LinkButton } from '@/components/Buttons/LinkButton';
import { LogoAvatar } from '@/components/Avatars/LogoAvatar';

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
        <LogoAvatar />
      </Link>
      <LinkButton name={buttonText} link={pathname} />
    </Box>
  );
};
