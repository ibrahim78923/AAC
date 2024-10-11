import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const Header = () => {
  const router = useRouter();

  return (
    <>
      <PageTitledHeader
        title={'Closure Rules-Ticket'}
        canMovedBack
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.SERVICE_MANAGEMENT,
          })
        }
      />

      <Typography variant="h6">
        Choose the conditions required to resolve or close tickets
      </Typography>
    </>
  );
};
