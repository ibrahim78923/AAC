import { PageTitledHeader } from '@/components/PageTitledHeader';
import { CategoryList } from './CategoryList';
import { ServicesList } from './ServicesList';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import { getSession } from '@/utils';
import { useRouter } from 'next/router';
import { AUTH } from '@/constants';

export const Catalog = () => {
  const authUserId = useMemo(() => {
    const userId = getSession() as any;
    return userId?.user?._id;
  }, []);

  const router = useRouter();

  if (!authUserId) {
    router?.push(AUTH?.LOGIN);
    return null;
  }

  return (
    <>
      <PageTitledHeader title="All Services" />
      <CategoryList />
      <Box
        sx={{
          py: 2,
          borderTop: '1px solid',
          borderColor: 'custom.off_white_three',
        }}
      />
      <ServicesList />
    </>
  );
};
